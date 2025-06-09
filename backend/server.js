const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dbConfig = require('./config/db.config');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL bağlantısı
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error => {
    if (error) throw error;
    console.log("MySQL veritabanına başarıyla bağlandı.");
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Food Website API'sine hoş geldiniz!" });
});

// Menü routes
app.get('/api/menu', (req, res) => {
    connection.query('SELECT * FROM menu', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Şefler routes
app.get('/api/chefs', (req, res) => {
    connection.query('SELECT * FROM chefs', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Sepete ürün ekle
app.post('/api/cart', (req, res) => {
    const { menu_id, quantity } = req.body;
    connection.query(
        'INSERT INTO cart (menu_id, quantity) VALUES (?, ?)',
        [menu_id, quantity || 1],
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.json({ success: true, cart_id: results.insertId });
        }
    );
});

// Sepeti getir
app.get('/api/cart', (req, res) => {
    connection.query(
        `SELECT cart.id, menu.name, menu.price, cart.quantity, menu.image_url
         FROM cart
         JOIN menu ON cart.menu_id = menu.id`,
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.json(results);
        }
    );
});

// Sepetten ürün sil
app.delete('/api/cart/:id', (req, res) => {
    connection.query(
        'DELETE FROM cart WHERE id = ?',
        [req.params.id],
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.json({ success: true });
        }
    );
});

// Kullanıcı kaydı
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        (error, results) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Email already registered' });
                }
                return res.status(500).json({ error });
            }
            res.json({ success: true, user_id: results.insertId });
        }
    );
});

// Kullanıcı girişi
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) return res.status(500).json({ error });
            if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(401).json({ error: 'Invalid credentials' });

            res.json({ success: true, user_id: user.id, email: user.email });
        }
    );
});

// Yorum ekle
app.post('/api/reviews', (req, res) => {
    const { user_id, name, photo_url, rating, comment } = req.body;
    connection.query(
        'INSERT INTO reviews (user_id, name, photo_url, rating, comment) VALUES (?, ?, ?, ?, ?)',
        [user_id || null, name, photo_url, rating, comment],
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.json({ success: true, review_id: results.insertId });
        }
    );
});

// Yorumları listele
app.get('/api/reviews', (req, res) => {
    connection.query(
        'SELECT * FROM reviews ORDER BY created_at DESC',
        (error, results) => {
            if (error) return res.status(500).json({ error });
            res.json(results);
        }
    );
});

// Siparişi tamamla
app.post('/api/orders', (req, res) => {
    const { user_id } = req.body;
    // Sepeti çek (fiyat için menu ile join)
    connection.query(
        'SELECT cart.menu_id, cart.quantity, menu.price FROM cart JOIN menu ON cart.menu_id = menu.id',
        (error, cartItems) => {
            if (error) return res.status(500).json({ error });
            if (cartItems.length === 0) return res.status(400).json({ error: 'Sepet boş' });

            // Toplamı hesapla
            let total = 0;
            cartItems.forEach(item => { total += item.quantity * item.price; });

            // Siparişi oluştur
            connection.query(
                'INSERT INTO orders (user_id, total) VALUES (?, ?)',
                [user_id || null, total],
                (error, orderResult) => {
                    if (error) return res.status(500).json({ error });
                    const order_id = orderResult.insertId;

                    // Sipariş ürünlerini ekle
                    const orderItems = cartItems.map(item => [order_id, item.menu_id, item.quantity, item.price]);
                    connection.query(
                        'INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES ?',
                        [orderItems],
                        (error) => {
                            if (error) return res.status(500).json({ error });

                            // Sepeti temizle
                            connection.query('DELETE FROM cart', () => {
                                res.json({ success: true, order_id });
                            });
                        }
                    );
                }
            );
        }
    );
});

// Server'ı başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
}); 
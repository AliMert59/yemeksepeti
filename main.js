$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);

    // API'den menü verilerini çek
    function loadMenu() {
        fetch('http://localhost:3000/api/menu')
            .then(response => response.json())
            .then(menuItems => {
                const menuContainer = $('#menu-dish');
                menuContainer.empty();

                menuItems.forEach(item => {
                    const menuHtml = `
                        <div class="dish-box-wp ${item.category.toLowerCase()}">
                            <div class="dish-box">
                                <div class="dish-img">
                                    <img src="${item.image_url}" alt="${item.name}">
                                </div>
                                <div class="dish-content">
                                    <h5 class="h5-title">${item.name}</h5>
                                    <p>${item.description}</p>
                                    <div class="dish-price">
                                        <span>${item.price} TL</span>
                                    </div>
                                    <button class="add-to-cart-btn" data-id="${item.id}">Sepete Ekle</button>
                                </div>
                            </div>
                        </div>
                    `;
                    menuContainer.append(menuHtml);
                });

                // MixItUp'ı yeniden başlat
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            })
            .catch(error => console.error('Menü yüklenirken hata:', error));
    }

    // API'den şef verilerini çek
    function loadChefs() {
        fetch('http://localhost:3000/api/chefs')
            .then(response => response.json())
            .then(chefs => {
                const teamContainer = $('.team-slider .swiper-wrapper');
                teamContainer.empty();

                chefs.forEach(chef => {
                    const chefHtml = `
                        <div class="swiper-slide">
                            <div class="team-box">
                                <div class="team-img">
                                    <img src="${chef.image_url}" alt="${chef.name}">
                                </div>
                                <div class="team-info">
                                    <h5 class="h5-title">${chef.name}</h5>
                                    <p>${chef.position}</p>
                                    <p class="team-bio">${chef.bio}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    teamContainer.append(chefHtml);
                });

                // Swiper'ı yeniden başlat
                team_slider.update();
            })
            .catch(error => console.error('Şefler yüklenirken hata:', error));
    }

    // Sayfa yüklendiğinde verileri çek
    loadMenu();
    loadChefs();

});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

// Sepet sayısını güncelle
function updateCartCount() {
    fetch('http://localhost:3000/api/cart')
        .then(res => res.json())
        .then(cartItems => {
            $('#cart-count').text(cartItems.length);
        });
}

// Sepeti getir ve modalda göster (toplamı güncelle)
function showCart() {
    fetch('http://localhost:3000/api/cart')
        .then(res => res.json())
        .then(cartItems => {
            let html = '';
            let total = 0;
            cartItems.forEach(item => {
                total += item.price * item.quantity;
                html += `<li style="margin-bottom:8px;">
                    <img src="${item.image_url}" width="40" style="vertical-align:middle; border-radius:8px; margin-right:8px;">
                    ${item.name} x${item.quantity} - ${item.price} TL
                    <button class="remove-from-cart-btn" data-id="${item.id}" style="margin-left:8px; background:none; border:none; color:#e74c3c; font-size:16px; cursor:pointer;" title="Sil">Delete</button>
                </li>`;
            });
            $('#cart-items').html(html.length ? html : '<li>Sepet boş</li>');
            $('#cart-total').text('Toplam: ' + total.toFixed(2) + ' TL');
            $('#cart-modal').show();
        });
}

function showToast(message) {
    if (typeof jQuery === 'undefined') {
        console.error('jQuery is not loaded!');
        return;
    }
    
    const toast = $('#toast');
    if (toast.length === 0) {
        console.error('Toast element not found!');
        return;
    }
    
    toast.text(message).fadeIn(200);
    setTimeout(() => {
        toast.fadeOut(400);
    }, 2000);
}

// Sepete ekle butonlarına tıklama olayı
$(document).on('click', '.add-to-cart-btn', function() {
    const menuId = $(this).data('id');
    fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menu_id: menuId, quantity: 1 })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast('Ürün sepete eklendi!');
            updateCartCount();
        } else {
            showToast('Bir hata oluştu.');
        }
    });
});

// Sepet simgesine tıklama olayı
$(document).on('click', '#cart-icon', function() {
    showCart();
});

// Sayfa yüklendiğinde sepet sayısını güncelle
$(document).ready(function () {
    updateCartCount();
});
// Sepetten ürün silme olayı
$(document).on('click', '.remove-from-cart-btn', function() {
    const cartId = $(this).data('id');
    fetch(`http://localhost:3000/api/cart/${cartId}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showCart();
            updateCartCount();
        } else {
            alert('Silme işlemi başarısız.');
        }
    });
});

// Kullanıcı simgesine tıklayınca modalı aç
$(document).on('click', '#user-icon', function() {
    $('#user-modal').show();
    $('#login-form').show();
    $('#register-form').hide();
    $('#user-modal-title').text('Login');
    $('#toggle-login-register').text("Don't have an account? Register");
});

// Login/Register arası geçiş
$(document).on('click', '#toggle-login-register', function(e) {
    e.preventDefault();
    if ($('#login-form').is(':visible')) {
        $('#login-form').hide();
        $('#register-form').show();
        $('#user-modal-title').text('Register');
        $('#toggle-login-register').text("Already have an account? Login");
    } else {
        $('#login-form').show();
        $('#register-form').hide();
        $('#user-modal-title').text('Login');
        $('#toggle-login-register').text("Don't have an account? Register");
    }
});

// Register
$('#register-form').on('submit', function(e) {
    e.preventDefault();
    const email = $('#register-email').val();
    const password = $('#register-password').val();
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Kayıt başarılı! Giriş yapabilirsiniz.');
            $('#user-modal').hide();
        } else {
            alert(data.error || 'Kayıt başarısız.');
        }
    });
});

// Login
$('#login-form').on('submit', function(e) {
    e.preventDefault();
    const email = $('#login-email').val();
    const password = $('#login-password').val();
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Giriş başarılı! Hoş geldiniz, ' + data.email);
            $('#user-modal').hide();
        } else {
            alert(data.error || 'Giriş başarısız.');
        }
    });
});

function loadReviews() {
    fetch('http://localhost:3000/api/reviews')
        .then(res => res.json())
        .then(reviews => {
            const container = $('#reviews-container');
            container.empty();
            reviews.forEach(r => {
                container.append(`
                    <div class="review-box" style="margin-bottom:24px; background:#fff; border-radius:16px; box-shadow:0 2px 16px rgba(0,0,0,0.07); padding:24px; display:inline-block; min-width:300px; max-width:350px; margin-right:24px;">
                        <img src="${r.photo_url || 'assets/images/default-user.png'}" class="review-photo" style="width:60px; border-radius:50%; margin-bottom:8px;">
                        <div>
                            <strong>${r.name || 'Anonymous'}</strong>
                            <span style="color:#e3a92b; font-size:18px; margin-left:8px;">${'★'.repeat(Math.round(r.rating))}${'☆'.repeat(5-Math.round(r.rating))}</span>
                        </div>
                        <p style="margin-top:8px;">${r.comment}</p>
                    </div>
                `);
            });
        });
}

$(document).ready(function () {
    loadReviews();
});

// Siparişi Tamamla butonuna tıklama 
$(document).on('click', '#complete-order-btn', function() {
    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: null })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast('Siparişiniz başarıyla oluşturuldu!');
            $('#cart-modal').hide();
            updateCartCount();
            showCart();
        } else {
            showToast(data.error || 'Sipariş oluşturulamadı.');
        }
    });
});



module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "alico.1234", 
    DB: "food_website",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}; 
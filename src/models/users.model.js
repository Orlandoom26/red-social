const mongoose = require("mongoose"); //requerimos libreria de mongo

const usersSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        rol: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false, //para evitar el __v al agregar datos
    }
);

module.exports = mongoose.model("users", usersSchema, "users"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection
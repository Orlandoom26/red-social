const mongoose = require("mongoose"); //requerimos libreria de mongo

const postsSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.ObjectId,
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url_media: {
      type: String,
      required: true,
    },
    dateTime: {
      type: String,
      required: true,
    },
    comments: {
        type: Array,
        default: []
    }
  },
  {
    versionKey: false, //para evitar el __v al agregar datos
  }
);

module.exports = mongoose.model("posts", postsSchema, "posts"); //primer argumento: nombre del modelo; segundo argumento: esquema; tercer argumento: nombre de la collection

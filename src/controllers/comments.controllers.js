const postsModel = require("../models/posts.model");
const usersModel = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");

class commentsControllers {
  async add(comment, username, posts) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(comment.token, ["user", "admin"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const post = await postsModel.findById(posts); // Validamos que no se repitan los usuarios
        const verifyUser = await usersModel.findOne({ username: username }); // Validamos que no se repitan los usuarios
        if (!post) {
          return reject("No existe la publicacion");
        }
        if (!verifyUser) {
          return reject("No existe el usuario");
        }
        if (!comment.comment) {
          return reject("Faltan propiedades dentro del body");
        }
        let today = new Date();
        let date = today.toISOString().slice(0, 10);
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        let dateTime = date + " " + time;
        const data = {
          id: uuidv4(),
          username: username,
          comment: comment.comment,
          dateTime: dateTime,
        };
        post.comments.push(data);
        const datos = await postsModel.findByIdAndUpdate(posts, post); // Creamos el usuario
        if (datos) {
          return resolve({
            comentario: post,
            token: comment.token,
            username: acceso.username
          });
        }
        return reject("No se pudo publicar el resultado");
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new commentsControllers();

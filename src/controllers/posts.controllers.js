const { autenticacion } = require("../jwt/autenticacion.js");
const postsModel = require("../models/posts.model.js");
const usersModel = require("../models/users.model.js");

class postsControllers {
  async add(token, post, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(token, ["user", "admin"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const verifyUser = await usersModel.findOne({ username: user });
        if (!verifyUser) {
          return reject("No existe el usuario que esta publicando");
        }
        if (!post.title || !post.description || !post.url_media) {
          return reject("Faltan propiedades dentro del body");
        }

        if (
          !post.url_media.endsWith(".gif") &&
          !post.url_media.endsWith(".png") &&
          !post.url_media.endsWith(".jpg") &&
          !post.url_media.endsWith(".jpeg") &&
          !post.url_media.endsWith(".mp3") &&
          !post.url_media.endsWith(".mp4")
        ) {
          return reject(
            "No tiene formato multimedia el enlace multimedia de la prublicacion"
          );
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
          username: user,
          title: post.title,
          description: post.description,
          url_media: post.url_media,
          dateTime: dateTime,
        };
        const datos = await postsModel.create(data); // Creamos el usuario
        if (datos) {
          return resolve({
            agregado: datos,
            token: token,
            username: acceso.username
          });
        }
        return reject("No se pudo registrar el usuario");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async update(token, post, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(token, ["user", "admin"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const lastPosts = await postsModel.findById(id); // Validamos que exista el usuario
        console.log(lastPosts);
        if (!lastPosts) {
          return reject("No existe la publicacion");
        }
        if (!post.title || !post.description || !post.url_media) {
          return reject("Faltan propiedades dentro del body");
        }

        if (
          !post.url_media.endsWith(".gif") &&
          !post.url_media.endsWith(".png") &&
          !post.url_media.endsWith(".jpg") &&
          !post.url_media.endsWith(".jpeg") &&
          !post.url_media.endsWith(".mp3") &&
          !post.url_media.endsWith(".mp4")
        ) {
          return reject(
            "No tiene formato multimedia el enlace multimedia de la prublicacion"
          );
        }
        const data = {
          username: lastPosts.username,
          title: post.title,
          description: post.description,
          url_media: post.url_media,
          dateTime: lastPosts.dateTime,
        };
        const datos = await postsModel.findByIdAndUpdate(id, data); // Creamos el usuario
        if (datos) {
          return resolve({
            editado: datos,
            token: token,
            username: acceso.username
          });
        }
        return reject("No se pudo registrar el usuario");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async delete(token, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(token, ["user", "admin"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const lastPosts = await postsModel.findById(id); // Validamos que exista la publicacion
        if (!lastPosts) {
          return reject("No existe la publicacion");
        }
        const datos = await postsModel.findByIdAndDelete(id); // Eliminamos la publicacion
        if (datos) {
          return resolve({
            token: token,
            eliminado: datos,
            username: acceso.username
          });
        }
        return reject("No se pudo eliminar la publicacion");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async comments(token, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(token, ["user", "admin"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        const lastPosts = await postsModel.findById(id); // Validamos que exista la publicacion
        if (!lastPosts) {
          return reject("No existe la publicacion");
        }
        resolve({
          token: token,
          comentarios: lastPosts.comments,
          username: acceso.username
        })
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new postsControllers();

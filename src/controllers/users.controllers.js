const crearToken = require("../jwt/create.js");
const postsModel = require("../models/posts.model.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcrypt");

class usersControllers {
  async register(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const verifyUser = await usersModel.find({ username: user.username }); // Validamos que no se repitan los usuarios
        if (
          !user.username ||
          !user.email ||
          !user.rol ||
          !user.password ||
          !user.passwordConfirm
        ) {
          return reject("Faltan propiedades dentro del body");
        }
        if (verifyUser.length > 0) {
          return reject("Ya esta registrado ese usuario");
        }
        if (user.password != user.passwordConfirm) {
          return reject("Las contraseñas no coinciden");
        }
        if (user.rol != "admin" && user.rol != "user") {
          return reject("Roles permitidos: admin o user");
        }
        const passwordHash = await bcrypt.hash(user.password, 10); // Encriptamos la contraseña para guardarla en la db
        const data = {
          username: user.username,
          email: user.email,
          password: passwordHash,
          rol: user.rol,
        };
        const datos = await usersModel.create(data); // Creamos el usuario
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo registrar el usuario");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async login(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const userVerify = await usersModel.findOne({
          username: user.username,
        }); // Verificamos si existe el usuario
        if (!userVerify) {
          return reject("El usuario no existe");
        }
        const passwordInvalid = await bcrypt.compare(
          user.password,
          userVerify.password
        ); // Comparamos las contraseñas si son iguales
        if (!passwordInvalid) {
          return reject("La contraseña es incorrecta");
        }
        let token = crearToken({
          id: userVerify._id,
          usuario: userVerify.username,
          rol: userVerify.rol,
        });
        resolve({
          token: token,
          "username": userVerify.username,
          rol: userVerify.rol,
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  async edit(user, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const lastuser = await usersModel.findById(id); // Validamos que exista el usuario
        if (!lastuser) {
          return reject("No existe el usuario");
        }
        if (!user.email || !user.password || !user.passwordConfirm) {
          return reject("Faltan propiedades dentro del body");
        }
        if (user.password != user.passwordConfirm) {
          return reject("Las contraseñas no coinciden");
        }
        const passwordHash = await bcrypt.hash(user.password, 10); // Encriptamos la contraseña para guardarla en la db
        const data = {
          username: lastuser.username,
          email: user.email,
          password: passwordHash,
          rol: lastuser.rol,
        };
        const datos = await usersModel.findByIdAndUpdate(id, data); // Creamos el usuario
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo editar el usuario");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const lastuser = await usersModel.findById(id); // Validamos que exista el usuario
        if (!lastuser) {
          return reject("No existe el usuario");
        }
        const datos = await usersModel.findByIdAndDelete(id); // Eliminamos el usuario
        await postsModel.deleteMany({ username: lastuser.username }); // Eliminamos el usuario
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo eliminar el usuario");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async userPosts(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await usersModel.findOne({ username: username });
        if (!user) {
          return reject("No existe el usuario");
        }
        const posts = await postsModel.find({ username: username });
        if (posts) {
          return resolve(posts);
        }
        return reject(`No se pudo obtener las publicaciones de ${username}`);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async feed(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await usersModel.findOne({ username: username });
        const feed = [];
        for (let i = 0; i < user.friends.length; i++) {
          const posts = await postsModel.find({
            username: user.friends[i].user,
          });
          if (posts.length > 0) {
            feed.push(posts[posts.length - 1]);
          }
        }
        return resolve(feed);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new usersControllers();

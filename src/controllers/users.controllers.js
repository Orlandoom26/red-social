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
        console.log(verifyUser)
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
        if (datos) {
          return resolve(datos);
        }
        return reject("No se pudo eliminar el usuario");
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new usersControllers();

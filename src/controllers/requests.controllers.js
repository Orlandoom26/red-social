const { autenticacion } = require("../jwt/autenticacion");
const usersModel = require("../models/users.model");

class requestsControllers {
  async sendRequest(token, username, usernameFriend) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(token, ["user", "admin"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        if (username === usernameFriend) {
          return reject(
            "No te puedes enviar una solicitud de amistad a ti mismo"
          );
        }
        const user = await usersModel.findOne({ username: username });
        const userFriend = await usersModel.findOne({
          username: usernameFriend,
        });
        if (!user) {
          return reject(
            "No existe el usuario que esta enviando la solicitud de amistad"
          );
        }
        if (!userFriend) {
          return reject(
            "No existe el usuario que va a recibir la solicitud de amistad"
          );
        }
        for (let i = 0; i < userFriend.friendRequest.length; i++) {
          if (userFriend.friendRequest[i].user === username) {
            return reject(
              "Ya le enviaste una solicitud de amistad a este usuario"
            );
          }
        }
        for (let i = 0; i < user.friends.length; i++) {
          if (user.friends[i].user === username) {
            return reject("Ya eres amigo de este usuario");
          }
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
          user: username,
          dateTime: dateTime,
        };
        userFriend.friendRequest.push(data);
        const datos = await usersModel.findByIdAndUpdate(
          userFriend._id,
          userFriend
        ); // Creamos el usuario
        console.log(datos);
        if (datos) {
          return resolve({
            token: token,
            solicitud: `Has enviado la solicitud al usuario ${usernameFriend}`,
            username: acceso.username
          });
        }
        return reject("No se pudo enviar la solicitud");
      } catch (error) {
        return reject(error);
      }
    });
  }

  async acceptRequest(token, username, usernameFriend) {
    return new Promise(async (resolve, reject) => {
      try {
        const acceso = await autenticacion(token, ["user", "admin"]);
        if (acceso.mensaje != "acceso permitido") {
          return reject(acceso.mensaje);
        }
        if (username === usernameFriend) {
          return reject(
            "No te puedes aceptar una solicitud de amistad a ti mismo"
          );
        }
        const user = await usersModel.findOne({ username: username });
        const userFriend = await usersModel.findOne({
          username: usernameFriend,
        });
        if (!user) {
          return reject(
            "No existe el usuario que esta aceptando la solicitud de amistad"
          );
        }
        if (!userFriend) {
          return reject("No existe el usuario que sera tu amigo");
        }
        for (let i = 0; i < userFriend.friends.length; i++) {
          if (userFriend.friends[i].user === username) {
            return reject("Ya son amigos");
          }
        }
        for (let i = 0; i < user.friends.length; i++) {
          if (user.friends[i].user === usernameFriend) {
            return reject("Ya son amigos");
          }
        }
        for (let i = 0; i < user.friendRequest.length; i++) {
          if (user.friendRequest[i].user === usernameFriend) {
            userFriend.friends.push({
              user: username,
              dateTime: user.friendRequest[i].dateTime,
            });
            user.friends.push(user.friendRequest[i]);
            user.friendRequest.splice(i, 1);
          }
        }
        for (let i = 0; i < userFriend.friendRequest.length; i++) {
          if (userFriend.friendRequest[i].user === username) {
            userFriend.friendRequest.splice(i, 1);
          }
        }
        await usersModel.findByIdAndUpdate(userFriend._id, userFriend);
        const datos = await usersModel.findByIdAndUpdate(user._id, user); // Creamos el usuario
        if (datos) {
          return resolve({
            solicitud: `Eres Amigo del usuario ${usernameFriend}`,
            token: token,
            username: acceso.username
          });
        }
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new requestsControllers();

let express = require("express");
const requestsControllers = require("../controllers/requests.controllers");
let router = express.Router();

/* Enviar Solicitud de Amistad. */
router.post("/send/:username/:usernameFriend", function (req, res, next) {
  requestsControllers
    .sendRequest(req.body.token, req.params.username, req.params.usernameFriend)
    .then((resultado) => {
      res.status(201).json({
        solicitud_enviada: resultado,
        mensaje: "Se ha enviado la solicitud",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Aceptar Solicitud de Amistad. */
router.post("/accept/:username/:usernameFriend", function (req, res, next) {
  requestsControllers
    .acceptRequest(
      req.body.token,
      req.params.username,
      req.params.usernameFriend
    )
    .then((resultado) => {
      res.status(201).json({
        solicitud_aceptada: resultado,
        mensaje: "Se ha aceptado la solicitud",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Amigos de un Usuario. */
router.get("/listFriends", function (req, res, next) {
  requestsControllers
    .listFriends(req.body.token, req.body.username)
    .then((resultado) => {
      res.status(200).json({
        data: resultado,
        mensaje: `Lista de amigos de ${resultado.username}`,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Lista de solicitudes de un Usuario. */
router.get("/listRequest", function (req, res, next) {
  requestsControllers
    .listRequest(req.body.token, req.body.username)
    .then((resultado) => {
      res.status(200).json({
        data: resultado,
        mensaje: `Lista de solicitudes de ${resultado.username}`,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;

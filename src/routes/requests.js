let express = require("express");
const requestsControllers = require("../controllers/requests.controllers");
let router = express.Router();

/* Enviar Solicitud de Amistad. */
router.post("/send/:username/:usernameFriend", function (req, res, next) {
  requestsControllers
    .sendRequest(req.params.username, req.params.usernameFriend)
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
      .acceptRequest(req.params.username, req.params.usernameFriend)
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

module.exports = router;

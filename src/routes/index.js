let express = require("express");
const usersControllers = require("../controllers/users.controllers");
const postsControllers = require("../controllers/posts.controllers");
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET home page. */
router.get("/registro", function (req, res, next) {
  res.render("registro");
});

// Iniciar Sesion
router.post("/incio-sesion", function (req, res, next) {
  usersControllers
    .login(req.body)
    .then((resultado) => {
      res.render("home", {
        data: resultado,
        mensaje: "Has iniciado sesion con exito",
        tipo: "verde",
      });
    })
    .catch((error) => {
      res.status(400).json({ mensaje: error });
    });
});

/* GET home page. */
router.post("/publicar", function (req, res, next) {
  console.log(req.body);
  res.render("publicar", {
    data: { username: req.body.username, token: req.body.token },
  });
});

/* Registrar Publicaciones. */
router.post("/publicar/add", function (req, res, next) {
  postsControllers
    .add(req.body.token, req.body, req.body.username)
    .then((resultado) => {
      res.render("home", {
        data: resultado,
        mensaje: "Se ha realizado la publicacion",
        tipo: "verde",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Feed de un Usuario. */
router.post("/feed", function (req, res, next) {
  usersControllers
    .feed(req.body.token, req.body.username)
    .then((resultado) => {
      console.log(resultado);
      res.render("feed", {
        data: resultado,
        mensaje: "Se ha cargado la feed exitosamente",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* retorno home*/
router.post("/home", function (req, res, next) {
  res.render("home", {
    data: { username: req.body.username, token: req.body.token },
    mensaje: "Has regresado a home",
    tipo: "verde",
  });
});

/* Comentarios de una Publicacion. */
router.post("/comentarios/:id", function (req, res, next) {
  postsControllers
  .comments(req.body.token, req.params.id)
  .then((resultado) => {
    res.render("comentarios", {
      data: resultado,
      mensaje: "Comentarios de la publicacion",
    });
  })
  .catch((error) => {
    res.status(400).json({ error: error });
  });
});

module.exports = router;

# GUIA DE INSTALACION Y USO DE LA API 

1) Desacrgar el .zip
2) Descomprimir el archivo
3) Dentro de la caperta que dejo el archivo y cambiar el nombre del archivo ".env.example" a ".env"
3) Abrir la terminal con la ruta de la carpeta que nos dejos el archivo .zip
4) Usaremos el comando "npm install" para instalar todas las dependencias
5) Usamos el comando "npm start" para arrancar el servidor

# GUIA de PETICIONES VIA POSTMAN O THUNDER CLIENT

- Peticiones POST:
1) http://localhost:3060/users/register
body: {
    "username": "",
    "email": "",
    "rol": "",
    "password": "",
    "passwordConfirm": ""
}

2) http://localhost:3060/posts/add/:usuario-que-publica
body: {
    "token": "",
    "title": "",
    "description": "",
    "url_media": ""
}

3) http://localhost:3060/comments/add/:usuario-que-comenta/:id-publicacion
body: {
    "token": "",
    "comment": ""
}

4) http://localhost:3060/requests/send/:usuario-que-envia/:usuario-que-recibe
body: {
    "token": ""
}

5) http://localhost:3060/requests/accept/:usuario-que-acepta/:usuario-que-envio
body: {
    "token": ""
}

6) http://localhost:3060/users/login
body: {
    "username": "",
    "password": ""
}

- Peticiones GET:
1) http://localhost:3060/users/posts/:usuario
body: {
    "token": ""
}

2) http://localhost:3060/users/feed/:usuario
body: {
    "token": ""
}

3) http://localhost:3060/posts/comments/:id-de-la-publicacion
body: {
    "token": ""
}

4) http://localhost:3060/requests/listFriends
body: {
    "token": "",
    "username": ""
}

5) http://localhost:3060/requests/listRequest
body: {
    "token": "",
    "username": ""
}

- Peticiones PUT:
1) http://localhost:3060/users/update/:id-usuario
body: {
    "token": "",
    "email": "",
    "password": "",
    "passwordConfirm": ""
}

2) http://localhost:3060/posts/update/:id-publicacion
body: {
    "title": "",
    "description": "",
    "url_media": ""
}

- Peticiones DELETE:
1) http://localhost:3060/users/delete/:id-usuario
body: {
    "token": ""
}

2) http://localhost:3060/posts/delete/:id-publicacion
body: {
    "token": ""
}
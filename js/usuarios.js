import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db, getTareas } from "./index.js";

/** Variables a utilizar para registar los usuarios, el html se encuentra
 en usuarios.html */
let mostrarT = await getTareas();
let registroUsuarios = document.getElementById("registrar");

/** Aqui estan los eventos encargados para el registro de usuarios */
registroUsuarios.addEventListener("click", registrar);

/** La funcion registrar se encarga de guardar nuevos usuarios y tambien
 verifica que si ya el usuario esta registrado le mande una alerta por pantalla */
function registrar() {
  let nombreUsuario = "";
  let msjUsuario = document.getElementById("registroExitosoUsuario");

  let correo = document.getElementById("correo").value;
  let clave = document.getElementById("clave").value;
  let nombre = document.getElementById("nombre").value;

  if (correo == "" || clave == "" || nombre == "") {
    msjUsuario.classList.remove("ocultarMsjValidacion");
    msjUsuario.classList.add("mostrarMsjValidacion");
    msjUsuario.innerHTML = "<div>Error, uno o varios campos vacios</div>";
    setTimeout(() => {
      msjUsuario.classList.remove("mostrarMsjValidacion");
      msjUsuario.classList.add("ocultarMsjValidacion");
      msjUsuario.innerHTML = "";
    }, "4000");
  } else {
    const auth = getAuth();
    mostrarT.forEach((doc) => {
      nombreUsuario = doc.data().Correo;
    });

    if (correo === nombreUsuario) {
      msjUsuario.classList.remove("ocultarMsjValidacion");
      msjUsuario.classList.add("mostrarMsjValidacion");
      msjUsuario.innerHTML = `<span>Correo en uso</span>`;

      setTimeout(() => {
        msjUsuario.classList.remove("mostrarMsjValidacion");
        msjUsuario.classList.add("ocultarMsjValidacion");
        msjUsuario.innerHTML = "";
      }, "3000");
    } else {
      createUserWithEmailAndPassword(auth, correo, clave)
        .then(() => {
          addDoc(collection(db, "Usuarios"), {
            id: Date.now(),
            Usuario: nombre,
            Correo: correo,
          });

          msjUsuario.classList.remove("ocultarMsjValidacion");
          msjUsuario.classList.add("mostrarMsjValidacion");
          msjUsuario.innerHTML = `<span>Usuario Registrado con exito</span>`;
          setTimeout(() => {
            msjUsuario.classList.remove("mostrarMsjValidacion");
            msjUsuario.classList.add("ocultarMsjValidacion");
            msjUsuario.innerHTML = "";
          }, "2000");

          verificar();
          setTimeout(function () {
            location = "login.html";
          }, 2000);
        })
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode == "auth/invalid-email") {
            msjUsuario.classList.remove("ocultarMsjValidacion");
            msjUsuario.classList.add("mostrarMsjValidacion");
            msjUsuario.innerHTML = `<span>Formato de correo Invalido</span>`;

            setTimeout(() => {
              msjUsuario.classList.remove("mostrarMsjValidacion");
              msjUsuario.classList.add("ocultarMsjValidacion");
              msjUsuario.innerHTML = "";
            }, "4000");
          } else if (errorCode == "auth/weak-password") {
            msjUsuario.classList.remove("ocultarMsjValidacion");
            msjUsuario.classList.add("mostrarMsjValidacion");
            msjUsuario.innerHTML = `<span>Clave debe ser mayor a 6 digitos</span>`;

            setTimeout(() => {
              msjUsuario.classList.remove("mostrarMsjValidacion");
              msjUsuario.classList.add("ocultarMsjValidacion");
              msjUsuario.innerHTML = "";
            }, "4000");
          } else if (errorCode == "auth/email-already-in-use") {
            msjUsuario.classList.remove("ocultarMsjValidacion");
            msjUsuario.classList.add("mostrarMsjValidacion");
            msjUsuario.innerHTML = `<span>Correo en uso</span>`;

            setTimeout(() => {
              msjUsuario.classList.remove("mostrarMsjValidacion");
              msjUsuario.classList.add("ocultarMsjValidacion");
              msjUsuario.innerHTML = "";
            }, "4000");
          }
          const errorMessage = error.message;
        });
    }
    document.getElementById("correo").value = "";
    document.getElementById("clave").value = "";
    document.getElementById("nombre").value = "";
  }
}

/** La funcion observador se encarga de que si un usuario esta activo no se puedan
 abrir 2 pestañas del navegador con usuarios distintos */
function observador() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified == true) {
        location = "tarea.html";
        const uid = user.uid;
      } else {
        console.log("Usuario nulo: ");
      }
    }
  });
}

/** La funcion verificar se encarga de enviar un correo de confirmacion al usuario
 para poder iniciar sesion en la aplicacion */
function verificar() {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      console.log("Enviando Correo");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

observador();

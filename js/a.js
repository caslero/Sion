
let registrarUsuario = document.querySelector('.registrarUsuario');

registrarUsuario.addEventListener('click', rUsuario);

let regUsuario = document.getElementById('registrarUsuario');
regUsuario.addEventListener('click', rUsuario);

/** Inicio, Cuando presiono el boton de registrar un usuario llamamos a esta funcion
 que muestra una pantalla modal solo de registro de usuarios */
function rUsuario() {
    let modalCompleta = document.querySelector('.a');
    let modal = document.querySelector('.seccion-usuarios');

    modalCompleta.classList.remove('a');
    modal.classList.remove('seccion-usuarios');

    modal.classList.add('seccion-usuarios1');
    modalCompleta.classList.add('modal');
}
/** Fin, Cuando presiono el boton de registrar un usuario llamamos a esta funcion
 que muestra una pantalla modal solo de registro de usuarios */


let loginUsuario = document.querySelector('.loginUsuario');
loginUsuario.addEventListener('click', lUsuario);

let logUsuario = document.getElementById('loginUsuario');
logUsuario.addEventListener('click', lUsuario);

function lUsuario() {
    let modalCompleta = document.querySelector('.a');
    let modal = document.querySelector('.seccion-usuarios');
    let registrarUsuario = document.querySelector('.registrar-usuario');
    let loginUsuario = document.querySelector('.login-usuario');

    registrarUsuario.classList.add('login-usuario')
    loginUsuario.classList.remove('login-usuario')
    
    modalCompleta.classList.remove('a');
    modal.classList.remove('seccion-usuarios');
    console.log('funciona');
    modal.classList.add('seccion-usuarios1');
    modalCompleta.classList.add('modal');
    loginUsuario.classList.add('registrar-usuario');
}

let regresar = document.getElementById('regresar');
regresar.addEventListener('click', welcomeBack);

function welcomeBack() {
   location = 'index.html'
}

let regresarLogin = document.getElementById('regresarLogin');
regresarLogin.addEventListener('click', welcomeBackLogin);

function welcomeBackLogin() {
   location = 'index.html'
}

let menuHamburguesa = document.querySelector('.menu-hamburguesa');
menuHamburguesa.addEventListener('click', menuMovil);

function menuMovil() {
    let a = document.querySelector('.hamburguesa');
    a.classList.remove('hamburguesa')

    a.classList.add('hamburguesa-modal')
}




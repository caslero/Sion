import './index.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

let bontonClaveOlvidada = document.querySelector('.claveOlvidada');
let barraProgreso = document.getElementById('barraProgreso');
let entrar = document.getElementById('registrar1');
let claveOlvidada = document.getElementById('claveOlvidada');
let mostrarCirculo = document.getElementById('mostrarCirculo');

entrar.addEventListener('click', entrarSistema);
claveOlvidada.addEventListener('click', cambiarClave);
mostrarCirculo.addEventListener('click', mostrarCirculoTareas);


function observador() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified == true) {
                barraDeProgreso()
                location = "tarea.html"
                const uid = user.uid;
            } else {
                console.log('Usuario nulo: ');
            }
        }
    });
}

function entrarSistema() {
    let correo1 = document.getElementById('correo1').value;
    let clave1 = document.getElementById('clave1').value;

    let msj = document.getElementById('validar');
    let divMsj = document.getElementById('validar');
    const auth = getAuth();

    if (correo1) {
        bontonClaveOlvidada.setAttribute('enabled', '')
        signInWithEmailAndPassword(auth, correo1, clave1)
        .then((userCredential) => {
            const user = userCredential.user;
            const usuario = user.email;

            
           
            if (user.emailVerified == true) {
                barraDeProgreso()
                setTimeout(() => {
                    location = 'tarea.html';
                }, 10000)
                
            } else {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[15px]">Debe validar el correo</div>
                                    <div class="validar-correo" id="nuevoCodigo">Nuevo Codigo</div>
                                    `;
                
                let nuevoCodigo = document.getElementById('nuevoCodigo');
                nuevoCodigo.addEventListener('click', reenviarCodigo);
                                                            
                function reenviarCodigo() {
                   barraDeProgreso()
                    setTimeout(() => {
                        msj.classList.remove('mostrarMsjValidacion')
                        msj.classList.add('ocultarMsjValidacion')
                    }, '3000');
                    const auth = getAuth();
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                        // Email verification sent!
                        // ...                        
                        msj.classList.remove('ocultarMsjValidacion')
                        msj.classList.add('mostrarMsjValidacion')
                        divMsj.innerHTML = `<div class="text-[#d05151]">Enviando Nuevo Codigo</div>`;
                        
                        setTimeout(() => {
                            msj.classList.remove('mostrarMsjValidacion')
                            msj.classList.add('ocultarMsjValidacion')
                            divMsj.innerHTML = '';
                        }, '5000');
                    }).catch((error) => {
                        // An error happened.
                        console.log(error);
                    });
                }
            }

        }).catch((error) => {

            barraDeProgreso()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            

            if (errorCode == 'auth/wrong-password') {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[#d05151]">Clave Errada</div>`;
                setTimeout(() => {
                    msj.classList.remove('mostrarMsjValidacion')
                    msj.classList.add('ocultarMsjValidacion')
                    divMsj.innerHTML = '';
                }, '3000');
            } else if (errorCode == 'auth/user-not-found') {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[#d05151]">Usuario no existe</div>
                                    <div class="text-blue-500"><a href="index.html">Registrarse</a></div>`;
            } else if (errorCode == 'auth/missing-password') {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[#d05151]">Campo de clave vacio</div>`;
                setTimeout(() => {
                    msj.classList.remove('mostrarMsjValidacion')
                    msj.classList.add('ocultarMsjValidacion')
                    divMsj.innerHTML = '';
                }, '3000');
            } else if (errorCode == 'auth/invalid-email') {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[#d05151]">Formato de correo invalido</div>`;
                setTimeout(() => {
                    msj.classList.remove('mostrarMsjValidacion')
                    msj.classList.add('ocultarMsjValidacion')
                    divMsj.innerHTML = '';
                }, '3000');
            } else if (errorCode == 'auth/too-many-requests') {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[#d05151]">Muchos intentos fallidos, recargando...</div>`;
                setTimeout(() => {
                    location = 'index.html'
                }, '4000');
            }
        });
        
    } else  if (correo1 == '') {
        bontonClaveOlvidada.setAttribute('disabled', '')
        msj.classList.remove('ocultarMsjValidacion')
        msj.classList.add('mostrarMsjValidacion')
        divMsj.innerHTML = `<div class="text-[#d05151]">Campo de correo vacio</div>`;
        
        setTimeout(() => {
            msj.classList.remove('mostrarMsjValidacion')
            msj.classList.add('ocultarMsjValidacion')
            divMsj.innerHTML = '';
        }, '3000');        
    } else  if (clave1 == '' &&  correo1 != '') {
        bontonClaveOlvidada.setAttribute('disabled', '')
        msj.classList.remove('ocultarMsjValidacion')
        msj.classList.add('mostrarMsjValidacion')
        divMsj.innerHTML = `<div class="text-[#d05151]">Campo de clave vacio</div>`;
            
        setTimeout(() => {
            msj.classList.remove('mostrarMsjValidacion')
            msj.classList.add('ocultarMsjValidacion')
            divMsj.innerHTML = '';
        }, '3000'); 
    }
}

function cambiarClave() {    
    const auth = getAuth();
    let correo1 = document.getElementById('correo1').value;
    let msj = document.getElementById('validar');
    let divMsj = document.getElementById('validar');

    if (correo1) {
        bontonClaveOlvidada.setAttribute('enabled', '')
        barraDeProgreso()
        
        sendPasswordResetEmail(auth, correo1)
        .then(() => {
            msj.classList.remove('ocultarMsjValidacion')
            msj.classList.add('mostrarMsjValidacion')
            divMsj.innerHTML = `<div class="text-[#d05151]">Enviando Correo, Cambio de clave</div>`;
                            
            setTimeout(() => {
                msj.classList.remove('mostrarMsjValidacion')
                msj.classList.add('ocultarMsjValidacion')
                divMsj.innerHTML = '';
            }, '5000');  
                            
        }).catch((error) => {
            barraDeProgreso()
            const errorCode = error.code;
            const errorMessage = error.message;
            
            console.log(errorCode);
            console.log(errorMessage);
            
            if (errorCode == 'auth/user-not-found') {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[#d05151]">Correo invalido</div>
                                        <div class="text-blue-500"><a href="index.html">Registrarse</a></div>`;
            } else if (errorCode == 'auth/invalid-email') {
                msj.classList.remove('ocultarMsjValidacion')
                msj.classList.add('mostrarMsjValidacion')
                divMsj.innerHTML = `<div class="text-[#d05151]">Formato de correo invalido</div>
                                    <div class="text-[#d05151]">Ejemplo: <b class="text-blue-500">ejemplo@ejemplo.com</b></div>`;
                
                setTimeout(() => {
                    msj.classList.remove('mostrarMsjValidacion')
                    msj.classList.add('ocultarMsjValidacion')
                    divMsj.innerHTML = '';
                }, '10000'); 
            }
        });  
    } else {
        msj.classList.remove('ocultarMsjValidacion')
        msj.classList.add('mostrarMsjValidacion')
        divMsj.innerHTML = `<div class="text-[#d05151]">Campo de correo vacio</div>`;
        
        setTimeout(() => {
            msj.classList.remove('mostrarMsjValidacion')
            msj.classList.add('ocultarMsjValidacion')
            divMsj.innerHTML = '';
        }, '4000'); 
    }   
}

function barraDeProgreso() {
    barraProgreso.classList.remove('ocultarTarea');
  
    setTimeout(() => {
      barraProgreso.classList.add('ocultarTarea')
    }, 3000)
}

function mostrarCirculoTareas() {
    let seccionRegistrar = document.getElementById('seccionRegistrar');
    let seccionCirculo = document.getElementById('seccionCirculo');
    let margenCirculo = document.getElementById('margenCirculo');
    
    seccionRegistrar.classList.toggle('flex')
    seccionRegistrar.classList.toggle('hidden')
    seccionCirculo.classList.toggle('basis-1/3')
    seccionCirculo.classList.toggle('basis-full')

    margenCirculo.classList.toggle('margenCirculo')
    margenCirculo.classList.toggle('margenCirculo2')
}

observador();
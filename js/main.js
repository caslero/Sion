import './index.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { db, getTareas } from './index.js';

let mostrarT = await getTareas();

let sesionActiva = document.querySelector('.sesionActiva');
sesionActiva.classList.remove('hidden')


let bontonClaveOlvidada = document.querySelector('.claveOlvidada');
let ver = document.querySelector('.ver');
//console.log(ver);


let nombreUsuario = '';
let t = '';

let barraProgreso = document.getElementById('barraProgreso');


let registroUsuarios = document.getElementById('registrar');
// let uActivo = document.getElementById('usuarioLogueado');
// let mostrar = document.querySelector('.mostrar');

registroUsuarios.addEventListener('click', registrar);

function registrar() {
    let msjUsuario = document.getElementById('registroExitosoUsuario');

    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    let nombre = document.getElementById('nombre').value;

    if (correo == '' || clave == '' || nombre == '') {
        barraDeProgreso()
        msjUsuario.classList.remove('viejoHidden');
        msjUsuario.classList.add('nuevoHidden');
        msjUsuario.innerHTML = '<div>Error, uno o varios campos vacios</div>'
        setTimeout(() => {
            msjUsuario.classList.add('viejoHidden');
            msjUsuario.innerHTML = '';
        }, "4000"); 
        
    } else {

    const auth = getAuth();
    //let usuarioLogueado = document.getElementById('usuarioLogueado').value;

    mostrarT.forEach((doc) => {          
         nombreUsuario = doc.data().Correo;
         t =  doc.data().Usuario;
    });

        if (correo === nombreUsuario) {
            barraDeProgreso()
            msjUsuario.classList.remove('viejoHidden');
            msjUsuario.classList.add('nuevoHidden');         
            msjUsuario.innerHTML = `<span>Correo en uso</span>`;

            setTimeout(() => {
                msjUsuario.classList.add('viejoHidden');
                msjUsuario.innerHTML = '';
            }, "3000");

        }  else {

            barraDeProgreso()
                 createUserWithEmailAndPassword(auth, correo, clave)
                 .then(() => {
                    addDoc(collection(db, "Usuarios"), {
                        id: Date.now(),
                        Usuario: nombre,
                        Correo: correo
                    });

                    msjUsuario.classList.remove('viejoHidden');
                    msjUsuario.classList.add('nuevoHidden');
                    msjUsuario.innerHTML = `<span>Usuario Registrado con exito</span>`;
                    setTimeout(() => {
                        msjUsuario.classList.add('viejoHidden');
                        msjUsuario.innerHTML = '';
                    }, "2000");
                    

                    verificar();
                    setTimeout(function(){
                        barraDeProgreso()
                        location = 'index.html';
                    }, 2000);

                      //location = 'index.html'
                   }).then((userCredential) => {
                       // Signed in 
                       const user = userCredential.user;
                     
                       // ...
                   }).catch((error) => {
                    barraDeProgreso()
                    const errorCode = error.code;
                    
                    if (errorCode == 'auth/invalid-email') {
                        msjUsuario.classList.remove('viejoHidden');
                        msjUsuario.classList.add('nuevoHidden');
                        msjUsuario.innerHTML = `<span>Formato de correo Invalido</span>`;                       
                        setTimeout(() => {
                            msjUsuario.classList.add('viejoHidden');
                            msjUsuario.innerHTML = '';
                        }, "3000");
                    } else if (errorCode == 'auth/weak-password') {
                        msjUsuario.classList.remove('viejoHidden');
                        msjUsuario.classList.add('nuevoHidden');
                        msjUsuario.innerHTML = `<span>Clave debe ser mayor a 6 digitos</span>`;
                        setTimeout(() => {
                            msjUsuario.classList.add('viejoHidden');
                            msjUsuario.innerHTML = '';
                        }, "3000");
                    } else if (errorCode == 'auth/email-already-in-use') {
                        msjUsuario.classList.remove('viejoHidden');
                        msjUsuario.classList.add('nuevoHidden');
                        msjUsuario.innerHTML = `<span>Correo en uso</span>`;
                        setTimeout(() => {
                            msjUsuario.classList.add('viejoHidden');
                            msjUsuario.innerHTML = '';
                        }, "3000");
                    }

                       const errorMessage = error.message;
                       
                       console.log(errorCode);
                       console.log(errorMessage);
                       // ..
                   });
                 //console.log(correo, clave);
        
        }
        
        document.getElementById('correo').value = '';
        document.getElementById('clave').value = '';
        document.getElementById('nombre').value = '';       
        
    }

      
}


function observador() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified == true) {
                sesionActiva.classList.add('hidden')
                barraDeProgreso()
                location = "tarea.html"
                const uid = user.uid;
            } else {
                console.log('Usuario nulo: ');
                sesionActiva.classList.remove('hidden')
            }
        }
    });
}

function verificar() {
    barraDeProgreso()
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
        // Email verification sent!
        // ...
        console.log('Enviando Correo');
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}


let entrar = document.getElementById('registrar1');

entrar.addEventListener('click', entrarSistema);

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
                location = 'tarea.html';
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

let claveOlvidada = document.getElementById('claveOlvidada');
claveOlvidada.addEventListener('click', cambiarClave);

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
    }    
}



observador();



function barraDeProgreso() {
    barraProgreso.classList.remove('ocultarTarea');
  
    setTimeout(() => {
      barraProgreso.classList.add('ocultarTarea')
    }, 3000)
  }
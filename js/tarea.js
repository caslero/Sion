//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
//import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getTareas, getTareasGuardadas, onGetTareas, borrarTarea, tareaActualizada, borrarLista } from './index.js'

let mostrarTareasRestantes = document.querySelector('.ocultare');
/** 2000 > 2 segundos */

let miliSegundos = 120000;

let nombreUsuario = '';

let redireccionar = document.querySelector('.eliminarTodo');
      redireccionar.classList.add('hidden');

let a = document.querySelector('.a');

a.classList.remove('b')
let usuarioLogueado = document.getElementById('usuarioLogueado').value;

let nombreUsua = document.getElementById('nombreUsua').value;

let cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', logOut);
let verTareasActivas = document.getElementById('mostrarTareas');


let mostrarT = await getTareas();

let t = '';



//  window.addEventListener('DOMContentLoaded', async () => {
// //r()
 
// //     let mostrarT = await getTareas();
// //     let t = '';

// //   const auth = getAuth();
// //   onAuthStateChanged(auth, (user) => {
     
// //     if (user) {
// //         const uid = user.uid;            
// //         const name = user.email;
// //         console.log('Funcion ver');

// //         // mostrarT.forEach((doc) => {              
// //         //   nombreUsuario = doc.data().Correo;
// //         //   t = doc.data().Usuario;
        
// //         //     if (nombreUsuario === name) {
// //         //      let us = document.querySelector('.us');
// //         //      let usa = document.querySelector('.usa');
// //         //      us.classList.add('hidden')
// //         //      usa.classList.remove('hidden')
// //         //      document.getElementById('nombreUsua').value = t;
// //         let uActivo = '';
// //         let tarea = '';
// //         mostrarT.forEach((doc) => {
              
// //           nombreUsuario = doc.data().Correo;
// //             t = doc.data().Usuario;
// //             if (nombreUsuario === name) {
// //               let us = document.querySelector('.us');
// //               let usa = document.querySelector('.usa');
// //               us.classList.add('hidden')
// //               usa.classList.remove('hidden')
// //               document.getElementById('nombreUsua').value = t;            
            
// //             onGetTareas((mostrarTareas) => {
             
// //               mostrarTareas.forEach((doc) => {
                
// //                 uActivo = doc.data().Usuario
// //                 if (uActivo === name) {
// //                   tarea = tarea + `${doc.data().Tarea}<br><br>`;
                 
// //                 }
// //               })
// //               console.log('las tareas son r: ' + tarea);
// //               document.getElementById('mostrarTareas').innerHTML = tarea;
// //             })

              
// //                 // verTareas.forEach((doc) => {                        
// //                 //   if (nombreUsuario === doc.data().Usuario) {
// //                 //     tareaGuardada = `${doc.data().Tarea}<br><br>`;
// //                 //     console.log('hola tarea guardada 2 ' + tareaGuardada);
// //                 //   }
// //                 //  });
                              

// //             }
// //           });
// //     }    
// //   });
//  });

let btnEliminar = document.querySelector('.btnEliminar');
let ocultar = document.querySelector('.ocultare');


function mostrarTareasUsuarioActivo() {
  mostrarTareasRestantes.classList.remove('mostrar-ocultar'); 
 
  
  ocultar.classList.remove('hidden')
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
       
    if (user) {
      redireccionar.classList.remove('hidden');
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user

            const uid = user.uid;            
            const name = user.email;
            let uActivo = '';
            let tarea = '';
            let i = 0;
          
          
      mostrarT.forEach((doc) => {
              
        nombreUsuario = doc.data().Correo;
        t = doc.data().Usuario;
        if (nombreUsuario === name) {
            let us = document.querySelector('.us');
            let usa = document.querySelector('.usa');
            us.classList.add('hidden')
            usa.classList.remove('hidden')
            document.getElementById('nombreUsua').value = t;
            document.getElementById('usuarioLogueado').value = nombreUsuario;
           

            let tareass = '';
            let idTarea = '';
            let statusTarea = '';
            let claseTarea = '';
            let cantidadTareas = [];
            let contador = 0;
            let contadorClase = 0;

            onGetTareas((mostrarTareas) => {

              mostrarTareas.forEach((doc) => {
                uActivo = doc.data().Usuario
                  
                if (uActivo === name) {
                  
                  contador++;                    

                  tareass =  doc.data().Tarea
                  statusTarea = doc.data().status;
                  claseTarea = doc.data().clase;
                  idTarea = doc.data().id;
                  tarea = tarea +  `<li class="listare" id="${idTarea}" data-clase="${claseTarea}" data-status="${statusTarea}">
                                      <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
                                        <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${idTarea}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                        <input id="${idTarea}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
                                      </label>
                                      <div class="btn-contenedore md:basis-[20%] md:px-5 pr-2 md:pr-0 space-x-2">
                                        <button class="js-edit   circulos" id="${doc.id}">
                                          <i class="ri-pencil-fill"></i>
                                        </button>
                                        <button class="js-delete circulos" id="${doc.id}">
                                          <i class="ri-delete-bin-fill" title="Borrar Solo uno"></i>
                                        </button>
                                      </div>
                                    </li>`;
                  document.getElementById('mostrarTareas').innerHTML = tarea;
                } else {
                  contador = 0;                 
                  document.getElementById('mostrarTareas').innerHTML = '';
                }
                
                if (claseTarea == 'marcar') {
                  cantidadTareas.push({n: idTarea})
                  contadorClase++;
                } 
              })
              
              
                if (cantidadTareas.length != 0) {
                  document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo">borrar marcados</button>`;
                } else {
                  document.querySelector('.btnMarcar').innerHTML = ''
                  document.querySelector('.mostrarTareas').innerHTML = ''
                  
                }
                
                if (contador >= 1) {
                  document.querySelector('.btnEliminarTodo').innerHTML = `<div class="mr-4 borrarTodo">${contador} tarea activa</div><button id="${idTarea}" class="${claseTarea} borrado borrarTodo">borrar todo</button>`;
                } else {
                  document.querySelector('.btnEliminarTodo').innerHTML = `<div class="mr-4 borrarTodo">${contador} tarea activa</div>`;
                }
            });
          }
      });
    }
  });

}

















function s(){  
  ocultar.classList.add('hidden')
  document.getElementById('mostrarTareas').innerHTML = '';
}


let n = 0;
function observador() {  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.addEventListener("keypress", contarCerrarSesion);
      document.addEventListener("click", contarCerrarSesion);
      document.addEventListener('mousemove', contarCerrarSesion)     
      
      mostrarTareasUsuarioActivo();


    setTimeout(function(){
         logOut()
    }, 14400000);
    } else {      
      let redireccionar = document.querySelector('.eliminarTodo');
      redireccionar.classList.add('hidden');
      location = 'index.html';
    }
  });
}


let guardarTarea = document.getElementById('guardarTarea');


//let rTarea = document.getElementById('rTarea');
//guardarTarea.addEventListener('click', async (e) => {
guardarTarea.addEventListener('click', guardarNuevaTarea);

async function guardarNuevaTarea() { 
  let agregarTarea = document.getElementById('agregarTarea').value;
  
  if (agregarTarea) {
    s();
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      const nombres = user.email;
      const idUsuario = user.uid;
      document.getElementById('usuarioLogueado').value = nombres;     
    });

    
    
    try {
      let usuarioLogueado = document.getElementById('usuarioLogueado').value;
      const docRef = await addDoc(collection(db, "Tareas"), {
        id: Date.now(),
        Usuario: usuarioLogueado,
        Tarea: agregarTarea,
        status: "pending",
        clase: "desmarcar"
      });
      //console.log("Identificador de la tarea registrada: ", docRef.id);
      document.getElementById('agregarTarea').value = '';
      
      mostrarTareasUsuarioActivo();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};


document.addEventListener('keyup', guardarNuevaTarea2)
async function guardarNuevaTarea2(event) {
  
  let agregarTarea = document.getElementById('agregarTarea').value;
  
  if(event.key == 'Enter') {
    if (agregarTarea) {
      s();
      const auth = getAuth();
      
      onAuthStateChanged(auth, (user) => {
        const nombres = user.email;
        document.getElementById('usuarioLogueado').value = nombres;
      });
      
      try {
        let usuarioLogueado = document.getElementById('usuarioLogueado').value;
        const docRef = await addDoc(collection(db, "Tareas"), {
          id: Date.now(),
          Usuario: usuarioLogueado,
          Tarea: agregarTarea,
          status: "pending",
          clase: "desmarcar"
        });
        //console.log("Identificador de la tarea registrada: ", docRef.id);
        document.getElementById('agregarTarea').value = '';
        
        mostrarTareasUsuarioActivo();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
};









function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Saliendo...');
    a.innerHTML = '';
    location = 'index.html';
    }).catch((error) => {
    // An error happened.
    console.log(error);
    });
}



observador();


let sinCheckear = document.querySelector('.checkear');
sinCheckear.addEventListener('click', cambiarEstadoTarea);

function cambiarEstadoTarea(e) {
  
  const statuTarea = e.target.closest('input[type="checkbox"]');
  const claseTarea = e.target.closest('input[type="checkbox"]');

  if (!statuTarea) return;

  mostrarTareasRestantes.classList.add('mostrar-ocultar');


    //let quitarMarcado = document.getElementById('mostrarTareas');
    

    const status = statuTarea.checked ? "completed" : "pending"
    const clase = claseTarea.checked ? "marcar" : "desmarcar"
    
    let id = statuTarea.id;
    

    //quitarMarcado.classList.add('hidden')
    tareaActualizada(id, {status: status, clase: clase});
    //quitarMarcado.classList.remove('hidden')
    setTimeout(() => {
      mostrarTareasRestantes.classList.remove('mostrar-ocultar');
      mostrarTareasUsuarioActivo();
    }, 100);
}



let editarTarea = document.querySelector('.checkear');
editarTarea.addEventListener('click', actualizarTareas);

function actualizarTareas(e) {

  let tarea = '';
  const botonEditarUnaTarea = e.target.closest(".js-edit");
 
  if (!botonEditarUnaTarea) return;

  mostrarTareasRestantes.classList.remove('mostrar-ocultar'); 
    
    const id = botonEditarUnaTarea.id;
    const input = botonEditarUnaTarea.closest("li").querySelector('input[type="text"]');
  
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      console.log('Editando..');
    } else {
      input.setAttribute("readonly", "");     
      tarea = input.value; 

      tareaActualizada(id, {Tarea: tarea});
    
      setTimeout(() => {
        mostrarTareasRestantes.classList.remove('mostrar-ocultar');
        console.log('Tarea Actualizada');
        mostrarTareasUsuarioActivo();
      }, 100);
    }
}

let borrarIndividual = document.querySelector('.checkear');
borrarIndividual.addEventListener('click', eliminarElementos);

function eliminarElementos(e)  {
  mostrarTareasRestantes.classList.add('mostrar-ocultar');

  const borrarUnaTarea = e.target.closest(".js-delete");
  if (!borrarUnaTarea) return;   
   

  borrarTarea(borrarUnaTarea.id)

  setTimeout(() => {
    mostrarTareasRestantes.classList.remove('mostrar-ocultar');
    mostrarTareasUsuarioActivo();
  }, 100);
}


let borrarT = document.querySelector('.btnEliminar');
borrarT.addEventListener('click', eliminarListaCompleta);

async function eliminarListaCompleta(e) {
  let verTareas = await getTareasGuardadas();
  const borrarTodasTarea = e.target.closest(".borrado");
  if (!borrarTodasTarea) return;

    mostrarTareasRestantes.classList.add('mostrar-ocultar');
   
  let correoUsuarioActivo = document.getElementById('usuarioLogueado').value;
  let usuario = '';
  let clase = '';
  let id = 0;
  let i = 0;
  
    verTareas.forEach((doc) => {
      usuario = doc.data().Usuario;
      clase = doc.data().clase;
      id = doc.id

      if (correoUsuarioActivo === usuario) {

          mostrarTareasRestantes.classList.add('mostrar-ocultar');
        
        borrarLista(id)
        
        setTimeout(() => {
          mostrarTareasRestantes.classList.remove('mostrar-ocultar');
          mostrarTareasUsuarioActivo();
        }, 100);
      }
    });
}







let borrarMarcados = document.querySelector('.btnEliminar');
borrarMarcados.addEventListener('click', eliminarMarcados);



async function eliminarMarcados(e) {
  let verTareas = await getTareasGuardadas();
  
  const borrarMarcado = e.target.closest(".marcado");
  if (!borrarMarcado) return; 
  
  //let quitarMarcado = document.getElementById('mostrarTareas');
  let correoUsuarioActivo = document.getElementById('usuarioLogueado').value;
  let usuario = '';
  let clase = '';
  let id = 0;
  let i = 0;
  mostrarTareasRestantes.classList.add('mostrar-ocultar');

  
    verTareas.forEach((doc) => {
      usuario = doc.data().Usuario;
      clase = doc.data().clase;
      id = doc.id
      
      if (correoUsuarioActivo === usuario && clase === 'marcar') {
        mostrarTareasRestantes.classList.add('mostrar-ocultar');       
        borrarLista(id)
        
        setTimeout(() => {
          mostrarTareasRestantes.classList.remove('mostrar-ocultar');
          mostrarTareasUsuarioActivo();
        }, 100);
      }
    
  })
 
       
}


function contarCerrarSesion(e) {
  if (e.target) {
    n = 0;
    window.setInterval(function(){      
      n++;
      if (n == 360000) {
        logOut();
      }
    }, 1000);
  } 
}



function tareasParaMostrar() {  
  mostrarTareasRestantes.classList.add('mostrar-ocultar');
}


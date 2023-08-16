//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
//import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getTareas, getTareasGuardadas, onGetTareas, borrarTarea, tareaActualizada, borrarLista } from './index.js'
let nombreUsuario = '';

let a = document.querySelector('.a');

a.classList.remove('b')
let usuarioLogueado = document.getElementById('usuarioLogueado').value;
let nombreUsua = document.getElementById('nombreUsua').value;

let cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', logOut);
let verTareasActivas = document.getElementById('mostrarTareas');


let mostrarT = await getTareas();
let verTareas = await getTareasGuardadas();
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
  
  ocultar.classList.remove('hidden')
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
       
    if (user) {
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


            console.log('Registro con exito');

            onGetTareas((mostrarTareas) => {
              let tareass = '';

              let idTarea = '';
              let statusTarea = '';
              let claseTarea = '';
              let cantidadTareas = [];
              let contador = 0;
              let contadorClase = 0;
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
                                     
                                      
                                      
                   }
                   if (claseTarea == 'marcar') {
                    cantidadTareas.push({n: idTarea})
                    contadorClase++;
                  } 
                 })
                 //console.log('las tareas son r: ' + tarea);
                 
                
                 document.getElementById('mostrarTareas').innerHTML = tarea;
                 if (cantidadTareas.length != 0) {
                  document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado">borrar marcados</button>`;
                 } else {
                  document.querySelector('.btnMarcar').innerHTML = ''
                 }
                 
                  if (contador >= 1) {
                   document.querySelector('.btnEliminarTodo').innerHTML = `<div class="mr-4">${contador} tarea activa</div><button id="${idTarea}" class="${claseTarea} borrado">borrar todo</button>`;
                  } else {
                   document.querySelector('.btnEliminarTodo').innerHTML = `<div class="mr-4">${contador} tarea activa</div>`;
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




mostrarTareasUsuarioActivo();




function observador() {
  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    let user1 = user;
    
    if(user1.emailVerified == false) {
      console.log('Usuario no Verificado');
      location = 'index.html';
    } else {
      
      if (user) {
        const uid = user.uid;
        const name = user.email;
        
        mostrarUsuarioActivo();
        
        function mostrarUsuarioActivo() {
          mostrarT.forEach((doc) => {
            nombreUsuario = doc.data().Correo;
            t = doc.data().Usuario;
            
            if (nombreUsuario === name) {
              let us = document.querySelector('.us');
              let usa = document.querySelector('.usa');
              us.classList.add('hidden')
              usa.classList.remove('hidden')
              document.getElementById('nombreUsua').value = t;

            }
          });
        };
        
        document.getElementById('usuarioLogueado').value = name;
        console.log('Usuario Activo');
      } else {
        location = 'index.html';
        a.classList.add('b')
      }
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
        console.log("Identificador de la tarea registrada: ", docRef.id);
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
    const status = statuTarea.checked ? "completed" : "pending"
    const clase = claseTarea.checked ? "marcar" : "desmarcar"
    
    let id = statuTarea.id;
    tareaActualizada(id, {status: status, clase: clase})
    mostrarTareasUsuarioActivo();
}



let editarTarea = document.querySelector('.checkear');
editarTarea.addEventListener('click', actualizarTareas);

function actualizarTareas(e) {

  let tarea = '';
  const botonEditarUnaTarea = e.target.closest(".js-edit");
 
  if (!botonEditarUnaTarea) return;
    const id = botonEditarUnaTarea.id;
    const input = botonEditarUnaTarea.closest("li").querySelector('input[type="text"]');
  
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      console.log('Editando..');
    } else {
      input.setAttribute("readonly", "");     
      tarea = input.value;      
      tareaActualizada(id, {Tarea: tarea})
      mostrarTareasUsuarioActivo();
      console.log('Tarea Actualizada');
    }
}

let borrarIndividual = document.querySelector('.checkear');
borrarIndividual.addEventListener('click', eliminarElementos);

function eliminarElementos(e)  {
  const borrarUnaTarea = e.target.closest(".js-delete");
  if (!borrarUnaTarea) return;
  borrarTarea(borrarUnaTarea.id)
  mostrarTareasUsuarioActivo();  
}


let borrarT = document.querySelector('.btnEliminar');
borrarT.addEventListener('click', eliminarListaCompleta);

function eliminarListaCompleta(e) {
  const borrarTodasTarea = e.target.closest(".borrado");
  if (!borrarTodasTarea) return;

  let borrarTodasTareas = document.getElementById('mostrarTareas');
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {       
    if (user) {             
      const name = user.email;
      let uActivo = '';
      let id = '';           
          
      mostrarT.forEach((doc) => {              
        nombreUsuario = doc.data().Correo;
       
        if (nombreUsuario === name) {         
          onGetTareas((mostrarTareas) => {
            mostrarTareas.forEach((doc) => {

              uActivo = doc.data().Usuario
              
              if (uActivo === name) {
                id = doc.id;

                borrarLista(id)
                borrarTodasTareas.classList.add('hidden');               
                mostrarTareasUsuarioActivo();                
              }
            });
          });
        }
      });
    }
  });
}







let borrarMarcados = document.querySelector('.btnEliminar');
borrarMarcados.addEventListener('click', eliminarMarcados);



function eliminarMarcados(e) {
  const borrarMarcado = e.target.closest(".marcado");
  if (!borrarMarcado) return;

  let quitarMarcado = document.getElementById('mostrarTareas');
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {       
    if (user) {             
      const name = user.email;
      let uActivo = '';
      let id = '';
      let clase = '';           
          
      mostrarT.forEach((doc) => {              
        nombreUsuario = doc.data().Correo;
       
        if (nombreUsuario === name) {         
          onGetTareas((mostrarTareas) => {
            mostrarTareas.forEach((doc) => {

              uActivo = doc.data().Usuario
              
              if (uActivo === name) {
                id = doc.id;
                clase = doc.data().clase;
                if (clase === 'marcar') {
                  borrarLista(id)
                  //quitarMarcado.classList.add('hidden');
                  mostrarTareasUsuarioActivo();
                }       
              }
            });
          });
        }
      });
    }
  });
}
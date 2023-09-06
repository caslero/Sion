//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
//import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getTareas, getTareasGuardadas, onGetTareas, borrarTarea, tareaActualizada, borrarLista } from './index.js'

let mostrarTareasRestantes = document.querySelector('.ocultare');
let barraProgreso = document.getElementById('barraProgreso');

// let redireccionar = document.querySelector('.eliminarTodo');
//       redireccionar.classList.add('hidden');

let a = document.querySelector('.a');
let usuarioLogueado = document.getElementById('usuarioLogueado').value;


function barraDeProgreso() {
  barraProgreso.classList.remove('ocultarTarea');

  setTimeout(() => {
    barraProgreso.classList.add('ocultarTarea')
  }, 1000)
}


a.classList.remove('b')


let nombreUsua = document.getElementById('nombreUsua').value;

let cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', logOut);
let verTareasActivas = document.getElementById('mostrarTareas');


let mostrarT = await getTareas();
let todasTareas = await getTareasGuardadas();

let t = '';



let btnEliminar = document.querySelector('.btnEliminar');





async function mostrarTareasUsuarioActivo(user) {


  let uActivo = user.email;
  let tarea = '';
  let tareaRealizada = '';
  let tareaEliminada = '';
  let tareass = '';
  let idTarea = '';
  let statusTarea = '';
  let claseTarea = '';
  let cantidadTareas = [];
  let contador = 0;
  let contadorClase = 0;


  const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
  const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {     

      contador++;

      tareass = doc.data().Tarea
      idTarea = doc.data().id
      claseTarea = doc.data().clase
      statusTarea = doc.data().status
      // doc.data() is never undefined for query doc snapshots

      if (statusTarea == 'pending') {
        tarea = tarea +  `<li class="listare" id="${doc.id}" data-clase="${claseTarea}" data-status="${statusTarea}">
                            <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
                                         <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${doc.id}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                         <input id="${doc.id}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
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
      } else {
        tareaRealizada = tareaRealizada +  `<li class="listare" id="${doc.id}" data-clase="${claseTarea}" data-status="${statusTarea}">
                                       <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
                                         <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${doc.id}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                         <input id="${doc.id}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
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
        contadorClase++;
        cantidadTareas.push({n: idTarea})
      } 
      //console.log(doc.id, " => ", doc.data());
      
      
        document.getElementById('mostrarTareasActivas').innerHTML = tarea;
    
        document.getElementById('mostrarTareasRealizadas').innerHTML = tareaRealizada;
        
      //   document.getElementById('mostrarTareasEliminadas').innerHTML = `<li class="listare" id="${doc.id}" data-clase="${claseTarea}" data-status="${statusTarea}">
      //   <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
      //     <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${doc.id}" ${statusTarea === "completed" ? "checked" : null}/>                       
      //     <input id="${doc.id}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
      //   </label>
      //   <div class="btn-contenedore md:basis-[20%] md:px-5 pr-2 md:pr-0 space-x-2">
      //     <button class="js-edit   circulos" id="${doc.id}">
      //       <i class="ri-pencil-fill"></i>
      //     </button>
      //     <button class="js-delete circulos" id="${doc.id}">
      //       <i class="ri-delete-bin-fill" title="Borrar Solo uno"></i>
      //     </button>
      //   </div>
      // </li>`;
    });


   
              

               if (contador == 0) {
                 document.getElementById('mostrarTareas').innerHTML = '';
               }
              
              
                 if (cantidadTareas.length != 0) {
                   document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
                 } else {
                   document.querySelector('.btnMarcar').innerHTML = ''
                 }
                
                 if (contador >= 1) {
                   document.querySelector('.btnEliminarTodo').innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
                   document.querySelector('.sinTareas').innerHTML = `<div class="mr-4 borrarTodo tareas"><b class="me-2">${contador}</b> Tareas activas</div>`;
                   
                 } else {
                   document.querySelector('.sinTareas').innerHTML = `<div class="borrarTodo tareas"><b class="me-2">${contador}</b> Tareas activas</div>`;
                   document.querySelector('.btnEliminarTodo').innerHTML = '';
                }



  
}

















// function s(){  
//   ocultar.classList.add('hidden')
//   document.getElementById('mostrarTareas').innerHTML = '';
// }


let n = 0;
function observador() {  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {

      let nombre = user.email
      let nombre2 = '';
      //redireccionar.classList.remove('hidden');
      document.getElementById('usuarioLogueado').value = user.email;

      mostrarT.forEach(doc => {
        nombre2 = doc.data().Correo;
        if (nombre === nombre2) {
          document.getElementById('nombreUsua').value = doc.data().Usuario;
        }
        
      })
    
      document.addEventListener("keypress", contarCerrarSesion);
      document.addEventListener("click", contarCerrarSesion);
      document.addEventListener('mousemove', contarCerrarSesion)     
      
      mostrarTareasUsuarioActivo(user);


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
      barraDeProgreso()
      observador()
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
        barraDeProgreso()
       observador()
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

async function cambiarEstadoTarea(e) {

  let uActivo = document.getElementById('usuarioLogueado').value;
  
  const statuTarea = e.target.closest('input[type="checkbox"]');
  const claseTarea = e.target.closest('input[type="checkbox"]');

  if (!statuTarea) return;    

  
    const status = statuTarea.checked ? "completed" : "pending"
    const clase = claseTarea.checked ? "marcar" : "desmarcar"
    let id = statuTarea.id;

    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (id == doc.id) {
        barraDeProgreso()
        tareaActualizada(id, {status: status, clase: clase});
        observador()
      }
    });

   
       
}





















let editarTarea = document.querySelector('.checkear');
editarTarea.addEventListener('click', actualizarTareas);

function actualizarTareas(e) {

  let tarea = '';
  const botonEditarUnaTarea = e.target.closest(".js-edit");
 
  if (!botonEditarUnaTarea) return;

  //mostrarTareasRestantes.classList.remove('mostrar-ocultar'); 
    
    const id = botonEditarUnaTarea.id;
    const input = botonEditarUnaTarea.closest("li").querySelector('input[type="text"]');
  
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      console.log('Editando..');
    } else {
      input.setAttribute("readonly", "");     
      tarea = input.value; 

      barraDeProgreso()
      tareaActualizada(id, {Tarea: tarea});
      console.log('Tarea Actualizada');
      observador()
      // setTimeout(() => {
      //   mostrarTareasRestantes.classList.remove('mostrar-ocultar');
      //   
      //   mostrarTareasUsuarioActivo();
      // }, 100);
    }
}

let borrarIndividual = document.querySelector('.checkear');
borrarIndividual.addEventListener('click', eliminarElementos);

async function eliminarElementos(e)  {

  let uActivo = document.getElementById('usuarioLogueado').value;
  const borrarUnaTarea = e.target.closest(".js-delete");
  if (!borrarUnaTarea) return;

  let id = borrarUnaTarea.id;
  
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id == id) {
        barraDeProgreso()
        borrarTarea(id)      
        observador()       
      }
    });
}


let borrarT = document.querySelector('.btnEliminar');
borrarT.addEventListener('click', eliminarListaCompleta);

async function eliminarListaCompleta(e) {
  
  let correoUsuarioActivo = document.getElementById('usuarioLogueado').value;
  let id = 0;
  const borrarTodasTarea = e.target.closest(".borrado");
  if (!borrarTodasTarea) return;

  const q = query(collection(db, "Tareas"), where("Usuario", "==", correoUsuarioActivo));  
  const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      id = doc.id;
      barraDeProgreso()
        borrarLista(id)
        //observador()
    });
    observador()
}







let borrarMarcados = document.querySelector('.btnEliminar');
borrarMarcados.addEventListener('click', eliminarMarcados);



async function eliminarMarcados(e) {

  let correoUsuarioActivo = document.getElementById('usuarioLogueado').value;
  let clase = '';
  let id = 0;
  
  const borrarMarcado = e.target.closest(".marcado");
  if (!borrarMarcado) return; 
  
  const q = query(collection(db, "Tareas"), where("Usuario", "==", correoUsuarioActivo));  
  const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      
      id = doc.id;
      clase = doc.data().clase;
      
      if (clase == 'marcar') {
        barraDeProgreso()
        borrarLista(id)
        observador()
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


let tituloTareas = document.getElementById('estadoTarea');
let tareaActiva = document.querySelector('.tareaActiva');
let tareaRealizada = document.querySelector('.tareaRealizada');
let tareaEliminada = document.querySelector('.tareaEliminada');
let activasVer = document.querySelector('.activasVer');
let realizadasVer = document.querySelector('.realizadasVer');

let clase1 = document.getElementById('clase1');
clase1.addEventListener('click', tareasActivas) 

  function tareasActivas() {
    console.log('Activas ');

    activasVer.classList.remove('activas-ocultas')
    activasVer.classList.add('activas')

    realizadasVer.classList.remove('realizadas-ocultas')
    realizadasVer.classList.add('realizadas')

    // eliminadasVer.classList.remove('eliminadas-ocultas')
    // eliminadasVer.classList.add('eliminadas')

    tituloTareas.innerHTML = 'Tareas Activas';

    tareaActiva.classList.remove('ocultarTarea')
    tareaActiva.classList.add('ocultarTarea1')

    tareaRealizada.classList.add('ocultarTarea')
    tareaRealizada.classList.remove('ocultarTarea1')
    
    // tareaEliminada.classList.remove('ocultarTarea1')
    // tareaEliminada.classList.add('ocultarTarea')

    observador()
}


let clase2 = document.getElementById('clase2');
clase2.addEventListener('click', tareasRealizadas)

function tareasRealizadas() {
  console.log('Realizadas ');


    activasVer.classList.remove('activas')
    activasVer.classList.add('activas-ocultas')

    realizadasVer.classList.add('realizadas-ocultas')
    realizadasVer.classList.remove('realizadas')

    // eliminadasVer.classList.remove('eliminadas-ocultas')
    // eliminadasVer.classList.add('eliminadas')

    tituloTareas.innerHTML = 'Tareas Realizadas';

    tareaActiva.classList.remove('ocultarTarea1')
    tareaActiva.classList.add('ocultarTarea')

    tareaRealizada.classList.remove('ocultarTarea')
    tareaRealizada.classList.add('ocultarTarea1')

    // tareaEliminada.classList.remove('ocultarTarea1')
    // tareaEliminada.classList.add('ocultarTarea')

    observador()
}


// let eliminadasVer = document.querySelector('.eliminadasVer');
// eliminadasVer.addEventListener('click', () => {
//     console.log('Eliminadas');
//     activasVer.classList.remove('activas')
//     activasVer.classList.add('activas-ocultas')

//     realizadasVer.classList.remove('realizadas-ocultas')
//     realizadasVer.classList.add('realizadas')

//     eliminadasVer.classList.remove('eliminadas')
//     eliminadasVer.classList.add('eliminadas-ocultas')

//     tituloTareas.innerHTML = 'Tareas Eliminadas';

//     tareaActiva.classList.remove('ocultarTarea1')
//     tareaActiva.classList.add('ocultarTarea')
    
//     tareaRealizada.classList.remove('ocultarTarea1')
//     tareaRealizada.classList.add('ocultarTarea')

//     tareaEliminada.classList.remove('ocultarTarea')
//     tareaEliminada.classList.add('ocultarTarea1')

//     observador()    
// })





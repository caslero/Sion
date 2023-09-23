//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs, orderBy, limit} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
//import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getTareas, getTareasGuardadas, onGetTareas, borrarTarea, tareaActualizada, borrarLista } from './index.js'

let mostrarTareasRestantes = document.querySelector('.ocultare');
let barraProgreso = document.getElementById('barraProgreso');

// let redireccionar = document.querySelector('.eliminarTodo');
//       redireccionar.classList.add('hidden');

let a = document.querySelector('.a');
let usuarioLogueado = document.getElementById('usuarioLogueado').value;


let modalConfirmar = document.getElementById('modalConfirmar');
let modalEliminar = document.getElementById('modalEliminar');


let ocultarFiltrado = document.querySelector('.ocultarFiltrado');
let quitarBuscador = document.querySelector('.quitarBuscador');
let ningunaTarea = document.getElementById('ningunaTarea');

quitarBuscador.addEventListener('click', () => {
  let buscandoTarea = document.getElementById('buscandoTarea');
  buscandoTarea.value = '';
  ocultarFiltrado.classList.add('hidden')
  observador()
  ningunaTarea.classList.add('hidden');
})

let quitarBuscador2 = document.querySelector('.quitarBuscador2');

quitarBuscador2.addEventListener('click', () => {
  let buscandoTarea = document.getElementById('buscandoTarea');
  buscandoTarea.value = '';
  ocultarFiltrado.classList.add('hidden')
  observador()
  ningunaTarea.classList.add('hidden');
})


let quitarBuscador3 = document.querySelector('.quitarBuscador3');

quitarBuscador3.addEventListener('click', () => {
  let buscandoTarea = document.getElementById('buscandoTarea');
  buscandoTarea.value = '';
  ocultarFiltrado.classList.add('hidden')
  observador()
  ningunaTarea.classList.add('hidden');
})

let quitarBuscador4 = document.querySelector('.quitarBuscador4');

quitarBuscador4.addEventListener('click', () => {
  let buscandoTarea = document.getElementById('buscandoTarea');
  buscandoTarea.value = '';
  ocultarFiltrado.classList.add('hidden')
  observador()
  ningunaTarea.classList.add('hidden');
})

let quitarBuscador5 = document.querySelector('.quitarBuscador5');

quitarBuscador5.addEventListener('click', () => {
  let buscandoTarea = document.getElementById('buscandoTarea');
  buscandoTarea.value = '';
  ocultarFiltrado.classList.add('hidden')
  observador()
  ningunaTarea.classList.add('hidden');
})

// let quitarBuscador6 = document.querySelector('.quitarBuscador6');

// quitarBuscador6.addEventListener('click', () => {
//   let buscandoTarea = document.getElementById('buscandoTarea');
//   buscandoTarea.value = '';
//   ocultarFiltrado.classList.add('hidden')
//   observador()
//   ningunaTarea.classList.add('hidden');
// })

let quitarBuscador7 = document.querySelector('.quitarBuscador7');

quitarBuscador7.addEventListener('click', () => {
  let buscandoTarea = document.getElementById('buscandoTarea');
  buscandoTarea.value = '';
  ocultarFiltrado.classList.add('hidden')
  observador()
  ningunaTarea.classList.add('hidden');
})


a.classList.remove('b')


let nombreUsua = document.getElementById('nombreUsua').value;




let cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', logOut);


let verTareasActivas = document.getElementById('mostrarTareas');



let mostrarT = await getTareas();





let limite = 3
let pagina = 1

async function mostrarTareasUsuarioActivo(user) {
  
  let ascendente = document.getElementById('ordenando');
  let orden = ascendente.innerHTML;

  let uActivo = user.email;
  let tarea = '';
  let tareass = '';
  let idTarea = '';
  let statusTarea = '';
  let claseTarea = '';
  let cantidadTareas = [];
  let contador = 0;
  let contadorClase = 0;
  let idFirebase = '';

  if (orden == 'Ascendente') {
    
    //const q = query(collection(db, "Tareas"), orderBy('Tarea', 'asc'));
    const q = query(collection(db, "Tareas"), where('Usuario', '==', uActivo));
    const querySnapshot = await getDocs(q);

    let todas = [];
    let todos = [];
    let nuevoTodos = [];
    todas = querySnapshot.docs;

    todas.forEach(doc => {
     
      nuevoTodos.push({
        id: doc.data().id,
        Usuario: doc.data().Usuario,
        Tarea: doc.data().Tarea,
        status: doc.data().status,
        clase: doc.data().clase,
        idFirebase: doc.id
      })
      if (doc.data().clase === 'marcar') {
        contadorClase++;
        cantidadTareas.push({n: idTarea})
      }
    })

    todos = nuevoTodos 
    todos.sort((a , b) => {
      if (a.Tarea < b.Tarea) {
        return -1;
      } else if (a.Tarea > b.Tarea) {
        return 1;
      } else {
        return 0;
      }
    })



    const tareasTotales = todos.length;
    let cantidadPaginas = tareasTotales / limite;
    let x = Math.ceil(cantidadPaginas);
    document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
    const tareasPorPaginas = (pagina - 1) * limite;
    let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas); 

    contador = todos.length
    // querySnapshot.forEach((doc) => {     
    //   if (doc.data().Usuario == uActivo) {
    //     claseTarea = doc.data().clase
        
    //   }
    //   if (claseTarea == 'marcar') {
    //     contadorClase++;
    //     cantidadTareas.push({n: idTarea})
    //   }
    // })

    if (contador != 0) {
      document.getElementById('btnPagina').classList.remove('hidden')
      
      if (pagina == 2 && pagina != x) {
        document.getElementById('btnPagina').classList.remove('hidden')
        siguiente.classList.remove('hidden')
      }
    }
    if (x > 1) {
      document.getElementById('btnSiguiente').classList.remove('hidden')
    } else {
      document.getElementById('btnSiguiente').classList.add('hidden')
    }
    if (pagina > 1 && pagina == x) {
      document.getElementById('btnSiguiente').classList.remove('hidden')
      document.getElementById('btnAnterior').classList.remove('hidden')
      anterior.classList.remove("hidden");
      siguiente.classList.add("hidden");
    } else if (pagina > 1 && pagina < x) {
      console.log('entrando sub a la pagina mayor de 2');

      document.getElementById('btnSiguiente').classList.remove('hidden')
      document.getElementById('btnAnterior').classList.remove('hidden')
      anterior.classList.remove("hidden");
      anterior.classList.remove("hidden");
    }
    if (pagina > x) {
      retroceder()     
    }

    
    
    items.map((doc) => {
      //if (doc.data().Usuario == uActivo) {
        
        
        tareass = doc.Tarea
        idTarea = doc.id
        claseTarea = doc.clase
        statusTarea = doc.status
        idFirebase = doc.idFirebase
        tarea = tarea +  `<li class="listare" id="${idFirebase}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareass}">
                            <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
                              <input id="${idFirebase}" type="checkbox"  clase="sin-checkear cambiar" value="${idFirebase}" ${statusTarea === "completed" ? "checked" : null}/>                       
                              <input id="${idFirebase}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
                            </label>
                            <div class="btn-contenedore ms-2 md:basis-[20%] space-x-2 pe-2">
                              <button class="js-edit   circulos cambioEditarTarea" id="${idFirebase}" title="Editar tarea">
                                <i class="ri-pencil-fill cambiarIcono"></i>
                              </button>
                              <button class="js-delete circulos" id="${idFirebase}">
                                <i class="ri-delete-bin-fill" title="Borrar tarea"></i>
                              </button>
                            </div>
                          </li>`;
        //}
        
    });  

    document.getElementById('mostrarTareas').innerHTML = tarea;
     
    if (contador == 0) {
      document.getElementById('mostrarTareas').innerHTML = '';
      document.getElementById('btnSiguiente').classList.add('hidden')
    }
    if (cantidadTareas.length != 0) {
      document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
    } else {
      document.querySelector('.btnMarcar').innerHTML = ''
    }
    if (contador >= 1) {
      
      document.querySelector('.btnEliminarTodo').innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
      document.querySelector('.sinTareas').innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
    } else {
      document.querySelector('.sinTareas').innerHTML = '';
      document.querySelector('.btnEliminarTodo').innerHTML = '';
    }
  } else {
    //const q = query(collection(db, "Tareas"), orderBy('Tarea', 'desc'));
    const q = query(collection(db, "Tareas"), where('Usuario', '==', uActivo));
    const querySnapshot = await getDocs(q);

    let todas = [];
    let todos = [];
    let nuevoTodos = [];
    todas = querySnapshot.docs;

    todas.forEach(doc => {
      
      nuevoTodos.push({
        id: doc.data().id,
        Usuario: doc.data().Usuario,
        Tarea: doc.data().Tarea,
        status: doc.data().status,
        clase: doc.data().clase,
        idFirebase: doc.id
      })
      if (doc.data().clase === 'marcar') {
        contadorClase++;
        cantidadTareas.push({n: idTarea})
      }
    })
    
    todos = nuevoTodos
    todos.sort((a , b) => {
      if (a.Tarea > b.Tarea) {
        return -1;
      } else if (a.Tarea < b.Tarea) {
        return 1;
      } else {
        return 0;
      }
    })
   
    contador = todos.length

    const tareasTotales = contador;
    let cantidadPaginas = tareasTotales / limite;
    let x = Math.ceil(cantidadPaginas);
    
    document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
    const tareasPorPaginas = (pagina - 1) * limite;
    let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas); 

    

    if (contador != 0) {
      document.getElementById('btnPagina').classList.remove('hidden')
      
      if (pagina == 2 && pagina != x) {
        document.getElementById('btnPagina').classList.remove('hidden')
        siguiente.classList.remove('hidden')
      }
    }
    if (x > 1) {
      document.getElementById('btnSiguiente').classList.remove('hidden')
    } else {
      document.getElementById('btnSiguiente').classList.add('hidden')
    }
    if (pagina > 1 && pagina == x) {

      document.getElementById('btnSiguiente').classList.remove('hidden')
      document.getElementById('btnAnterior').classList.remove('hidden')
      anterior.classList.remove("hidden");
      siguiente.classList.add("hidden");
    } else if (pagina > 1 && pagina < x) {

      document.getElementById('btnSiguiente').classList.remove('hidden')
      document.getElementById('btnAnterior').classList.remove('hidden')
      anterior.classList.remove("hidden");
      anterior.classList.remove("hidden");
    }
    if (pagina > x) {
      retroceder()     
    }

    
    
    items.forEach((doc) => {
      //if (doc.data().Usuario == uActivo) {
        
        tareass = doc.Tarea
        idTarea = idFirebase
        claseTarea = doc.clase
        statusTarea = doc.status
        idFirebase = doc.idFirebase
        tarea = tarea +  `<li class="listare" id="${idFirebase}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareass}">
                            <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
                              <input id="${idFirebase}" type="checkbox"  clase="sin-checkear cambiar" value="${idFirebase}" ${statusTarea === "completed" ? "checked" : null}/>                       
                              <input id="${idFirebase}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
                            </label>
                            <div class="btn-contenedore ms-2 md:basis-[20%] space-x-2 pe-2">
                              <button class="js-edit   circulos cambioEditarTarea" id="${idFirebase}" title="Editar tarea">
                                <i class="ri-pencil-fill cambiarIcono"></i>
                              </button>
                              <button class="js-delete circulos" id="${idFirebase}">
                                <i class="ri-delete-bin-fill" title="Borrar tarea"></i>
                              </button>
                            </div>
                          </li>`;
       // }
        
    });  

    document.getElementById('mostrarTareas').innerHTML = tarea;
     
    if (contador == 0) {
      document.getElementById('mostrarTareas').innerHTML = '';
      document.getElementById('btnSiguiente').classList.add('hidden')
    }
    if (cantidadTareas.length != 0) {
      document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
    } else {
      document.querySelector('.btnMarcar').innerHTML = ''
    }
    if (contador >= 1) {
      
      document.querySelector('.btnEliminarTodo').innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
      document.querySelector('.sinTareas').innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
    } else {
      document.querySelector('.sinTareas').innerHTML = '';
      document.querySelector('.btnEliminarTodo').innerHTML = '';
    }
  }
}
//   let ascendente = document.getElementById('ordenando');
//   let orden = ascendente.innerHTML;

//   let uActivo = user.email;
//   let tarea = '';
//   let tareass = '';
//   let idTarea = '';
//   let statusTarea = '';
//   let claseTarea = '';
//   let cantidadTareas = [];
  
//   let contador = 0;
//   let contadorClase = 0;
 
//   if (orden == 'Ascendente') {

//     const q = query(collection(db, "Tareas"), orderBy('Tarea', 'asc'));
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {     
//       if (doc.data().Usuario == uActivo) {
//         claseTarea = doc.data().clase
//         contador++;
//       }
//       if (claseTarea == 'marcar') {
//         contadorClase++;
//         cantidadTareas.push({n: idTarea})
//       }
//     })

//     let todos = [];
//     todos = querySnapshot.docs;

//     const tareasTotales = todos.length;
//     let cantidadPaginas = tareasTotales / limite;
//     let x = Math.ceil(cantidadPaginas);
//     document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
//     const tareasPorPaginas = (pagina - 1) * limite;
//     let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas); 
    
    
//     items.map((doc) => {
//       if (doc.data().Usuario == uActivo) {
//         contador++;
//         tareass = doc.data().Tarea
//         idTarea = doc.data().id
//         claseTarea = doc.data().clase
//         statusTarea = doc.data().status

//         tarea = tarea +  `<li class="listare" id="${doc.id}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareass}">
//                             <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
//                               <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${doc.id}" ${statusTarea === "completed" ? "checked" : null}/>                       
//                               <input id="${doc.id}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
//                             </label>
//                             <div class="btn-contenedore ms-2 md:basis-[20%] space-x-2 pe-2">
//                               <button class="js-edit   circulos cambioEditarTarea" id="${doc.id}" title="Editar tarea">
//                                 <i class="ri-pencil-fill cambiarIcono"></i>
//                               </button>
//                               <button class="js-delete circulos" id="${doc.id}">
//                                 <i class="ri-delete-bin-fill" title="Borrar tarea"></i>
//                               </button>
//                             </div>
//                           </li>`;
//         }
        
//     });  

//     document.getElementById('mostrarTareas').innerHTML = tarea;
     
//     if (contador == 0) {
//       document.getElementById('mostrarTareas').innerHTML = '';
//     }
//     if (cantidadTareas.length != 0) {
//       document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
//     } else {
//       document.querySelector('.btnMarcar').innerHTML = ''
//     }
//     if (contador >= 1) {
//       document.querySelector('.btnEliminarTodo').innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
//       document.querySelector('.sinTareas').innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
//     } else {
//       document.querySelector('.sinTareas').innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
//       document.querySelector('.btnEliminarTodo').innerHTML = '';
//     }
//   } else {



//     const q = query(collection(db, "Tareas"), orderBy('Tarea', 'desc'));
//     const querySnapshot = await getDocs(q);


//     querySnapshot.forEach((doc) => {     
//       if (doc.data().Usuario == uActivo) {
//         claseTarea = doc.data().clase
//         contador++;
//       }
//       if (claseTarea == 'marcar') {
//         contadorClase++;
//         cantidadTareas.push({n: idTarea})
//       }
//     })

//     let todos = [];
//     todos = querySnapshot.docs;

//     const tareasTotales = todos.length;
//     let cantidadPaginas = tareasTotales / limite;
//     let x = Math.ceil(cantidadPaginas);
//     document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
//     const tareasPorPaginas = (pagina - 1) * limite;
//     let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);
    

//     items.map((doc) => {      
//       if (doc.data().Usuario == uActivo) {       
//         tareass = doc.data().Tarea
//         idTarea = doc.data().id
//         claseTarea = doc.data().clase
//         statusTarea = doc.data().status

//         tarea = tarea +  `<li class="listare" id="${doc.id}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareass}">
//                             <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
//                               <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${doc.id}" ${statusTarea === "completed" ? "checked" : null}/>                       
//                               <input id="${doc.id}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
//                             </label>
//                             <div class="btn-contenedore ms-2 md:basis-[20%] space-x-2 pe-2">
//                               <button class="js-edit   circulos cambioEditarTarea" id="${doc.id}" title="Editar tarea">
//                                 <i class="ri-pencil-fill cambiarIcono"></i>
//                               </button>
//                               <button class="js-delete circulos" id="${doc.id}">
//                                 <i class="ri-delete-bin-fill" title="Borrar tarea"></i>
//                               </button>
//                             </div>
//                           </li>`;
//         }
      
//     });

//     // document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " // " + x;
//     // // console.log('pagina ' + pagina);
//     // // console.log('x ' + x);
//     // if (x == 0) {
//     //   document.getElementById('pagina').innerHTML = '';
//     // } 
    
//     // if (pagina > x) {
//     //   pagina--
//     //  retroceder()
//     // }

//     // if (pagina <= x) {
//     //   siguiente.classList.remove("hidden");
//     //   anterior.classList.add("hidden");
//     //   console.log('primera sub condicion');
//     //   document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
//     //   if (pagina > 1 && x >= pagina) {
//     //     console.log('segunda sub condicion');
//     //     siguiente.classList.add("hidden");
//     //     anterior.classList.remove("hidden");
//     //   } else if (pagina == x) {
//     //     console.log('tercera sub condicion');
//     //     siguiente.classList.add("hidden");
//     //     anterior.classList.add("hidden");
//     //   }
      
      
//     // }
 
 
//     document.getElementById('mostrarTareas').innerHTML = tarea;
     
//     if (contador == 0) {
//       document.getElementById('mostrarTareas').innerHTML = '';
//     }
//     if (cantidadTareas.length != 0) {
//       document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
//     } else {
//       document.querySelector('.btnMarcar').innerHTML = ''
//     }
//     if (contador >= 1) {
//       document.querySelector('.btnEliminarTodo').innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
//       document.querySelector('.sinTareas').innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
//     } else {
//       document.querySelector('.sinTareas').innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
//       document.querySelector('.btnEliminarTodo').innerHTML = '';
//     }
//   }  
// }




let anterior = document.getElementById("anterior");
let siguiente = document.getElementById("siguiente");

anterior.addEventListener('click', retroceder)
siguiente.addEventListener('click', avanzar)

async function retroceder() {
 
  pagina = pagina - 1;

  let uActivo = document.getElementById('usuarioLogueado').value;
  const q = query(collection(db, "Tareas"), orderBy('Tarea', 'desc'));
  const querySnapshot = await getDocs(q);

  
  let todos = [];
  todos = querySnapshot.docs;

  const tareasTotales = todos.length;
  let cantidadPaginas = tareasTotales / limite;
  let x = Math.ceil(cantidadPaginas);
  //document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
  const tareasPorPaginas = (pagina - 1) * limite;
  let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);
  let userActivo = ''

  if (pagina <= 1) {
    document.getElementById('btnPagina').classList.add('hidden')
    pagina = 1
    items.map((todo) => {
      observador(todo)
    });
  }


 
    if (pagina <= 1 && pagina <= x) {
      anterior.classList.add("hidden");
      siguiente.classList.remove("hidden");    
      items.map((todo) => {
        observador(todo)
      });
    } else if (pagina > 1 && pagina < x) {
      anterior.classList.remove("hidden");
      siguiente.classList.remove("hidden");
      items.map((todo) => {
        observador(todo)
      });
    } else if (pagina > 1 && pagina <= x) {
      anterior.classList.remove("hidden");
      siguiente.classList.add("hidden");
      items.map((todo) => {
        observador(todo)
      });
    }
  

  
}


async function avanzar() {
  pagina = pagina + 1;
  let uActivo = document.getElementById('usuarioLogueado').value;
  const q = query(collection(db, "Tareas"), orderBy('Tarea', 'desc'));
  const querySnapshot = await getDocs(q);

 
  let todos = [];
  todos = querySnapshot.docs;

  const tareasTotales = todos.length;
  let cantidadPaginas = tareasTotales / limite;
  let x = Math.ceil(cantidadPaginas);
  //document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
  const tareasPorPaginas = (pagina - 1) * limite;
  let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas); 
  

  if (pagina >= x) {
    //document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
    siguiente.classList.add("hidden");
    anterior.classList.remove("hidden");
    
    items.map((todo) => {
      observador(todo)
    });
  } else if (pagina < x) {
    //document.getElementById('pagina').innerHTML = "Pagina: " + pagina + " / " + x;
    siguiente.classList.remove("hidden");
    anterior.classList.remove("hidden");
    items.map((todo) => {
      observador(todo)
    });
  }
  if (pagina >= 2 && pagina < x) {
   
    document.getElementById('btnAnterior').classList.remove('hidden')
    document.getElementById('btnSiguiente').classList.remove('hidden')
    siguiente.classList.remove("hidden");
    anterior.classList.remove("hidden");
  }
}





















let n = 0;
function observador() {  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let nombre = user.email
      let nombre2 = '';
      let nombreUsuarioActivo = '';
      //redireccionar.classList.remove('hidden');
      document.getElementById('usuarioLogueado').value = user.email;

      mostrarT.forEach(doc => {
        nombre2 = doc.data().Correo;
        if (nombre === nombre2) {
          nombreUsuarioActivo = doc.data().Usuario
          document.getElementById('nombreUsua').innerHTML = nombreUsuarioActivo;
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

    let todas = [];
    let todos = [];
    let nuevoTodos = [];
    todas = querySnapshot.docs;

    todas.forEach(doc => {
     
      nuevoTodos.push({
        id: doc.data().id,
        Usuario: doc.data().Usuario,
        Tarea: doc.data().Tarea,
        status: doc.data().status,
        clase: doc.data().clase,
        idFirebase: doc.id
      })
    })

    todos = nuevoTodos

    todos.forEach((doc) => {
      if (doc.idFirebase == id) {
        barraDeProgreso()
        tareaActualizada(id, {status: status, clase: clase});
        observador() 
      }
    })  
}





let ocultarTarea = document.querySelector('.barraProgresos'); 
let editarTarea = document.querySelector('.checkear');
editarTarea.addEventListener('click', actualizarTareas);

async function actualizarTareas(e) {

  let menufiltrado = document.getElementById('menufiltrado');
  let uActivo = document.getElementById('usuarioLogueado').value;
  let cambiarIconoActualizarTarea = e.target.closest(".cambiarIcono");
   
  let tarea = '';
  const botonEditarUnaTarea = e.target.closest(".js-edit");
 
  if (!botonEditarUnaTarea) return;
    const id = botonEditarUnaTarea.id;
    const input = botonEditarUnaTarea.closest("li").querySelector('input[type="text"]');

    menufiltrado.classList.add('hidden')
    cambiarIconoActualizarTarea.classList.remove('ri-pencil-fill');
    botonEditarUnaTarea.classList.remove('circulos')

    cambiarIconoActualizarTarea.classList.add('ri-edit-box-fill');
    botonEditarUnaTarea.classList.add('circulosEditando')

    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);
      
    
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");      
      ocultarTarea.classList.remove('ocultarTarea');
      document.getElementById('estadoTarea').innerHTML = 'Editando Tarea...';
      
      //barraDeProgreso()
    } else {
      document.getElementById('estadoTarea').innerHTML = '';
      input.setAttribute("readonly", "");     
      tarea = input.value;
      document.getElementById('estadoTarea').innerHTML = 'Tarea actualizada...';
      querySnapshot.forEach((doc) => {
        if (doc.id == id) {
          cambiarIconoActualizarTarea.classList.remove('ri-edit-box-fill');
          botonEditarUnaTarea.classList.remove('circulosEditando')
          cambiarIconoActualizarTarea.classList.add('ri-pencil-fill');
          botonEditarUnaTarea.classList.add('circulos')
          barraDeProgreso()
          tareaActualizada(id, {Tarea: tarea});     
          observador()
        }
      })
    }
}

let borrarIndividual = document.querySelector('.checkear');
borrarIndividual.addEventListener('click', eliminarElementos);

async function eliminarElementos(e)  {
  
  let modalConfirmado = document.getElementById('modalConfirmar')
  let modalConfirmar1 = document.getElementById('modalConfirmar1')
  let modalConfirmar2 = document.getElementById('modalConfirmar2')
  let menufiltrado = document.getElementById('menufiltrado');
  let medio = document.getElementById('medio')
  let uActivo = document.getElementById('usuarioLogueado').value;
  const borrarUnaTarea = e.target.closest(".js-delete");
  

  if (!borrarUnaTarea) return;  
    let id = borrarUnaTarea.id;

    menufiltrado.classList.add('hidden')
    medio.classList.remove('subModalConfirmar')
    modalConfirmar1.classList.add('w-[100%]');
    modalConfirmar2.classList.add('w-[100%]');
    modalConfirmar2.classList.add('right-0');
    body.classList.add('overflow-y-hidden');
    alerta.innerHTML = 'Desea eliminar esta tarea?'
    
    modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                                <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>                        `;

  
    let aceptar = document.querySelector('.aceptar');
    aceptar.addEventListener('click', async () => {
      const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
      const querySnapshot = await getDocs(q);

      let todas = [];
      let todos = [];
      let nuevoTodos = [];
      todas = querySnapshot.docs;
  
      todas.forEach(doc => {
       
        nuevoTodos.push({
          id: doc.data().id,
          Usuario: doc.data().Usuario,
          Tarea: doc.data().Tarea,
          status: doc.data().status,
          clase: doc.data().clase,
          idFirebase: doc.id
        })
      })

      todos = nuevoTodos

      todos.forEach((doc) => {
        if (doc.idFirebase == id) {
          medio.classList.add('subModalConfirmar')
          modalConfirmar1.classList.remove('w-[100%]');
          modalConfirmar2.classList.remove('w-[100%]');
          modalConfirmar2.classList.remove('right-0');          
          body.classList.remove('overflow-y-hidden'); 

          barraDeProgreso()
          borrarTarea(id)          
          observador()          
        }
      });
    })

    let cancelar = document.getElementById('cancelar');
    cancelar.addEventListener('click', () => {
      medio.classList.add('subModalConfirmar')
      modalConfirmar1.classList.remove('w-[100%]');
      modalConfirmar2.classList.remove('w-[100%]');
      modalConfirmar2.classList.remove('right-0');
      body.classList.remove('overflow-y-hidden');
      barraDeProgreso()
      observador()      
      return
    })
}



let borrarT = document.querySelector('.btnEliminar');
borrarT.addEventListener('click', eliminarListaCompleta);

async function eliminarListaCompleta(e) {
  
  let modalConfirmado = document.getElementById('modalConfirmar')
  let modalConfirmar1 = document.getElementById('modalConfirmar1')
  let modalConfirmar2 = document.getElementById('modalConfirmar2')
  let menufiltrado = document.getElementById('menufiltrado');
  let medio = document.getElementById('medio')
  let uActivo = document.getElementById('usuarioLogueado').value;
  let id = 0;
  const borrarTodasTarea = e.target.closest(".borrado");
  if (!borrarTodasTarea) return;

  
  menufiltrado.classList.add('hidden')
  medio.classList.remove('subModalConfirmar')
  modalConfirmar1.classList.add('w-[100%]');
  modalConfirmar2.classList.add('w-[100%]');
  modalConfirmar2.classList.add('right-0');  
  body.classList.add('overflow-y-hidden');
  alerta.innerHTML = 'Desea eliminar todas las tareas?'
  
  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>                        `;

  
  let aceptar = document.querySelector('.aceptar');
  aceptar.addEventListener('click', async () => {
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      id = doc.id;
      if (id) {
        medio.classList.add('subModalConfirmar')
        modalConfirmar1.classList.remove('w-[100%]');
        modalConfirmar2.classList.remove('w-[100%]');
        modalConfirmar2.classList.remove('right-0');        
        body.classList.remove('overflow-y-hidden');
        barraDeProgreso()
        borrarLista(id)
        observador()
      }
    });
  })

  let cancelar = document.getElementById('cancelar');
  cancelar.addEventListener('click', () => {
    medio.classList.add('subModalConfirmar')
    modalConfirmar1.classList.remove('w-[100%]');
    modalConfirmar2.classList.remove('w-[100%]');
    modalConfirmar2.classList.remove('right-0');    
    body.classList.remove('overflow-y-hidden');
    barraDeProgreso()
    observador()
    return
  })
}


let borrarMarcados = document.querySelector('.btnEliminar');
borrarMarcados.addEventListener('click', eliminarMarcados);
async function eliminarMarcados(e) {

  let modalConfirmado = document.getElementById('modalConfirmar')
  let modalConfirmar1 = document.getElementById('modalConfirmar1')
  let modalConfirmar2 = document.getElementById('modalConfirmar2')
  let menufiltrado = document.getElementById('menufiltrado');
  let medio = document.getElementById('medio')
  let uActivo = document.getElementById('usuarioLogueado').value;
  let clase = '';
  let id = 0;
  
  const borrarMarcado = e.target.closest(".marcado");
  if (!borrarMarcado) return; 

  
    menufiltrado.classList.add('hidden')
    medio.classList.remove('subModalConfirmar')
    modalConfirmar1.classList.add('w-[100%]');
    modalConfirmar2.classList.add('w-[100%]');
    modalConfirmar2.classList.add('right-0');    
    body.classList.add('overflow-y-hidden');
    alerta.innerHTML = 'Desea eliminar las tareas marcadas?'
  
  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>                        `;

  

  let aceptar = document.querySelector('.aceptar');
  aceptar.addEventListener('click', async () => {
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo), where("clase", "==", 'marcar'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {    
        medio.classList.add('subModalConfirmar')
        modalConfirmar1.classList.remove('w-[100%]');
        modalConfirmar2.classList.remove('w-[100%]');
        modalConfirmar2.classList.remove('right-0');        
        body.classList.remove('overflow-y-hidden');
        barraDeProgreso()
        borrarLista(doc.id)
        observador()      
    });
  })

  let cancelar = document.getElementById('cancelar');
  cancelar.addEventListener('click', () => {
    medio.classList.add('subModalConfirmar')
    modalConfirmar1.classList.remove('w-[100%]');
    modalConfirmar2.classList.remove('w-[100%]');
    modalConfirmar2.classList.remove('right-0');    
    body.classList.remove('overflow-y-hidden');
    barraDeProgreso()
    observador()
    return
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


function barraDeProgreso() {
  barraProgreso.classList.remove('ocultarTarea');
  

  setTimeout(() => {
    barraProgreso.classList.add('ocultarTarea')
    document.getElementById('estadoTarea').innerHTML = '';
  }, 1000)
}


let today = new Date();

let nDia = { weekday: 'long'};
let dia = { day: 'numeric'};
let mes = { month: 'long'};
let year = { year: 'numeric'};

let nombreDia = today.toLocaleString('es-es', nDia);
let diaActual = today.toLocaleString('es-es', dia);
let mesActual = today.toLocaleString('es-es', mes);
let yearActual = today.toLocaleString('es-es', year);

document.getElementById('nombreDia').innerHTML = nombreDia;
document.getElementById('dia').innerHTML = diaActual;
document.getElementById('mes').innerHTML = mesActual;
document.getElementById('year').innerHTML = yearActual;


let menuSalirUsuario = document.getElementById('dropdownDefaultButton');
menuSalirUsuario.addEventListener('click', menuSalir);
function menuSalir() {
  
  let mostrarMenu = document.getElementById('dropdown');
  mostrarMenu.classList.toggle('hidden')

  setTimeout(() => {
    mostrarMenu.classList.add('hidden')
  }, 4000)
}




let filtrado = document.getElementById('filtrado');
filtrado.addEventListener('click', menuFiltradoTarea);
function menuFiltradoTarea() {
  
  let menufiltrado = document.getElementById('menufiltrado');
  menufiltrado.classList.toggle('hidden')
}


let ascendente = document.getElementById('ordenando');
ascendente.addEventListener('click', ordenLista);

function ordenLista() {
  if (ascendente.innerHTML == 'Ascendente') {
    document.getElementById('ordenando').innerHTML = 'Descendente';
    observador()
  } else {
    document.getElementById('ordenando').innerHTML = 'Ascendente';
    observador()
  }
}




document.addEventListener('keyup', (e) => {

  let buscador = document.getElementById('ningunaTarea');
  let verdaderos = 0;
  let falsos = 0;
 
  if (e.target.matches('#buscandoTarea')) {
    document.querySelectorAll('.listare').forEach(tareas => {     
      tareas.dataset.value.toLowerCase().includes(e.target.value)      
      ? tareas.classList.remove('hidden')
      : tareas.classList.add('hidden')

      let a = tareas.dataset.value.toLowerCase().includes(e.target.value);
      verdaderos++

      if (a == false) {
        falsos++
      }
      
    })
    if (verdaderos - falsos == 0) {
      buscador.classList.remove('hidden')
      buscador.classList.add('flex')
      document.getElementById('ningunaTarea').innerHTML = 'No hay coincidencias...'
    } else {
      document.getElementById('ningunaTarea').innerHTML = ''
      buscador.classList.remove('flex')
      buscador.classList.add('hidden')      
    }   
  }
})

let alerta = document.querySelector('.alerta');
let confirmarModal = document.querySelector('.confirmarModal');
confirmarModal.addEventListener('click', () => {
  
  alerta.classList.add('text-3xl')
  alerta.classList.add('parpadea', 'texto')
  

  setTimeout(() => {
    alerta.classList.remove('parpadea', 'texto')
    alerta.classList.remove('text-3xl')
  }, 3000)
   
})
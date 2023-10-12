import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  db,
  getTareas,
  borrarTarea,
  tareaActualizada,
  borrarLista,
} from "./index.js";

/** Variables a utilizar que estan en todo el html de tarea.html */
let barraProgreso = document.getElementById("barraProgreso");
let ocultarFiltrado = document.querySelector(".ocultarFiltrado");
let ningunaTarea = document.getElementById("ningunaTarea");
let quitarBuscador = document.querySelector(".quitarBuscador");
let quitarBuscador2 = document.querySelector(".quitarBuscador2");
let quitarBuscador3 = document.querySelector(".quitarBuscador3");
let quitarBuscador4 = document.querySelector(".quitarBuscador4");
let quitarBuscador5 = document.querySelector(".quitarBuscador5");
let quitarBuscador7 = document.querySelector(".quitarBuscador7");
let cerrarSesion = document.getElementById("cerrarSesion");
let mostrarT = await getTareas();
let limite = 3;
let pagina = 1;
let anterior = document.getElementById("anterior");
let siguiente = document.getElementById("siguiente");
let n = 0;
let guardarTarea = document.getElementById("guardarTarea");
let sinCheckear = document.querySelector(".checkear");
let ocultarTarea = document.querySelector(".barraProgresos");
let editarTarea = document.querySelector(".checkear");
let borrarIndividual = document.querySelector(".checkear");
let borrarT = document.querySelector(".btnEliminar");
let borrarMarcados = document.querySelector(".btnEliminar");
let menuSalirUsuario = document.getElementById("dropdownDefaultButton");
let filtrado = document.getElementById("filtrado");
let ascendente = document.getElementById("ordenando");
let alerta = document.querySelector(".alerta");
let confirmarModal = document.querySelector(".confirmarModal");

/**Las funciones de quitarBuscador sirven para ocultar la busqueda de tareas por nombre */
quitarBuscador.addEventListener("click", () => {
  let buscandoTarea = document.getElementById("buscandoTarea");
  buscandoTarea.value = "";
  ocultarFiltrado.classList.add("hidden");
  observador();
  ningunaTarea.classList.add("hidden");
});

quitarBuscador2.addEventListener("click", () => {
  let buscandoTarea = document.getElementById("buscandoTarea");
  buscandoTarea.value = "";
  ocultarFiltrado.classList.add("hidden");
  observador();
  ningunaTarea.classList.add("hidden");
});

quitarBuscador3.addEventListener("click", () => {
  let buscandoTarea = document.getElementById("buscandoTarea");
  buscandoTarea.value = "";
  ocultarFiltrado.classList.add("hidden");
  observador();
  ningunaTarea.classList.add("hidden");
});

quitarBuscador4.addEventListener("click", () => {
  let buscandoTarea = document.getElementById("buscandoTarea");
  buscandoTarea.value = "";
  ocultarFiltrado.classList.add("hidden");
  observador();
  ningunaTarea.classList.add("hidden");
});

quitarBuscador5.addEventListener("click", () => {
  let buscandoTarea = document.getElementById("buscandoTarea");
  buscandoTarea.value = "";
  ocultarFiltrado.classList.add("hidden");
  observador();
  ningunaTarea.classList.add("hidden");
});

quitarBuscador7.addEventListener("click", () => {
  let buscandoTarea = document.getElementById("buscandoTarea");
  buscandoTarea.value = "";
  ocultarFiltrado.classList.add("hidden");
  observador();
  ningunaTarea.classList.add("hidden");
});

/** En este apartado estan todas la funciones a utilizarse */
cerrarSesion.addEventListener("click", logOut);
anterior.addEventListener("click", retroceder);
siguiente.addEventListener("click", avanzar);
guardarTarea.addEventListener("click", guardarNuevaTarea);
document.addEventListener("keyup", guardarNuevaTarea2);
sinCheckear.addEventListener("click", cambiarEstadoTarea);
editarTarea.addEventListener("click", actualizarTareas);
borrarIndividual.addEventListener("click", eliminarElementos);
borrarT.addEventListener("click", eliminarListaCompleta);
borrarMarcados.addEventListener("click", eliminarMarcados);
menuSalirUsuario.addEventListener("click", menuSalir);
filtrado.addEventListener("click", menuFiltradoTarea);
ascendente.addEventListener("click", ordenLista);

/** La funcion de mostrarTareasUsuarioActivo es la que se encarga de mostrar todas
 las tareas */
async function mostrarTareasUsuarioActivo(user) {
  let ascendente = document.getElementById("ordenando");
  let orden = ascendente.innerHTML;
  let uActivo = user.email;
  let tarea = "";
  let tareass = "";
  let idTarea = "";
  let statusTarea = "";
  let claseTarea = "";
  let cantidadTareas = [];
  let contador = 0;
  let contadorClase = 0;
  let idFirebase = "";

  if (orden == "Ascendente") {
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);
    let todas = [];
    let todos = [];
    let nuevoTodos = [];
    todas = querySnapshot.docs;

    todas.forEach((doc) => {
      nuevoTodos.push({
        id: doc.data().id,
        Usuario: doc.data().Usuario,
        Tarea: doc.data().Tarea,
        status: doc.data().status,
        clase: doc.data().clase,
        idFirebase: doc.id,
      });
      if (doc.data().clase === "marcar") {
        contadorClase++;
        cantidadTareas.push({ n: idTarea });
      }
    });

    todos = nuevoTodos;
    todos.sort((a, b) => {
      if (a.Tarea < b.Tarea) {
        return -1;
      } else if (a.Tarea > b.Tarea) {
        return 1;
      } else {
        return 0;
      }
    });

    const tareasTotales = todos.length;
    let cantidadPaginas = tareasTotales / limite;
    let x = Math.ceil(cantidadPaginas);
    document.getElementById("pagina").innerHTML =
      "Pagina: " + pagina + " / " + x;
    const tareasPorPaginas = (pagina - 1) * limite;
    let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);
    contador = todos.length;

    if (contador != 0) {
      document.getElementById("btnPagina").classList.remove("hidden");

      if (pagina == 2 && pagina != x) {
        document.getElementById("btnPagina").classList.remove("hidden");
        siguiente.classList.remove("hidden");
      }
    }
    if (x > 1) {
      document.getElementById("btnSiguiente").classList.remove("hidden");
    } else {
      document.getElementById("btnSiguiente").classList.add("hidden");
    }
    if (pagina > 1 && pagina == x) {
      document.getElementById("btnSiguiente").classList.remove("hidden");
      document.getElementById("btnAnterior").classList.remove("hidden");
      anterior.classList.remove("hidden");
      siguiente.classList.add("hidden");
    } else if (pagina > 1 && pagina < x) {
      document.getElementById("btnSiguiente").classList.remove("hidden");
      document.getElementById("btnAnterior").classList.remove("hidden");
      anterior.classList.remove("hidden");
      anterior.classList.remove("hidden");
    }
    if (pagina > x) {
      retroceder();
    }

    items.map((doc) => {
      tareass = doc.Tarea;
      idTarea = doc.id;
      claseTarea = doc.clase;
      statusTarea = doc.status;
      idFirebase = doc.idFirebase;
      tarea =
        tarea +
        `<li class="listare" id="${idFirebase}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareass}">
                          <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
                            <input id="${idFirebase}" type="checkbox"  clase="sin-checkear cambiar" value="${idFirebase}" ${
          statusTarea === "completed" ? "checked" : null
        }/>                       
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
    });
    document.getElementById("mostrarTareas").innerHTML = tarea;
    if (contador == 0) {
      document.getElementById("mostrarTareas").innerHTML = "";
      document.getElementById("btnSiguiente").classList.add("hidden");
    }
    if (cantidadTareas.length != 0) {
      document.querySelector(
        ".btnMarcar"
      ).innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
    } else {
      document.querySelector(".btnMarcar").innerHTML = "";
    }
    if (contador >= 1) {
      document.querySelector(
        ".btnEliminarTodo"
      ).innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
      document.querySelector(
        ".sinTareas"
      ).innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
    } else {
      document.querySelector(".sinTareas").innerHTML = "";
      document.querySelector(".btnEliminarTodo").innerHTML = "";
    }
  } else {
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);

    let todas = [];
    let todos = [];
    let nuevoTodos = [];
    todas = querySnapshot.docs;

    todas.forEach((doc) => {
      nuevoTodos.push({
        id: doc.data().id,
        Usuario: doc.data().Usuario,
        Tarea: doc.data().Tarea,
        status: doc.data().status,
        clase: doc.data().clase,
        idFirebase: doc.id,
      });
      if (doc.data().clase === "marcar") {
        contadorClase++;
        cantidadTareas.push({ n: idTarea });
      }
    });
    todos = nuevoTodos;
    todos.sort((a, b) => {
      if (a.Tarea > b.Tarea) {
        return -1;
      } else if (a.Tarea < b.Tarea) {
        return 1;
      } else {
        return 0;
      }
    });
    contador = todos.length;
    const tareasTotales = contador;
    let cantidadPaginas = tareasTotales / limite;
    let x = Math.ceil(cantidadPaginas);

    document.getElementById("pagina").innerHTML =
      "Pagina: " + pagina + " / " + x;
    const tareasPorPaginas = (pagina - 1) * limite;
    let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);

    if (contador != 0) {
      document.getElementById("btnPagina").classList.remove("hidden");

      if (pagina == 2 && pagina != x) {
        document.getElementById("btnPagina").classList.remove("hidden");
        siguiente.classList.remove("hidden");
      }
    }
    if (x > 1) {
      document.getElementById("btnSiguiente").classList.remove("hidden");
    } else {
      document.getElementById("btnSiguiente").classList.add("hidden");
    }
    if (pagina > 1 && pagina == x) {
      document.getElementById("btnSiguiente").classList.remove("hidden");
      document.getElementById("btnAnterior").classList.remove("hidden");
      anterior.classList.remove("hidden");
      siguiente.classList.add("hidden");
    } else if (pagina > 1 && pagina < x) {
      document.getElementById("btnSiguiente").classList.remove("hidden");
      document.getElementById("btnAnterior").classList.remove("hidden");
      anterior.classList.remove("hidden");
      anterior.classList.remove("hidden");
    }
    if (pagina > x) {
      retroceder();
    }
    items.forEach((doc) => {
      tareass = doc.Tarea;
      idTarea = idFirebase;
      claseTarea = doc.clase;
      statusTarea = doc.status;
      idFirebase = doc.idFirebase;
      tarea =
        tarea +
        `<li class="listare" id="${idFirebase}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareass}">
                          <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
                            <input id="${idFirebase}" type="checkbox"  clase="sin-checkear cambiar" value="${idFirebase}" ${
          statusTarea === "completed" ? "checked" : null
        }/>                       
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
    });
    document.getElementById("mostrarTareas").innerHTML = tarea;
    if (contador == 0) {
      document.getElementById("mostrarTareas").innerHTML = "";
      document.getElementById("btnSiguiente").classList.add("hidden");
    }
    if (cantidadTareas.length != 0) {
      document.querySelector(
        ".btnMarcar"
      ).innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
    } else {
      document.querySelector(".btnMarcar").innerHTML = "";
    }
    if (contador >= 1) {
      document.querySelector(
        ".btnEliminarTodo"
      ).innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
      document.querySelector(
        ".sinTareas"
      ).innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
    } else {
      document.querySelector(".sinTareas").innerHTML = "";
      document.querySelector(".btnEliminarTodo").innerHTML = "";
    }
  }
}

/** La funcion retroceder es para regresar a la pagina anterior de las tareas */
async function retroceder() {
  pagina = pagina - 1;
  const q = query(collection(db, "Tareas"), orderBy("Tarea", "desc"));
  const querySnapshot = await getDocs(q);
  let todos = [];
  todos = querySnapshot.docs;

  const tareasTotales = todos.length;
  let cantidadPaginas = tareasTotales / limite;
  let x = Math.ceil(cantidadPaginas);
  const tareasPorPaginas = (pagina - 1) * limite;
  let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);
  let userActivo = "";

  if (pagina <= 1) {
    document.getElementById("btnPagina").classList.add("hidden");
    pagina = 1;
    items.map((todo) => {
      observador(todo);
    });
  }

  if (pagina <= 1 && pagina <= x) {
    anterior.classList.add("hidden");
    siguiente.classList.remove("hidden");
    items.map((todo) => {
      observador(todo);
    });
  } else if (pagina > 1 && pagina < x) {
    anterior.classList.remove("hidden");
    siguiente.classList.remove("hidden");
    items.map((todo) => {
      observador(todo);
    });
  } else if (pagina > 1 && pagina <= x) {
    anterior.classList.remove("hidden");
    siguiente.classList.add("hidden");
    items.map((todo) => {
      observador(todo);
    });
  }
}

/** La funcion avanzar es para pasar a la pagina siguiente pagina de las tareas */
async function avanzar() {
  pagina = pagina + 1;
  let uActivo = document.getElementById("usuarioLogueado").value;
  const q = query(collection(db, "Tareas"), orderBy("Tarea", "desc"));
  const querySnapshot = await getDocs(q);

  let todos = [];
  todos = querySnapshot.docs;

  const tareasTotales = todos.length;
  let cantidadPaginas = tareasTotales / limite;
  let x = Math.ceil(cantidadPaginas);
  const tareasPorPaginas = (pagina - 1) * limite;
  let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);

  if (pagina >= x) {
    siguiente.classList.add("hidden");
    anterior.classList.remove("hidden");
    items.map((todo) => {
      observador(todo);
    });
  } else if (pagina < x) {
    siguiente.classList.remove("hidden");
    anterior.classList.remove("hidden");
    items.map((todo) => {
      observador(todo);
    });
  }
  if (pagina >= 2 && pagina < x) {
    document.getElementById("btnAnterior").classList.remove("hidden");
    document.getElementById("btnSiguiente").classList.remove("hidden");
    siguiente.classList.remove("hidden");
    anterior.classList.remove("hidden");
  }
}

/** La funcion observador se encarga de mantener un usuario activo y captar sino
 hay actividad se cierra la pagina */
function observador() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fecha();
      let nombre = user.email;
      let nombre2 = "";
      let nombreUsuarioActivo = "";
      document.getElementById("usuarioLogueado").value = user.email;

      mostrarT.forEach((doc) => {
        nombre2 = doc.data().Correo;
        if (nombre === nombre2) {
          nombreUsuarioActivo = doc.data().Usuario;
          document.getElementById("nombreUsua").innerHTML = nombreUsuarioActivo;
        }
      });
      document.addEventListener("keypress", contarCerrarSesion);
      document.addEventListener("click", contarCerrarSesion);
      document.addEventListener("mousemove", contarCerrarSesion);
      mostrarTareasUsuarioActivo(user);
      setTimeout(function () {
        logOut();
      }, 14400000);
    } else {
      location = "index.html";
    }
  });
}

/** La funcion guardarNuevaTarea como lo dice su nombre, guarda nuevas tareas al hacer
 click en el boton de guardar */
async function guardarNuevaTarea() {
  let agregarTarea = document.getElementById("agregarTarea").value;
  if (agregarTarea) {
    try {
      let usuarioLogueado = document.getElementById("usuarioLogueado").value;
      const docRef = await addDoc(collection(db, "Tareas"), {
        id: Date.now(),
        Usuario: usuarioLogueado,
        Tarea: agregarTarea,
        status: "pending",
        clase: "desmarcar",
      });
      document.getElementById("agregarTarea").value = "";
      barraDeProgreso();
      observador();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

/** La funcion guardarNuevaTarea2 como lo dice su nombre, guarda nuevas tareas al
 hacer enter en el teclado */
async function guardarNuevaTarea2(event) {
  let agregarTarea = document.getElementById("agregarTarea").value;
  if (event.key == "Enter") {
    if (agregarTarea) {
      try {
        let usuarioLogueado = document.getElementById("usuarioLogueado").value;
        const docRef = await addDoc(collection(db, "Tareas"), {
          id: Date.now(),
          Usuario: usuarioLogueado,
          Tarea: agregarTarea,
          status: "pending",
          clase: "desmarcar",
        });
        document.getElementById("agregarTarea").value = "";
        barraDeProgreso();
        observador();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
}

/** La funcion se encarga de cerrar la sesion al hacer click en el boton salir */
function logOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      location = "index.html";
    })
    .catch((error) => {});
}

observador();

/** La funcion cambiarEstadoTarea se encarga de marcar las tareas ya realizadas */
async function cambiarEstadoTarea(e) {
  let uActivo = document.getElementById("usuarioLogueado").value;
  const statuTarea = e.target.closest('input[type="checkbox"]');
  const claseTarea = e.target.closest('input[type="checkbox"]');
  if (!statuTarea) return;

  const status = statuTarea.checked ? "completed" : "pending";
  const clase = claseTarea.checked ? "marcar" : "desmarcar";
  let id = statuTarea.id;
  const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
  const querySnapshot = await getDocs(q);
  let todas = [];
  let todos = [];
  let nuevoTodos = [];
  todas = querySnapshot.docs;

  todas.forEach((doc) => {
    nuevoTodos.push({
      id: doc.data().id,
      Usuario: doc.data().Usuario,
      Tarea: doc.data().Tarea,
      status: doc.data().status,
      clase: doc.data().clase,
      idFirebase: doc.id,
    });
  });

  todos = nuevoTodos;
  todos.forEach((doc) => {
    if (doc.idFirebase == id) {
      barraDeProgreso();
      tareaActualizada(id, { status: status, clase: clase });
      observador();
    }
  });
}

/** La funcion actualizarTareas se encarga de que al editar la tarea se guarde con
 el nuevo nombre */
async function actualizarTareas(e) {
  let menufiltrado = document.getElementById("menufiltrado");
  let uActivo = document.getElementById("usuarioLogueado").value;
  let cambiarIconoActualizarTarea = e.target.closest(".cambiarIcono");
  let tarea = "";
  const botonEditarUnaTarea = e.target.closest(".js-edit");

  if (!botonEditarUnaTarea) return;
  const id = botonEditarUnaTarea.id;
  const input = botonEditarUnaTarea
    .closest("li")
    .querySelector('input[type="text"]');

  menufiltrado.classList.add("hidden");
  cambiarIconoActualizarTarea.classList.remove("ri-pencil-fill");
  botonEditarUnaTarea.classList.remove("circulos");
  cambiarIconoActualizarTarea.classList.add("ri-edit-box-fill");
  botonEditarUnaTarea.classList.add("circulosEditando");

  const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
  const querySnapshot = await getDocs(q);
  if (input.hasAttribute("readonly")) {
    input.removeAttribute("readonly");
    ocultarTarea.classList.remove("ocultarTarea");
    document.getElementById("estadoTarea").innerHTML = "Editando Tarea...";
  } else {
    document.getElementById("estadoTarea").innerHTML = "";
    input.setAttribute("readonly", "");
    tarea = input.value;
    document.getElementById("estadoTarea").innerHTML = "Tarea actualizada...";
    querySnapshot.forEach((doc) => {
      if (doc.id == id) {
        cambiarIconoActualizarTarea.classList.remove("ri-edit-box-fill");
        botonEditarUnaTarea.classList.remove("circulosEditando");
        cambiarIconoActualizarTarea.classList.add("ri-pencil-fill");
        botonEditarUnaTarea.classList.add("circulos");
        barraDeProgreso();
        tareaActualizada(id, { Tarea: tarea });
        observador();
      }
    });
  }
}

/** La funcion eliminarElementos se encarga de eliminar una sola tarea */
async function eliminarElementos(e) {
  let modalConfirmado = document.getElementById("modalConfirmar");
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let menufiltrado = document.getElementById("menufiltrado");
  let medio = document.getElementById("medio");
  let uActivo = document.getElementById("usuarioLogueado").value;
  const borrarUnaTarea = e.target.closest(".js-delete");

  if (!borrarUnaTarea) return;
  let id = borrarUnaTarea.id;
  menufiltrado.classList.add("hidden");
  medio.classList.remove("subModalConfirmar");
  modalConfirmar1.classList.add("w-[100%]");
  modalConfirmar2.classList.add("w-[100%]");
  modalConfirmar2.classList.add("right-0");
  body.classList.add("overflow-y-hidden");
  alerta.innerHTML = "Desea eliminar esta tarea?";

  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>
                              `;
  let aceptar = document.querySelector(".aceptar");
  aceptar.addEventListener("click", async () => {
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);
    let todas = [];
    let todos = [];
    let nuevoTodos = [];
    todas = querySnapshot.docs;
    todas.forEach((doc) => {
      nuevoTodos.push({
        id: doc.data().id,
        Usuario: doc.data().Usuario,
        Tarea: doc.data().Tarea,
        status: doc.data().status,
        clase: doc.data().clase,
        idFirebase: doc.id,
      });
    });
    todos = nuevoTodos;
    todos.forEach((doc) => {
      if (doc.idFirebase == id) {
        medio.classList.add("subModalConfirmar");
        modalConfirmar1.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("right-0");
        body.classList.remove("overflow-y-hidden");
        barraDeProgreso();
        borrarTarea(id);
        observador();
      }
    });
  });
  let cancelar = document.getElementById("cancelar");
  cancelar.addEventListener("click", () => {
    medio.classList.add("subModalConfirmar");
    modalConfirmar1.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("right-0");
    body.classList.remove("overflow-y-hidden");
    barraDeProgreso();
    observador();
    return;
  });
}

/** La funcion eliminarListaCompleta se encarga de eliminar todas las tareas */
async function eliminarListaCompleta(e) {
  let modalConfirmado = document.getElementById("modalConfirmar");
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let menufiltrado = document.getElementById("menufiltrado");
  let medio = document.getElementById("medio");
  let uActivo = document.getElementById("usuarioLogueado").value;
  let id = 0;
  const borrarTodasTarea = e.target.closest(".borrado");
  if (!borrarTodasTarea) return;

  menufiltrado.classList.add("hidden");
  medio.classList.remove("subModalConfirmar");
  modalConfirmar1.classList.add("w-[100%]");
  modalConfirmar2.classList.add("w-[100%]");
  modalConfirmar2.classList.add("right-0");
  body.classList.add("overflow-y-hidden");
  alerta.innerHTML = "Desea eliminar todas las tareas?";
  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>
                              `;
  let aceptar = document.querySelector(".aceptar");
  aceptar.addEventListener("click", async () => {
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id;
      if (id) {
        medio.classList.add("subModalConfirmar");
        modalConfirmar1.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("right-0");
        body.classList.remove("overflow-y-hidden");
        barraDeProgreso();
        borrarLista(id);
        observador();
      }
    });
  });

  let cancelar = document.getElementById("cancelar");
  cancelar.addEventListener("click", () => {
    medio.classList.add("subModalConfirmar");
    modalConfirmar1.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("right-0");
    body.classList.remove("overflow-y-hidden");
    barraDeProgreso();
    observador();
    return;
  });
}

/** La funcion eliminarMarcados se encarga de eliminar solo las tareas marcadas */
async function eliminarMarcados(e) {
  let modalConfirmado = document.getElementById("modalConfirmar");
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let menufiltrado = document.getElementById("menufiltrado");
  let medio = document.getElementById("medio");
  let uActivo = document.getElementById("usuarioLogueado").value;
  let id = 0;

  const borrarMarcado = e.target.closest(".marcado");
  if (!borrarMarcado) return;
  menufiltrado.classList.add("hidden");
  medio.classList.remove("subModalConfirmar");
  modalConfirmar1.classList.add("w-[100%]");
  modalConfirmar2.classList.add("w-[100%]");
  modalConfirmar2.classList.add("right-0");
  body.classList.add("overflow-y-hidden");
  alerta.innerHTML = "Desea eliminar las tareas marcadas?";
  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>
                              `;
  let aceptar = document.querySelector(".aceptar");
  aceptar.addEventListener("click", async () => {
    const q = query(
      collection(db, "Tareas"),
      where("Usuario", "==", uActivo),
      where("clase", "==", "marcar")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      medio.classList.add("subModalConfirmar");
      modalConfirmar1.classList.remove("w-[100%]");
      modalConfirmar2.classList.remove("w-[100%]");
      modalConfirmar2.classList.remove("right-0");
      body.classList.remove("overflow-y-hidden");
      barraDeProgreso();
      borrarLista(doc.id);
      observador();
    });
  });
  let cancelar = document.getElementById("cancelar");
  cancelar.addEventListener("click", () => {
    medio.classList.add("subModalConfirmar");
    modalConfirmar1.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("right-0");
    body.classList.remove("overflow-y-hidden");
    barraDeProgreso();
    observador();
    return;
  });
}

/** La funcion contarCerrarSesion se encarga de contar los segundos de inactividad
 y al llegar al tope se cierra la sesion automaticamente */
function contarCerrarSesion(e) {
  if (e.target) {
    n = 0;
    window.setInterval(function () {
      n++;
      if (n == 360000) {
        logOut();
      }
    }, 1000);
  }
}

/** La funcion barraDeProgreso se encarga de mostrar una barra miestras se procesan
 los datos */
function barraDeProgreso() {
  barraProgreso.classList.remove("ocultarTarea");
  setTimeout(() => {
    barraProgreso.classList.add("ocultarTarea");
    document.getElementById("estadoTarea").innerHTML = "";
  }, 1000);
}

/** La funcion fecha se encarga de mostrar la fecha actual */
function fecha() {
  let today = new Date();
  let nDia = { weekday: "long" };
  let dia = { day: "numeric" };
  let mes = { month: "long" };
  let year = { year: "numeric" };

  let nombreDia = today.toLocaleString("es-es", nDia);
  let diaActual = today.toLocaleString("es-es", dia);
  let mesActual = today.toLocaleString("es-es", mes);
  let yearActual = today.toLocaleString("es-es", year);

  document.getElementById("nombreDia").innerHTML = nombreDia;
  document.getElementById("dia").innerHTML = diaActual;
  document.getElementById("mes").innerHTML = mesActual;
  document.getElementById("year").innerHTML = yearActual;
}

/** La funcion menuSalir se encarga de mostrar el drop-dopx del menu salir, para
 cerrar la sesion */
function menuSalir() {
  let mostrarMenu = document.getElementById("dropdown");
  mostrarMenu.classList.toggle("hidden");
  setTimeout(() => {
    mostrarMenu.classList.add("hidden");
  }, 4000);
}

/** La funcion menuFiltradoTarea se encarga de mostrar o esconder el input de buscar
 tareas por nombre */
function menuFiltradoTarea() {
  let menufiltrado = document.getElementById("menufiltrado");
  menufiltrado.classList.toggle("hidden");
}

/** La funcion ordenLista se encarga de mostrar la lista ascendente o descendente */
function ordenLista() {
  if (ascendente.innerHTML == "Ascendente") {
    document.getElementById("ordenando").innerHTML = "Descendente";
    observador();
  } else {
    document.getElementById("ordenando").innerHTML = "Ascendente";
    observador();
  }
}

/** El siguiente evento se encarga de buscar las tareas en tiempo real, es decir,
 lo que recibe el input lo empieza a buscar */
document.addEventListener("keyup", (e) => {
  let buscador = document.getElementById("ningunaTarea");
  let verdaderos = 0;
  let falsos = 0;
  if (e.target.matches("#buscandoTarea")) {
    document.querySelectorAll(".listare").forEach((tareas) => {
      tareas.dataset.value.toLowerCase().includes(e.target.value)
        ? tareas.classList.remove("hidden")
        : tareas.classList.add("hidden");

      let a = tareas.dataset.value.toLowerCase().includes(e.target.value);
      verdaderos++;
      if (a == false) {
        falsos++;
      }
    });
    if (verdaderos - falsos == 0) {
      buscador.classList.remove("hidden");
      buscador.classList.add("flex");
      document.getElementById("ningunaTarea").innerHTML =
        "No hay coincidencias...";
    } else {
      document.getElementById("ningunaTarea").innerHTML = "";
      buscador.classList.remove("flex");
      buscador.classList.add("hidden");
    }
  }
});

/** El siguiente evento se encarga de mostrar un texto parpadeante si se hace un
 click fuera de la pantalla modal */
confirmarModal.addEventListener("click", () => {
  alerta.classList.add("text-3xl");
  alerta.classList.add("parpadea", "texto");
  setTimeout(() => {
    alerta.classList.remove("parpadea", "texto");
    alerta.classList.remove("text-3xl");
  }, 3000);
});

//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"

let a = document.querySelector('.a');

a.classList.remove('b')
let usuarioLogueado = document.getElementById('usuarioLogueado').value;
let cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', logOut);


function mostrar() {
  
  const dbRef = ref(getDatabase());
 console.log(dbRef);
  // get(child(dbRef, `users/${a}`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });
}

mostrar();


function observador() {
    const auth = getAuth();
    console.log(auth);
    onAuthStateChanged(auth, (user) => {
       
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;            
            const name = user.email;
            
            document.getElementById('usuarioLogueado').value = name;
            //usuarioLogueado.innerHTML = name;
           
            console.log('Usuario Activo');
           

            // ...
            } else {
            // User is signed out
            console.log('Ningun usuario activo');
            a.innerHTML = `<h1>Error 404 Not Found</h1>
                            <a class="c" href="index.html">Inicie Sesion</a>
            `;
           
           
            a.classList.add('b')

            // ...
        }
    });
}


let guardarTarea = document.getElementById('guardarTarea');
//let rTarea = document.getElementById('rTarea');
guardarTarea.addEventListener('click', async (e) => {
    let agregarTarea = document.getElementById('agregarTarea').value;
     const auth = getAuth();
     onAuthStateChanged(auth, (user) => {
        const nombres = user.email;
        document.getElementById('usuarioLogueado').value = nombres;
       
        });  

        try {
            let usuarioLogueado = document.getElementById('usuarioLogueado').value;
            const docRef = await addDoc(collection(db, "Usuarios"), {
              Usuario: usuarioLogueado,
              Tarea: agregarTarea
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }       

});



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
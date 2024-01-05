   const firebaseConfig = {
        apiKey: "AIzaSyAQ3ZAqJwDgDgeC7cqVZUix5DR3G3axaqg",
        authDomain: "datos-de-formulario-94090.firebaseapp.com",
        projectId: "datos-de-formulario-94090",
        storageBucket: "datos-de-formulario-94090.appspot.com",
        messagingSenderId: "147065632472",
        appId: "1:147065632472:web:3b40de91afbd59b3bfc9ad",
        measurementId: "G-VJ8BWXM2DJ"
      };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
    
    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduci tu nombre'
        errorNombre.classList.add('error-mesage')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-mesage')
    }


    //Validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduci un mail valido'
        emailError.classList.add('error-mesage')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-mesage')
    }


    //Validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayusculas y minuscular y caracteres especiales'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-mesage')
    }


    //Si todos los campos son validos enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        //BACKEND QUE RECIBE LA INFORMACION

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });
        
    }

})

//fin




    




   
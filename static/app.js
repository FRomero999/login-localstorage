console.log("Hola mundo!");

const registered_user = {
    correo : "francisco",
    password : "1234"
}

const boton_login = document.querySelector("button#login");
const boton_logout = document.querySelector("button#logout");
const nombre = document.querySelector("span#nombre");
var data = window.localStorage;

// Guarda el usuario actual
var user= null;

// Indica si el usuario esta logueado
var logged = false;

function checkLogged(){
    return ( JSON.parse(data.getItem("logged"))==true);
}

function setLogged(logged){
    data.setItem("logged",logged);
}

function getUser(){
    if(data.getItem("user")){
        user = JSON.parse(data.getItem("user"))
    }
}

function saveUser(){
    data.setItem("user", JSON.stringify(user));
}

function removeUser(){
    data.removeItem("user");
}

function login(ev){
    ev.preventDefault();

    let correo = document.querySelector("input#correo").value;
    let contraseña = document.querySelector("input#contraseña").value;

    console.log(correo);
    console.log(contraseña);

    if( (correo == registered_user.correo) && (contraseña == registered_user.password) ){
        user = {
            correo : correo,
            contraseña : contraseña
        }
        saveUser();
        console.log("Usuario guardado!");
        setLogged(true);

        window.location.reload();
    }

}

function logout(ev){
    ev.preventDefault();
    user=null;
    saveUser();
    console.log("Saliendo...");
    setLogged(false);
    setTimeout( ()=>window.location.reload() , 1000);
}



// Listeners
boton_login.addEventListener("click", login);
boton_logout.addEventListener("click", logout);

// Setup
logged = checkLogged();
console.log("Compruebo si estamos logueados: "+ logged);

// por defecto muestro el formulario sin loguear, solo si ya estoy logueado lo quito.
if(logged){
    getUser();
    console.log(user);
    nombre.textContent = user.correo;
    document.querySelectorAll(".logged").forEach( (el)=>{ el.classList.remove("hide")});
    document.querySelectorAll(".not_logged").forEach( (el)=>{ el.classList.add("hide")});
}


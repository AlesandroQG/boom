/*
Obtener los elementos del DOM x
Generador de número random entre 1 y 3 x

*/

const userInput = document.getElementById("userInput"),
      countdown = document.getElementById("countdown"),
      result = document.getElementById("result"),
      restart = document.getElementById("restart");

const randomNumber = () => Math.floor(Math.random() * 3 + 1);

window.onload = function() {
    let cuentaAtras;
    userInput.addEventListener("blur", () => {
        const valor = userInput.value;
        if (valor >= 1 && valor <= 3) {
            userInput.setAttribute("disabled", true);
            const promesa = new Promise((resolve) => {
                let segundos = 5;
                cuentaAtras = setInterval(() => {
                    countdown.textContent = `Cuenta atras: ${segundos} segundos`;
                    segundos--;
                    if (segundos < 0) {
                        clearInterval(cuentaAtras);
                        resolve(randomNumber());
                    }
                }, 1000);
            });
            promesa.then((response) => {
                console.log(response);
                if (valor == response) {
                    result.innerHTML = `<span class="green">¡Has salvado el mundo!</span><p>Tu número ${valor} es el mismo que el número ${response}</p>`;
                } else {
                    result.innerHTML = `<span class="red">La bomba ha explotado</span><p>Tu número ${valor} no es el mismo que el número ${response}</p>`;
                }
            });
        }
    });
    restart.addEventListener("click", () => {
        clearInterval(cuentaAtras);
        countdown.innerHTML = "";
        userInput.value = "";
        result.innerHTML = "";
        userInput.removeAttribute("disabled");
    });
}
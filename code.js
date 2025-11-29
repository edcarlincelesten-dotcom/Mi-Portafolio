let numeroSecreto = 0;
let intentos = 0;
const maxIntentos = 3;

const inputNumero = document.getElementById("numeroUsuario");
const mensajeFeedback = document.getElementById("mensaje");
const btnIntentar = document.getElementById("btnIntentar");
const btnNuevoJuego = document.getElementById("btnNuevoJuego");


function generarNumeroSecreto(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mostrarMensaje(texto, color) {
  mensajeFeedback.textContent = texto;
  mensajeFeedback.style.color = color;
}


function iniciarJuego() {
  
  numeroSecreto = generarNumeroSecreto(1, 10);
  intentos = 0;

  
  inputNumero.value = "";
  inputNumero.disabled = false;
  btnIntentar.disabled = false;
  btnNuevoJuego.disabled = true;

  mostrarMensaje("Indica un número del 1 al 10", "white");

  
  const interfaz = document.querySelector(".interfaz-juego");
  interfaz.classList.remove("juego-ganado", "juego-perdido");
}


function verificarIntento() {
  
  const numeroUsuario = parseInt(inputNumero.value);

  
  if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
    
    mostrarMensaje(
      "❌ Por favor, ingresa un número válido entre 1 y 10.",
      "yellow"
    );
    inputNumero.value = "";
    return;
  }

  intentos++;

  
  if (numeroUsuario === numeroSecreto) {
    
    mostrarMensaje(
      `🎉 ¡Felicidades! Adivinaste el número secreto (${numeroSecreto}) en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }.`,
      "red"
    );
    terminarJuego(true);
  } else {
    
    const pista =
      numeroUsuario > numeroSecreto
        ? "El número secreto es MENOR"
        : "El número secreto es MAYOR";

    if (intentos >= maxIntentos) {
    
      mostrarMensaje(
  `💔 Te quedaste sin intentos. El número secreto era ${numeroSecreto}.`,
  "red"
);
      terminarJuego(false);
    } else {
      
      const intentosRestantes = maxIntentos - intentos;
      mostrarMensaje(
        `Incorrecto. ${pista}. Te quedan ${intentosRestantes} ${
          intentosRestantes === 1 ? "intento" : "intentos"
        }.`,
        "white"
      );
      inputNumero.value = "";
    }
  }
}


function terminarJuego(esVictoria) {
  inputNumero.disabled = true;
  btnIntentar.disabled = true;
  btnNuevoJuego.disabled = false;

  const interfaz = document.querySelector(".interfaz-juego");
  if (esVictoria) {
    interfaz.classList.add("juego-ganado");
  } else {
    interfaz.classList.add("juego-perdido");
  }
}



btnIntentar.addEventListener("click", verificarIntento);
btnNuevoJuego.addEventListener("click", iniciarJuego);


inputNumero.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !btnIntentar.disabled) {
    event.preventDefault();
    verificarIntento();
  }
});


iniciarJuego();

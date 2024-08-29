document.addEventListener("DOMContentLoaded", function () {
  // Validación de formularios

  const nLugar = {
    lugar: "",
    url: "",
  };

  const inputPlace = document.querySelector("#place");
  const inputUrl = document.querySelector("#url");
  const formulario = document.querySelector("#add-form");

  inputPlace.addEventListener("blur", validar);
  inputUrl.addEventListener("blur", validar);

  function validar(evt) {
    if (evt.target.value.trim() === "") {
      mostrarAlerta("Por favor, rellena este campo.", evt.target.parentElement);
      return;
    }

    if (evt.target.id === "url" && !validarUrl(evt.target.value)) {
      mostrarAlerta(
        "Por favor, introduce una dirección web.",
        evt.target.parentElement
      );
      return;
    }

    limpiarAlerta(evt.target.parentElement);

    // Asignar los valores
    nLugar = [evt.target.id] = evt.target.value.trim();

    comprobarUrl();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Alerta en el HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600");

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprobar si ya exite una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) alerta.remove();
  }

  function validarUrl(url) {
    const regex =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    const resultado = regex.test(url);
    return resultado;
  }

  function comprobarUrl() {
    console.log(Object.values(url).includes(""));
  }
});

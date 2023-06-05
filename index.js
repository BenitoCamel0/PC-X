const navDesplegable = document.querySelector(".nav-desplegable")
const navMenu = document.querySelector(".nav-menu")

navDesplegable.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible")
})

// function mostrarXML() {
//   // Realizar una solicitud fetch al archivo XML
//   fetch('/Informacion_PC-X.xml')
//     .then(Response => Response.text())
//     .then(data => {
//       //Manipulación de los datos del XMl
//       var visualizador = document.getElementById("visualizador");
//       visualizador.innerText = data; // Asigna el contenido del XML al elemento HTML con el ID "visualizador"
//     })
//     .catch(console => console.log(error)); // Captura y muestra cualquier error en la consulta
// }

function leerXMLDesdeWeb() {
  // Carga el archivo XML utilizando XMLHttpRequest
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Cuando el archivo XML se ha cargado correctamente

      // Obtén el contenido del archivo XML
      var xmlString = this.responseText;

      // Parsea el contenido del XML
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlString, "text/xml");

      // Accede a los elementos del XML y muestra los datos en la página web
      var modulos = xmlDoc.getElementsByTagName("modulo");

      // Selecciona un elemento existente en tu HTML donde se mostrarán los datos
      var contenedor = document.getElementById("contenedor");

      // Crea elementos HTML para mostrar los datos del XML
      for (var i = 0; i < modulos.length; i++) {
        var modulo = modulos[i];

        // Crea un elemento <h2> para el nombre del módulo
        var moduloTitulo = document.createElement("h2");
        moduloTitulo.textContent = modulo.getAttribute("nombre");
        contenedor.appendChild(moduloTitulo);

        var temas = modulo.getElementsByTagName("tema");

        // Crea una lista desordenada <ul> para los temas
        var listaTemas = document.createElement("ul");

        // Recorre los temas y crea elementos <li> para cada uno
        for (var j = 0; j < temas.length; j++) {
          var tema = temas[j];

          // Crea un elemento <li> para el nombre del tema y la cantidad de ejercicios
          var temaItem = document.createElement("li");
          temaItem.textContent = tema.getAttribute("nombre") + " - Ejercicios: " + tema.getElementsByTagName("ejercicios")[0].textContent;
          listaTemas.appendChild(temaItem);
        }

        // Agrega la lista de temas al contenedor
        contenedor.appendChild(listaTemas);
      }
    }
  };
  xhttp.open("GET", "Informacion_PC-X.xml", true);
  xhttp.send();
}

function ocultarMostrarXML() {
  var output = document.getElementById("contenedor");
  output.style.display = output.style.display === "none" ? "block" : "none";
}

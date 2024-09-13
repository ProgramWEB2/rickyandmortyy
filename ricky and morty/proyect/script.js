const apiUrl = "https://rickandmortyapi.com/api/character";

// Función para obtener los personajes desde el API
function getFilesFromApi() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      cleanCharacterContainer(); // Limpia el contenedor de personajes
      createCharacterCards(data.results);
    })
    .catch(error => console.error("Hubo un problema con la operación fetch:", error));
}

// Función para eliminar los divs vacíos o innecesarios en el contenedor de personajes
function cleanCharacterContainer() {
  const charactersContainer = document.getElementById("charactersContainer");
  // Elimina todos los elementos que no sean las tarjetas de personajes generadas dinámicamente
  while (charactersContainer.firstChild) {
    charactersContainer.removeChild(charactersContainer.firstChild);
  }
}

// Función para crear las tarjetas de personajes
function createCharacterCards(characters) {
  const charactersContainer = document.getElementById("charactersContainer");
  characters.forEach(character => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    const nameElement = document.createElement("h2");
    nameElement.textContent = character.name;

    const genderElement = document.createElement("p");
    genderElement.textContent = `Género: ${character.gender === "Male" ? "Masculino" : "Femenino"}`;

    const speciesElement = document.createElement("p");
    speciesElement.textContent = `Especie: ${character.species === "Human" ? "Humano" : "Alienígena"}`;

    const imageElement = document.createElement("img");
    imageElement.src = character.image;

    // Crear botón para ver detalles del personaje
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Episodios";
    detailsButton.addEventListener("click", () => {
      window.location.href = `personaje-detalle.html?id=${character.id}`;
    });

       // Crear botón para volver al menú
   const backButton = document.createElement("button");
   backButton.textContent = "Volver al menú";
   backButton.classList.add("back-button");
   backButton.addEventListener("click", () => {
     window.location.href = "personaje-detalle.html"; // Asegúrate de que el nombre de archivo sea correcto
   });


    card.appendChild(imageElement);
    card.appendChild(nameElement);
    card.appendChild(genderElement);
    card.appendChild(speciesElement);
    card.appendChild(detailsButton);
    charactersContainer.appendChild(card);
  });
}
// Función para eliminar las tarjetas vacías
function removeEmptyCharacterCards() {
  const charactersContainer = document.getElementById("charactersContainer");
  const characterCards = charactersContainer.querySelectorAll('.character-card');

  characterCards.forEach(card => {
    if (!card.hasChildNodes() || card.textContent.trim() === '') {
      card.remove();
    }
  });
}


// Llama a la función para obtener los personajes cuando la página se carga
window.onload = getFilesFromApi;
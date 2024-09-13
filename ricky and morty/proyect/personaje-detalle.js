const apiUrl = "https://rickandmortyapi.com/api/character";

// Función para obtener los detalles del personaje
function getCharacterDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get('id');

  if (characterId) {
    fetch(`${apiUrl}/${characterId}`)
      .then(response => response.json())
      .then(data => {
        createCharacterDetailCard(data);
      })
      .catch(error => console.error("Error al obtener detalles del personaje:", error));
  }
}

// Función para crear la tarjeta de detalles del personaje
function createCharacterDetailCard(character) {
  const container = document.getElementById("characterDetailsContainer");

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

  const episodesElement = document.createElement("p");
  episodesElement.textContent = "Capítulos:";
  const episodesList = document.createElement("ul");

  character.episode.forEach(episodeUrl => {
    fetch(episodeUrl)
      .then(response => response.json())
      .then(episodeData => {
        const episodeItem = document.createElement("li");
        episodeItem.textContent = `S${episodeData.episode.split('E')[0].replace('S', '')}E${episodeData.episode.split('E')[1]} - ${episodeData.name}`;
        episodesList.appendChild(episodeItem);
      })
      .catch(error => console.error("Error al obtener episodio:", error));
  });

  card.appendChild(imageElement);
  card.appendChild(nameElement);
  card.appendChild(genderElement);
  card.appendChild(speciesElement);
  card.appendChild(episodesElement);
  card.appendChild(episodesList);
  container.appendChild(card);
}

window.onload = getCharacterDetails;
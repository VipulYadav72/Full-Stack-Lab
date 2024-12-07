const container = document.getElementById("recipes-container");
const searchBar = document.getElementById("search-bar");
async function fetchRecipes() {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    container.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
  }
}
function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h2>${recipe.name}</h2>
      <p>${recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
      <h3>Instructions:</h3>
      <p>${recipe.instructions}</p>
    `;
    container.appendChild(card);
  });
}

searchBar.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    const recipeName = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = recipeName.includes(searchQuery) ? "block" : "none";
  });
});

fetchRecipes();

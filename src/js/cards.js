

function createRecipeCard(recipe) {
  const recipeCard = document.createElement("figure");
  recipeCard.classList.add("card__image-container");

  const ingredientsList = recipe.ingredients
    .map((ingredient) => {
      let ingredientText = ingredient.ingredient;

      if (ingredient.quantity) {
        ingredientText += `: <span>${ingredient.quantity}`;

        if (ingredient.unit) {
          ingredientText += ` ${ingredient.unit}</span>`;
        } else {
          ingredientText += "</span>";
        }
      }

      return `<li>${ingredientText}</li>`;
    })
    .join("");

  recipeCard.innerHTML = `
      <figcaption class="card__image-caption">
        <img src="${recipe.image}" alt="${recipe.name}" class="card__image" />
      </figcaption>
      <article class="card__content">
        <h2 class="card__title">${recipe.name}</h2>
        <h3 class="card__title__h3">Recette</h3>
        <p class="card__description">${recipe.description}</p>
        <h3>Ingrédients</h3>
        <ul class="card__tags">
          ${ingredientsList}
          <li id="card-tag">${recipe.servings} personnes</li>
        </ul>
      </article>
  `;

  const descriptionParagraph = recipeCard.querySelector(".card__description");

  descriptionParagraph.addEventListener("click", () => {
    if (descriptionParagraph.style.height === "75px") {
      descriptionParagraph.style.height = "auto"; 
      descriptionParagraph.style.position = "absolute";
      descriptionParagraph.style.backgroundColor = "white";
    } else {
      descriptionParagraph.style.height = "75px"; // Rétablir la hauteur limitée
      descriptionParagraph.style.position = "relative";
    }
  });

  return recipeCard;
}

function renderRecipes(recipesList) {
  const container = document.querySelector(".cards__container");
  // Effacer le contenu existant dans le conteneur
  container.innerHTML = "";
  // Parcourir les recettes et générer le contenu HTML
  recipesList.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    // Ajoutez d'autres éléments HTML pour afficher les autres données de la recette, si nécessaire
    container.appendChild(recipeCard);
  });
}

export { renderRecipes, createRecipeCard };

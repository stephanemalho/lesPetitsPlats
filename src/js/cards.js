
// fucntion that creates the HTML content of a recipe card
function createRecipeCard(recipe) {
  const recipeCard = document.createElement("figure");
  recipeCard.classList.add("card__image-container");

  const ingredientsList = displayIngredientLists(recipe);

  recipeCard.innerHTML = `
      <figcaption class="card__image-caption">
        <span class="timer-info">${recipe.time} min</span>
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

  displayDescription(recipeCard);

  return recipeCard;
}

function displayIngredientLists(recipe) {
  return recipe.ingredients
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
}

function displayDescription(recipeCard) {
  const descriptionParagraph = recipeCard.querySelector(".card__description");

  descriptionParagraph.addEventListener("click", () => {
    if (descriptionParagraph.style.height === "75px") {
      descriptionParagraph.style.height = "375px";
      descriptionParagraph.style.width = "90%";
      descriptionParagraph.style.position = "absolute";
      descriptionParagraph.style.backgroundColor = "white";
    } else {
      descriptionParagraph.style.height = "75px"; // set the height to 75px
      descriptionParagraph.style.position = "relative";
    }
  });
}

// create a function that generates the HTML content of all the mapped recipe cards
function renderRecipes(recipesList) {
  const container = document.querySelector(".cards__container");
  // Empty the existing content in the container
  container.innerHTML = "";
  recipesList.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    container.appendChild(recipeCard);
  });
}

export { renderRecipes, createRecipeCard };
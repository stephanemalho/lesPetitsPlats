function createRecipeCard(recipe) {
  var recipeCard = document.createElement("figure");
  recipeCard.classList.add("card__image-container");

  var ingredientsList = document.createElement("ul"); // createElement moins lisible que innerHTML
  ingredientsList.classList.add("card__tags"); // ajoute d'une ligne par class

  for (var i = 0; i < recipe.ingredients.length; i++) { // boucle for moins lisible que forEach
    var ingredient = recipe.ingredients[i];

    var ingredientItem = document.createElement("li");

    var ingredientText = ingredient.ingredient;

    if (ingredient.quantity) {
      ingredientText += ": ";

      var quantitySpan = document.createElement("span");
      quantitySpan.textContent = ingredient.quantity;

      ingredientText += ingredient.unit ? ingredient.unit : "";
      ingredientText += "</span>";
      quantitySpan.innerHTML = ingredientText;

      ingredientItem.appendChild(quantitySpan);
    } else {
      ingredientItem.textContent = ingredientText;
    }

    ingredientsList.appendChild(ingredientItem);
  }

  var cardCaption = document.createElement("figcaption");
  cardCaption.classList.add("card__image-caption");

  var timerInfoSpan = document.createElement("span");
  timerInfoSpan.classList.add("timer-info");
  timerInfoSpan.textContent = recipe.time + " min";

  var image = document.createElement("img");
  image.src = recipe.image;
  image.alt = recipe.name;
  image.classList.add("card__image");

  cardCaption.appendChild(timerInfoSpan);
  cardCaption.appendChild(image);

  var cardContent = document.createElement("article");
  cardContent.classList.add("card__content");

  var cardTitle = document.createElement("h2");
  cardTitle.classList.add("card__title");
  cardTitle.textContent = recipe.name;

  var cardTitleH3 = document.createElement("h3");
  cardTitleH3.classList.add("card__title__h3");
  cardTitleH3.textContent = "Recette";

  var cardDescription = document.createElement("p");
  cardDescription.classList.add("card__description");
  cardDescription.textContent = recipe.description;

  var servingsItem = document.createElement("li");
  servingsItem.id = "card-tag";
  servingsItem.textContent = recipe.servings + " personnes";

  var ingredientsHeading = document.createElement("h3");
  ingredientsHeading.textContent = "Ingrédients";

  cardContent.appendChild(cardTitle); // appendchild moins lisible que template string
  cardContent.appendChild(cardTitleH3);
  cardContent.appendChild(cardDescription);
  cardContent.appendChild(ingredientsHeading);
  cardContent.appendChild(ingredientsList);
  cardContent.appendChild(servingsItem);

  recipeCard.appendChild(cardCaption);
  recipeCard.appendChild(cardContent);

  return recipeCard;
}

function renderRecipes(recipesList) {
  var container = document.getElementsByClassName("cards__container")[0]; // selection par class moins performant que par querySelector
  container.innerHTML = "";
  for (var i = 0; i < recipesList.length; i++) {
    // boucle for plus performante que forEach mais moins lisible
    var recipe = recipesList[i];
    var recipeCard = createRecipeCard(recipe);
    container.appendChild(recipeCard);
  }
}

export { renderRecipes, createRecipeCard };

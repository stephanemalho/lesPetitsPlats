function createRecipeCard(recipe) {
  var recipeCard = document.createElement("figure");
  recipeCard.className = "card__image-container";

  var ingredientsList = "";
  for (var i = 0; i < recipe.ingredients.length; i++) {
    var ingredient = recipe.ingredients[i];
    var ingredientText = ingredient.ingredient;

    if (ingredient.quantity) {
      ingredientText += ": <span>" + ingredient.quantity;

      if (ingredient.unit) {
        ingredientText += " " + ingredient.unit + "</span>";
      } else {
        ingredientText += "</span>";
      }
    }

    ingredientsList += "<li>" + ingredientText + "</li>";
  }

  recipeCard.innerHTML = "<figcaption class=\"card__image-caption\">" +
    "<span class=\"timer-info\">" + recipe.time + " min</span>" +
    "<img src=\"" + recipe.image + "\" alt=\"" + recipe.name + "\" class=\"card__image\" />" +
    "</figcaption>" +
    "<article class=\"card__content\">" +
    "<h2 class=\"card__title\">" + recipe.name + "</h2>" +
    "<h3 class=\"card__title__h3\">Recette</h3>" +
    "<p class=\"card__description\">" + recipe.description + "</p>" +
    "<h3>Ingrédients</h3>" +
    "<ul class=\"card__tags\">" +
    ingredientsList +
    "<li id=\"card-tag\">" + recipe.servings + " personnes</li>" +
    "</ul>" +
    "</article>";

  return recipeCard;
}

function renderRecipes(recipesList) {
  var container = document.querySelector(".cards__container");
  // Effacer le contenu existant dans le conteneur
  container.innerHTML = "";
  // Parcourir les recettes et générer le contenu HTML
  for (var i = 0; i < recipesList.length; i++) {
    var recipe = recipesList[i];
    var recipeCard = createRecipeCard(recipe);
    // Ajoutez d'autres éléments HTML pour afficher les autres données de la recette, si nécessaire
    container.appendChild(recipeCard);
  }
}

export { renderRecipes, createRecipeCard };

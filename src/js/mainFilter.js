import { recipes } from '../data/recipes.js';
import { renderRecipes } from './cards';
import { getTotalRecipes, noRecipe, stringIncludes } from './utils/utils';

const searchInput = document.getElementById('search');
// listen to the user input event in the input
searchInput.addEventListener('input', filterRecipes);

let selectedDescription = [];
let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliance = [];
export let inputValues = [];

export function filterRecipes() {
  const searchText = searchInput.value.toLowerCase();
  // check if the user has typed at least three letters
  if (searchText.length < 3) {
    // If less than three letters have been typed, do not apply the filtering
    applyGlobalFilters(recipes);
    return;
  }
  const filteredRecipes = recipes.filter((recipe) => {
    const propertiesToCheck = ["name", "appliance", "ustensils", "ingredients", "description"];

    return propertiesToCheck.some((property) => {
      const value = recipe[property];
      return stringIncludes(value, searchText);
    });
  });

  applyGlobalFilters(filteredRecipes);
}


function applyGlobalFilters(recipes) {
  const container = document.querySelector(".cards__container");
  const filteredRecipes = recipes.filter(function(recipe) {
    const ingredientsMatch = selectedIngredients.length === 0 ||
      selectedIngredients.some(function(selectedIngredient) {
        return recipe.ingredients.some(function(ingredient) {
          return stringIncludes(ingredient.ingredient, selectedIngredient); // check if the ingredient is included in the recipe
        });
      });
    const ustensilsMatch = selectedUstensils.length === 0 ||
      selectedUstensils.every(function(selectedUstensil) {
        return recipe.ustensils.includes(selectedUstensil);
      });

    const applianceMatch = selectedAppliance.length === 0 ||
      selectedAppliance.includes(recipe.appliance);

    const descriptionMatch = selectedDescription.length === 0 ||
      selectedDescription.includes(recipe.description);

    return ingredientsMatch && ustensilsMatch && applianceMatch && descriptionMatch;
  });

  inputValues = searchInput.value.split(','); // remove the , between the values

  renderRecipes(filteredRecipes);
  noRecipe(filteredRecipes, container, inputValues);
  getTotalRecipes(filteredRecipes);
}
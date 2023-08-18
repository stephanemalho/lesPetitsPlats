import recipes from "../../data/recipes";
import { createSelectedFilter, removeSelectedFilter } from "../selects";

export function hideSelectBox() {
  document.addEventListener('click', function (event) {
    const selectContainers = document.querySelectorAll('.select-container');
    const targetElement = event.target;

    for (const selectContainer of selectContainers) {
      if (!selectContainer.contains(targetElement)) {
        selectContainer.classList.remove('open');
      }
    }
  });
}

export function getIngredientsOptions() {
  const options = [];
  recipes.forEach(function (recipe) {
    recipe.ingredients.forEach(function (ingredient) {
      options.push(ingredient.ingredient);
    });
  });
  const setOptions = new Set(options);
  const arrayOptions = Array.from(setOptions);

  return arrayOptions;
}

export function getOptions(key) {
  const options = recipes.flatMap(recipe => recipe[key]);
  const uniqueOptions = [...new Set(options)];

  return uniqueOptions;
}

export function toggleOptions(button) {
  const chevronIcon = button.querySelector("i.fa-chevron-down");
  chevronIcon.classList.toggle("rotated");
  const selectContainer = button.parentNode;
  selectContainer.classList.toggle("open");
  const searchIcon = selectContainer.querySelector("i.fa-search");
  
  if (selectContainer.classList.contains("open")) {
    searchIcon.classList.remove("hidden"); // hidden the search icon when the select box is open
  } else {
    searchIcon.classList.add("hidden"); // show the search icon when the select box is closed
  }
}

export function toggleSelectedFilter(label, selectedArray) {
  const index = selectedArray.indexOf(label);
  if (index !== -1) {
    selectedArray.splice(index, 1);
    removeSelectedFilter(label);
  } else {
    createSelectedFilter(label);
  }
}

export function stringIncludes(value, searchText) {
  if (typeof value === "string" && typeof searchText === "string") {
    return  value.toLowerCase().includes(searchText.toLowerCase());
  }
  return false;
}

// show the total number of recipes with pliral or singular
export function getTotalRecipes(recipes) {
  const totalRecipes = document.querySelector(".total-recipes");
  totalRecipes.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ''}`;
}

export function noRecipe(array, container, inputValues) {
  if (array.length === 0) {
      const message = inputValues && inputValues.length > 0
          ? `Aucune recette ne correspond à ${inputValues}`
          : `Aucune recette ne correspond à vos filtres`;
      container.innerHTML = `
          <div class="no-recipe">
              <p>${message}</p>
          </div>
      `;
  }
}
import recipes from "../../data/recipes";
import { inputValues } from "../mainFilter";
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
    searchIcon.classList.remove("hidden"); // Cacher l'icône lorsque la select box est ouverte
  } else {
    searchIcon.classList.add("hidden"); // Afficher l'icône lorsque la select box est fermée
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

// afficher le total de recettes en grandant l'orthographe du mot recette
export function getTotalRecipes(recipes) {
  const totalRecipes = document.querySelector(".total-recipes");
  totalRecipes.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ''}`;
}

export function noRecipe(array, container) {
  if (array.length === 0) {
    container.innerHTML = `
    <div class="no-recipe">
      <p>Aucune recette ne correspond à ${inputValues}</p>
    </div>
  `;
  }
}
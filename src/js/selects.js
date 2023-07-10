import { recipes } from "../data/recipes.js";
import { renderRecipes } from "./cards.js";
import { getOptions, toggleOptions } from "./utils/utils.js";

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliance = [];
let selectedDescription = [];

const searchInput = document.getElementById('search');
// Écouter l'événement d'entrée utilisateur dans l'input
searchInput.addEventListener('input', filterRecipes);

function createSelectBox(title, options) {
  const selectContainer = document.createElement("div");
  selectContainer.classList.add("select-container");

  selectContainer.innerHTML = `
    <button>${title}<i class="fa fa-chevron-down"></i></button>
    <label>
      <input type="text" class="search-input" placeholder="Rechercher..." id="${title.toLowerCase().replace(" ", "-")}">
      <i class="fa fa-regular fa-magnifying-glass"></i>
    </label>
    <ul class="options-container">
      ${options.map(option => `<li class="option">${option}</li>`).join('')}
    </ul>
  `;

  const button = selectContainer.querySelector("button");
  button.addEventListener("click", function() {
    toggleOptions(this);
  });

  const input = selectContainer.querySelector(".search-input");
  input.addEventListener("input", function() {
    const updatedOptionElements = selectContainer.querySelectorAll(".option");
    filterOptions(this, updatedOptionElements);
  });

  const optionElements = selectContainer.querySelectorAll(".option");
  filterOptionName(optionElements);

  return selectContainer;
}

function filterOptions(input, optionElements) {
  const filterValue = input.value.toLowerCase();

  optionElements.forEach(optionElement => {
    const optionText = optionElement.textContent.toLowerCase();
    const optionMatches = optionText.includes(filterValue);

    optionElement.style.display = (filterValue === "" || optionMatches) ? "block" : "none"; // operateur ternaire
  });
}

//récupérer les options pour chaque select
function getIngredientsOptions() {
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

export function getTotalRecipes(recipes) {
  const totalRecipes = document.querySelector(".total-recipes");
  totalRecipes.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ''}`;
}

export function filterOptionName(elmList) {
  elmList.forEach(function (elm) {
    elm.addEventListener("click", function () {
      const filter = elm.textContent;
      const filterType = elm.parentNode.parentNode.firstChild.textContent;
      const selectedArray =
        filterType === "Ingrédients"
          ? selectedIngredients
          : filterType === "Appareils"
          ? selectedAppliance
          : filterType === "Ustensiles"
          ? selectedUstensils
          : [];

      if (selectedArray.includes(filter)) {
        selectedArray.splice(selectedArray.indexOf(filter), 1);
        removeSelectedFilter(filter);
      } else {
        selectedArray.push(filter);
        createSelectedFilter(filter);
      }

      applyFilters();
    });
  });
}

function applyFilters() {
  let filteredRecipes = recipes.filter(function (recipe) {
    let ingredientsMatch = selectedIngredients.length === 0 || recipe.ingredients.some(function (ingredient) {
      return selectedIngredients.includes(ingredient.ingredient);
    });
    let ustensilsMatch = selectedUstensils.length === 0 || selectedUstensils.every(function (selectedUstensil) {
      return recipe.ustensils.includes(selectedUstensil);
    });
    let applianceMatch = selectedAppliance.length === 0 || selectedAppliance.includes(recipe.appliance);

    return ingredientsMatch && ustensilsMatch && applianceMatch;
  });

  renderRecipes(filteredRecipes);
  getTotalRecipes(filteredRecipes);
}

export function afficherSelectBox() {
  const container = document.querySelector(".filter__container");
  const selectTitles = ["Ingrédients", "Appareils", "Ustensiles"];

  selectTitles.forEach(function (title, index) {
    let options;

    if (index === 0) {
      options = getIngredientsOptions();
    } else if (index === 1) {
      options = getOptions('appliance');
    } else {
      options = getOptions('ustensils');
    }

    const selectContainer = createSelectBox(title, options);
    container.appendChild(selectContainer);
  });
  applyFilters();
}

export function createSelectedFilter(label) {
  const filterSelectedBox = document.querySelector(".filter-selected_box");

  const selectedFilter = document.createElement("div");
  selectedFilter.classList.add("selected-filter");

  selectedFilter.innerHTML = `
    <label>${label}</label>
    <button class="remove-button"><i class="fas fa-times"></i></button>
  `;

  const removeButton = selectedFilter.querySelector(".remove-button");
  removeButton.addEventListener("click", () => {
    selectedFilter.remove();
    removeSelectedFilter(label);
  });

  filterSelectedBox.appendChild(selectedFilter);
}

function removeSelectedFilter(label) {
  const selectedFilter = document.querySelectorAll(".selected-filter");
  selectedFilter.forEach(function (filter) {
    if (filter.textContent === label) {
      filter.remove();
    }
  });

  // Mettre à jour les tableaux de filtres
  selectedIngredients = selectedIngredients.filter((ingredient) => ingredient !== label);
  selectedUstensils = selectedUstensils.filter((ustensil) => ustensil !== label);
  selectedAppliance = selectedAppliance.filter((appliance) => appliance !== label);

  applyFilters(); // Appliquer les filtres
}

function filterRecipes() {
  const searchText = searchInput.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const propertiesToCheck = ["name", "appliance", "ustensils", "ingredients", "description"];

    return propertiesToCheck.some((property) => {
      const value = recipe[property];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchText);
      } else if (Array.isArray(value)) {
        return value.some((item) =>
          typeof item === "string" && item.toLowerCase().includes(searchText)
        );
      }
      return false;
    });
  });

  applyGlobalFilters(filteredRecipes);
}

function applyGlobalFilters(recipes) {
  const filteredRecipes = recipes.filter(function(recipe) {
    const ingredientsMatch = selectedIngredients.length === 0 ||
      selectedIngredients.some(function(selectedIngredient) {
        return recipe.ingredients.some(function(ingredient) {
          return ingredient.ingredient.toLowerCase().includes(selectedIngredient);
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

  renderRecipes(filteredRecipes);
  getTotalRecipes(filteredRecipes);
}

import { recipes } from "../data/recipes.js";
import { renderRecipes } from "./cards.js";
import { getIngredientsOptions, getOptions, getTotalRecipes, toggleOptions, toggleSelectedFilter } from "./utils/utils.js";

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliance = [];

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
    filterSelectOptions(this, updatedOptionElements);
  });

  const optionElements = selectContainer.querySelectorAll(".option");
  filterLabelOption(optionElements);

  return selectContainer;
}

// filter les options dans la select box
function filterSelectOptions(input, optionElements) {
  const filterValue = input.value.toLowerCase();

  optionElements.forEach(optionElement => {
    const optionText = optionElement.textContent.toLowerCase();
    const optionMatches = optionText.includes(filterValue);

    optionElement.style.display = (filterValue === "" || optionMatches) ? "block" : "none"; // operateur ternaire
  });
}

// function filterLabelOption(elmList) {
//   elmList.forEach(function (elm) {
//     elm.addEventListener("click", function () {
//       const label = this.closest(".select-container").querySelector("button").textContent;
//       const filterValue = this.textContent;
//       if (label === "Ingrédients") {
//         selectedIngredients.push(filterValue);
//       } else if (label === "Appareils") {
//         selectedAppliance.push(filterValue);
//       } else {
//         selectedUstensils.push(filterValue);
//       }
//       createSelectedFilter(filterValue);
//       applyFilters();
//     });
//   });
// }

function filterLabelOption(elmList) {
  elmList.forEach(function (elm) {
    elm.addEventListener("click", function () {
      const label = this.closest(".select-container").querySelector("button").textContent;
      const filterValue = this.textContent;

      if (label === "Ingrédients") {
        toggleSelectedFilter(filterValue, selectedIngredients);
        selectedIngredients.push(filterValue);
      } else if (label === "Appareils") {
        toggleSelectedFilter(filterValue, selectedAppliance);
        selectedAppliance.push(filterValue);
      } else {
        toggleSelectedFilter(filterValue, selectedUstensils);
        selectedUstensils.push(filterValue);
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
}

export function createSelectedFilter(label) {
  const filterSelectedBox = document.querySelector(".filter-selected_box");

  const selectedFilter = document.createElement("div");
  selectedFilter.classList.add("selected-filter");
  selectedFilter.classList.add("selected"); // Ajout de la classe "selected"

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

export function removeSelectedFilter(label) {
  const selectedFilter = document.querySelectorAll(".selected-filter");
  selectedFilter.forEach(function (filter) {
    if (filter.textContent === label) {
      filter.classList.remove("selected"); // Suppression de la classe "selected"
      filter.remove();
    }
  });

  // Mettre à jour les tableaux de filtres
  selectedIngredients = selectedIngredients.filter((ingredient) => ingredient !== label);
  selectedUstensils = selectedUstensils.filter((ustensil) => ustensil !== label);
  selectedAppliance = selectedAppliance.filter((appliance) => appliance !== label);

  applyFilters(); // Appliquer les filtres
}
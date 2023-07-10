import { recipes } from "../data/recipes.js";
import { renderRecipes } from "./cards.js";

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliance = [];
let selectedDescription = [];

const searchInput = document.getElementById('search');
// Écouter l'événement d'entrée utilisateur dans l'input
searchInput.addEventListener('input', filterRecipes);

// créer les select box
function createSelectBox(title, options) {
  var selectContainer = document.createElement("div");
  selectContainer.classList.add("select-container");
  var button = document.createElement("button");
  button.textContent = title;
  button.addEventListener("click", function () {
    toggleOptions(this);
  });
  var label = document.createElement("label");
  var input = document.createElement("input");
  input.classList.add("search-input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Rechercher...");
  input.id = title.toLowerCase().replace(" ", "-");
  label.appendChild(input);
  label.id = input.id;

  var optionsContainer = document.createElement("ul");
  optionsContainer.classList.add("options-container");

  options.forEach(function (option) {
    var optionElement = document.createElement("li");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionsContainer.appendChild(optionElement);
  });

  const optionElements = optionsContainer.querySelectorAll(".option");
  filterOptionName(optionElements);
  console.log(optionElements);

  input.addEventListener("input", function () {
    const updatedOptionElements = optionsContainer.querySelectorAll(".option");
    filterOptions(this, updatedOptionElements);
  });

  selectContainer.appendChild(button);
  selectContainer.appendChild(label);
  selectContainer.appendChild(input);
  selectContainer.appendChild(optionsContainer);

  return selectContainer;
}

function filterOptions(input, optionElements) {
  const filterValue = input.value.toLowerCase();

  for (let i = 0; i < optionElements.length; i++) {
    var optionElement = optionElements[i];
    var optionText = optionElement.textContent.toLowerCase();
    var optionMatches = optionText.includes(filterValue);

    if (filterValue === "" || optionMatches) {
      optionElement.style.display = "block";
    } else {
      optionElement.style.display = "none";
    }
  }
}

// récupérer les options pour chaque select
function getIngredientsOptions() {
  var options = [];

  recipes.forEach(function (recipe) {
    recipe.ingredients.forEach(function (ingredient) {
      options.push(ingredient.ingredient.toLowerCase());
    });
  });

  var uniqueOptions = [];
  options.forEach(function (option) {
    if (!uniqueOptions.includes(option)) {
      uniqueOptions.push(option);
    }
  });

  return uniqueOptions;
}

function getApplianceOptions() {
  var options = [];

  for (var i = 0; i < recipes.length; i++) {
    var recipe = recipes[i];
    options.push(recipe.appliance);
  }

  var uniqueOptions = [];
  for (var j = 0; j < options.length; j++) {
    var option = options[j];
    if (!uniqueOptions.includes(option)) {
      uniqueOptions.push(option);
    }
  }

  return uniqueOptions;
}

function getUstensilsOptions() {
  var options = [];

  for (var i = 0; i < recipes.length; i++) {
    var recipe = recipes[i];
    var ustensils = recipe.ustensils;

    for (var j = 0; j < ustensils.length; j++) {
      var ustensil = ustensils[j];
      options.push(ustensil);
    }
  }

  var uniqueOptions = [];
  for (var k = 0; k < options.length; k++) {
    var option = options[k];
    if (!uniqueOptions.includes(option)) {
      uniqueOptions.push(option);
    }
  }

  return uniqueOptions;
}

export function getTotalRecipes(recipes) {
  const totalRecipes = document.querySelector(".total-recipes");
  totalRecipes.textContent = `${recipes.length}`;
  if (recipes.length > 1) {
    totalRecipes.textContent += " recettes";
  } else {
    totalRecipes.textContent += " recette";
  }
}

export function filterOptionName(elmList) {
  elmList.forEach(function (elm) {
    elm.addEventListener("click", function () {
      const filter = elm.textContent;
      const filterType = elm.parentNode.parentNode.firstChild.textContent;

      switch (filterType) {
        case "Ingrédients":
          console.log("FILTER TYPE " + filterType);
          if (selectedIngredients.includes(filter)) {
            selectedIngredients = selectedIngredients.filter(
              (ingredient) => ingredient !== filter
            );
            removeSelectedFilter(filter);
          } else {
            selectedIngredients.push(filter);
            createSelectedFilter(filter);
          }
          break;
        case "Appareils":
          console.log("FILTER TYPE " + filterType);
          if (selectedAppliance.includes(filter)) {
            selectedAppliance = selectedAppliance.filter(
              (appliance) => appliance !== filter
            );
            removeSelectedFilter(filter);
          } else {
            selectedAppliance.push(filter);
            createSelectedFilter(filter);
          }
          break;
        case "Ustensiles":
          console.log("FILTER TYPE " + filterType);
          if (selectedUstensils.includes(filter)) {
            selectedUstensils = selectedUstensils.filter(
              (ustensil) => ustensil !== filter
            );
            removeSelectedFilter(filter);
          } else {
            selectedUstensils.push(filter);
            createSelectedFilter(filter);
          }
          break;
        default:
          console.log("error");
      }

      applyFilters();
    });
  });
}

function applyFilters() {
  let filteredRecipes = recipes.filter(function (recipe) {
    // Vérifier si la recette correspond aux filtres d'ingrédients, d'ustensiles et d'appareil sélectionnés
    let ingredientsMatch = true;
    let ustensilsMatch = true;
    let applianceMatch = true;

    if (selectedIngredients.length > 0) {
      ingredientsMatch = selectedIngredients.some(function (
        selectedIngredient
      ) {
        return recipe.ingredients.some(function (ingredient) {
          return ingredient.ingredient.includes(selectedIngredient);
        });
      });
    }

    if (selectedUstensils.length > 0) {
      ustensilsMatch = selectedUstensils.every(function (selectedUstensil) {
        return recipe.ustensils.includes(selectedUstensil);
      });
    }

    if (selectedAppliance.length > 0) {
      applianceMatch = selectedAppliance.includes(recipe.appliance);
    }

    return ingredientsMatch && ustensilsMatch && applianceMatch;
  });

  renderRecipes(filteredRecipes);
  getTotalRecipes(filteredRecipes);
}

export function afficherSelectBox() {
  var container = document.querySelector(".filter__container");
  var selectTitles = ["Ingrédients", "Appareils", "Ustensiles"];

  selectTitles.forEach(function (title, index) {
    var options;

    if (index === 0) {
      options = getIngredientsOptions();
    } else if (index === 1) {
      options = getApplianceOptions();
    } else {
      options = getUstensilsOptions();
    }

    var selectContainer = createSelectBox(title, options);
    container.appendChild(selectContainer);
  });
  applyFilters();
}

function toggleOptions(button) {
  var selectContainer = button.parentNode;
  selectContainer.classList.toggle("open");
}

export function createSelectedFilter(label) {
  const filterSelectedBox = document.querySelector(".filter-selected_box");

  const selectedFilter = document.createElement("div");
  selectedFilter.classList.add("selected-filter");

  const filterLabel = document.createElement("label");
  filterLabel.textContent = label;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  
  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fas", "fa-times");  
  removeButton.appendChild(removeIcon);

  // Ajoute un gestionnaire d'événements au bouton de suppression
  removeButton.addEventListener("click", () => {
    selectedFilter.remove();
    removeSelectedFilter(label);
  });

  selectedFilter.appendChild(filterLabel);
  selectedFilter.appendChild(removeButton);
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

  const filteredRecipes = recipes.filter(function(recipe) {
    const propertiesToCheck = [
      "name",       // Nom de la recette
      "appliance",  // Appareil de la recette
      "ustensils",  // Ustensiles de la recette
      "ingredients" // Ingrédients de la recette
    ];

    for (var i = 0; i < propertiesToCheck.length; i++) {
      var property = propertiesToCheck[i];
      var value = recipe[property];

      if (typeof value === "string") {
        if (value.toLowerCase().includes(searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        for (var j = 0; j < value.length; j++) {
          var item = value[j];
          if (typeof item === "string" && item.toLowerCase().includes(searchText)) {
            return true;
          }
        }
      }
    }

    return false;
  });

  applyGlobalFilters(filteredRecipes);
}

function applyGlobalFilters(recipes) {
  let filteredRecipes = recipes.filter(function (recipe) {
    // Vérifier si la recette correspond aux filtres d'ingrédients, d'ustensiles et d'appareil sélectionnés
    let ingredientsMatch = true;
    let ustensilsMatch = true;
    let applianceMatch = true;
    let descriptionMatch = true;

    if (selectedIngredients.length > 0) {
      ingredientsMatch = selectedIngredients.some(function (selectedIngredient) {
        return recipe.ingredients.some(function (ingredient) {
          return ingredient.ingredient.toLowerCase().includes(selectedIngredient);
        });
      });
    }

    if (selectedUstensils.length > 0) {
      ustensilsMatch = selectedUstensils.every(function (selectedUstensil) {
        return recipe.ustensils.includes(selectedUstensil);
      });
    }

    if (selectedAppliance.length > 0) {
      applianceMatch = selectedAppliance.includes(recipe.appliance);
    }

    if (selectedDescription.length > 0) {
      descriptionMatch = selectedDescription.includes(recipe.description);
    }

    return ingredientsMatch && ustensilsMatch && applianceMatch && descriptionMatch;
  });

  renderRecipes(filteredRecipes);
  getTotalRecipes(filteredRecipes);
}

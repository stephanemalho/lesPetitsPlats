import { recipes } from "../data/recipes.js";
import { renderRecipes } from "./cards.js";

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliance = [];
let selectedDescription = [];

const searchInput = document.getElementById('search');
// listen for input event on searchInput
searchInput.addEventListener('input', filterRecipes);

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

export function getIngredientsOptions() {
  const options = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      options.push(ingredient);
    }
  }

  const setOptions = new Set(options);
  const arrayOptions = Array.from(setOptions);

  return arrayOptions;
}

// show the list of appliances
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
  // show the list of ustensils
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
// show the total number of recipes
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
    // check if recipe matches all filters
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

  // add event listener to remove button
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

  // update selected filters
  selectedIngredients = selectedIngredients.filter((ingredient) => ingredient !== label);
  selectedUstensils = selectedUstensils.filter((ustensil) => ustensil !== label);
  selectedAppliance = selectedAppliance.filter((appliance) => appliance !== label);

  applyFilters(); // apply filters
}

function filterRecipes() { 
  const searchText = searchInput.value.toLowerCase();

    // check if search text is less than 3 characters
    if (searchText.length < 3) {
      applyGlobalFilters(recipes);
      return;
    }
  const filteredRecipes = [];
  for (var i = 0; i < recipes.length; i++) { // for less readable than forEach
    var recipe = recipes[i];
    var propertiesToCheck = [
      "name",       // name of the recipe
      "appliance",  // Appliance of the recipe
      "ustensils",  // Ustensils of the recipe
      "ingredients", // Ingredients of the recipe
      "description" // Description of the recipe
    ];

    var isMatch = false;
    for (var j = 0; j < propertiesToCheck.length; j++) {
      var property = propertiesToCheck[j];
      var value = recipe[property];

      if (typeof value === "string" && value.toLowerCase().indexOf(searchText) !== -1) { // indexOf less readable than includes
        isMatch = true;
        break;
      } else if (Array.isArray(value)) {
        for (var k = 0; k < value.length; k++) {
          var item = value[k];
          if (typeof item === "string" && item.toLowerCase().indexOf(searchText) !== -1) {
            isMatch = true;
            break;
          }
        }
        if (isMatch) {
          break;
        }
      }
    }

    if (isMatch) {
      filteredRecipes.push(recipe);
    }
  }

  applyGlobalFilters(filteredRecipes);
}

function applyGlobalFilters(recipes) {
  const filteredRecipes = [];
  
  for (var i = 0; i < recipes.length; i++) { 
    var recipe = recipes[i];
    
    var ingredientsMatch = true;
    if (selectedIngredients.length > 0) {
      var isIngredientMatch = false;
      for (var j = 0; j < selectedIngredients.length; j++) {
        var selectedIngredient = selectedIngredients[j];
        for (var k = 0; k < recipe.ingredients.length; k++) {
          var ingredient = recipe.ingredients[k].ingredient;
          if (stringIncludes(ingredient, selectedIngredient)) {
            isIngredientMatch = true;
            break;
          }
        }
        if (isIngredientMatch) {
          break;
        }
      }
      ingredientsMatch = isIngredientMatch;
    }

    var ustensilsMatch = true;
    if (selectedUstensils.length > 0) {
      var isUstensilMatch = true;
      for (var j = 0; j < selectedUstensils.length; j++) {
        var selectedUstensil = selectedUstensils[j];
        var isUstensilIncluded = false;
        for (var k = 0; k < recipe.ustensils.length; k++) {
          var ustensil = recipe.ustensils[k];
          if (ustensil === selectedUstensil) {
            isUstensilIncluded = true;
            break;
          }
        }
        if (!isUstensilIncluded) {
          isUstensilMatch = false;
          break;
        }
      }
      ustensilsMatch = isUstensilMatch;
    }

    var applianceMatch = true;
    if (selectedAppliance.length > 0) {
      var isApplianceMatch = false;
      for (var j = 0; j < selectedAppliance.length; j++) {
        if (recipe.appliance === selectedAppliance[j]) {
          isApplianceMatch = true;
          break;
        }
      }
      applianceMatch = isApplianceMatch;
    }

    var descriptionMatch = true;
    if (selectedDescription.length > 0) {
      var isDescriptionMatch = false;
      for (var j = 0; j < selectedDescription.length; j++) {
        if (recipe.description === selectedDescription[j]) {
          isDescriptionMatch = true;
          break;
        }
      }
      descriptionMatch = isDescriptionMatch;
    }

    if (ingredientsMatch && ustensilsMatch && applianceMatch && descriptionMatch) {
      filteredRecipes.push(recipe);
    }
  }

  renderRecipes(filteredRecipes);
  getTotalRecipes(filteredRecipes);
}
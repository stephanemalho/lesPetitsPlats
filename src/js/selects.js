import { recipes } from '../data/recipes.js';
import { renderRecipes } from './cards.js';

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliance = [];


// créer les select box
function createSelectBox(title, options) {
  var selectContainer = document.createElement('div');
  selectContainer.classList.add('select-container');

  var button = document.createElement('button');
  button.textContent = title;
  button.addEventListener('click', function() {
    toggleOptions(this);
  });

  var label = document.createElement('label');
  
  var input = document.createElement('input');
  input.classList.add('search-input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Rechercher...');
  input.id = title.toLowerCase().replace(' ', '-');
  label.appendChild(input);
  label.id = input.id ;

  var optionsContainer = document.createElement('ul');
  optionsContainer.classList.add('options-container');

  options.forEach(function(option) {
    var optionElement = document.createElement('li');
    optionElement.classList.add('option');
    optionElement.textContent = option;
    optionsContainer.appendChild(optionElement);
  });

  const elmList = optionsContainer.querySelectorAll('.option');
  filterOptionName(elmList);

  selectContainer.appendChild(button);
  selectContainer.appendChild(label);
  selectContainer.appendChild(input);
  selectContainer.appendChild(optionsContainer);

  return selectContainer;
}

// récupérer les options pour chaque select
function getIngredientsOptions() {
  var options = [];

  recipes.forEach(function(recipe) {
    recipe.ingredients.forEach(function(ingredient) {
      options.push(ingredient.ingredient); // Conversion en minuscules
    });
  });
  const setOptions = new Set(options);
  const arrayOptions = Array.from(setOptions);

  return arrayOptions;
}

function getApplianceOptions() {
  var options = [];

  recipes.forEach(function(recipe) {
    options.push(recipe.appliance);
  });
  console.log(options);
  const setOptions = new Set(options)
  console.log(setOptions);

  const arrayOptions = Array.from(setOptions);
  console.log(arrayOptions);
  return arrayOptions;
}

function getUstensilsOptions() {
  var options = [];

  recipes.forEach(function(recipe) {
    recipe.ustensils.forEach(function(ustensil) {
      options.push(ustensil);
    });
  });
  const setOptions = new Set(options)
  const arrayOptions = Array.from(setOptions);
  return arrayOptions;
}

export function getTotalRecipes(recipes) {
  const totalRecipes = document.querySelector('.total-recipes');
  totalRecipes.textContent = `${recipes.length}`;
  if (recipes.length > 1) {
    totalRecipes.textContent += ' recettes';
  } else {
    totalRecipes.textContent += ' recette';
  }
}

export function filterOptionName(elmList) {
  elmList.forEach(function (elm) {
    elm.addEventListener('click', function () {
      const filter = elm.textContent;
      const filterType = elm.parentNode.parentNode.firstChild.textContent;
      
      switch (filterType) {
        case 'Ingrédients':
          console.log("FILTER TYPE "+filterType);
          if (selectedIngredients.includes(filter)) {
            selectedIngredients = selectedIngredients.filter(ingredient => ingredient !== filter);
            removeSelectedFilter(filter);
          } else {
            selectedIngredients.push(filter);
            createSelectedFilter(filter);
          }
          break;
        case 'Appareils':
          console.log("FILTER TYPE "+filterType);
          if (selectedAppliance.includes(filter)) {
            selectedAppliance = selectedAppliance.filter(appliance => appliance !== filter);
            removeSelectedFilter(filter);
          } else {
            selectedAppliance.push(filter);
            createSelectedFilter(filter);
          }
          break;
        case 'Ustensiles':
          console.log("FILTER TYPE "+filterType);
          if (selectedUstensils.includes(filter)) {
            selectedUstensils = selectedUstensils.filter(ustensil => ustensil !== filter);
            removeSelectedFilter(filter);
          } else {
            selectedUstensils.push(filter);
            createSelectedFilter(filter);    
          }
          break;
        default:
          console.log('error');
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
      ingredientsMatch = selectedIngredients.some(function (selectedIngredient) {
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
    
    if (selectedAppliance !== "") {
      applianceMatch = recipe.appliance.includes(selectedAppliance);
    }
    return ingredientsMatch && ustensilsMatch && applianceMatch;
  });
  renderRecipes(filteredRecipes);
  getTotalRecipes(filteredRecipes);
}

export function afficherSelectBox() {
  var container = document.querySelector('.filter__container');
  var selectTitles = ['Ingrédients', 'Appareils', 'Ustensiles'];

  selectTitles.forEach(function(title, index) {
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
  selectContainer.classList.toggle('open');
}

export function createSelectedFilter(label) {
  const filterSelectedBox = document.querySelector('.filter-selected_box');

  const selectedFilter = document.createElement('div');
  selectedFilter.classList.add('selected-filter');

  const filterLabel = document.createElement('label');
  filterLabel.textContent = label;

  selectedFilter.appendChild(filterLabel);
  filterSelectedBox.appendChild(selectedFilter);
}

function removeSelectedFilter(label) {
  console.log(label);
  // if element name cliqued in the li is equal to the label in the selected filter , delete the selected filter
  const selectedFilter = document.querySelectorAll('.selected-filter');
  selectedFilter.forEach(function (filter) {
    if (filter.textContent === label) {
      filter.remove();
    }
  }
  );
}



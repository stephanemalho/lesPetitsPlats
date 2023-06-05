export function afficherSelectBox() {
  // Vérifier si les données ont été récupérées depuis fetch data/recipes.js
  // Vous pouvez ajouter votre logique de vérification ici

  // Sélectionner l'élément parent dans lequel vous souhaitez ajouter les select box
  var container = document.querySelector('.filter__container');

  // Créer les select box
  var selectTitles = ['Ingrédients', 'Appareils', 'Ustensiles'];

  for (var i = 0; i < 3; i++) {
    var selectContainer = document.createElement('div');
    selectContainer.classList.add('select-container');

    var button = document.createElement('button');
    button.textContent = selectTitles[i];
    button.addEventListener('click', function() {
      toggleOptions(this);
    });

    var input = document.createElement('input');
    input.classList.add('search-input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Rechercher...');

    var optionsContainer = document.createElement('ul');
    optionsContainer.classList.add('options-container');

    // Ajouter les options à chaque select box
    for (var j = 0; j < 5; j++) {
      var option = document.createElement('li');
      option.textContent = 'Option ' + j;
      optionsContainer.appendChild(option);
    }

    selectContainer.appendChild(button);
    selectContainer.appendChild(input);
    selectContainer.appendChild(optionsContainer);
    container.appendChild(selectContainer);
  }
}

function toggleOptions(button) {
  var selectContainer = button.parentNode;
  selectContainer.classList.toggle('open');
}

// Ajoutez un écouteur d'événement pour fermer la liste d'options lors d'un clic en dehors de la select box
document.addEventListener('click', function(event) {
  var selectContainers = document.querySelectorAll('.select-container');
  var targetElement = event.target;

  selectContainers.forEach(function(selectContainer) {
    if (!selectContainer.contains(targetElement)) {
      selectContainer.classList.remove('open');
    }
  });
});

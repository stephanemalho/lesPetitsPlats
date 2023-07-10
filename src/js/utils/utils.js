import recipes from "../../data/recipes";

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

export function getOptions(key) {
  const options = recipes.flatMap(recipe => recipe[key]);
  const uniqueOptions = [...new Set(options)];

  return uniqueOptions;
}
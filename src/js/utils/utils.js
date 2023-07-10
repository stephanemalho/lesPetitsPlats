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

export function toggleOptions(button) {
  const chevronIcon = button.querySelector("i.fa-chevron-down");
  chevronIcon.classList.toggle("rotated");
  const selectContainer = button.parentNode;
  selectContainer.classList.toggle("open");
}

export function stringIncludes(value, searchText) {
  if (typeof value === "string" && typeof searchText === "string") {
    return  value.toLowerCase().includes(searchText.toLowerCase());
  }
  return false;
}
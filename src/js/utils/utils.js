export function hiddeSelectBox() {
  document.addEventListener('click', function (event) {
    var selectContainers = document.querySelectorAll('.select-container');
    var targetElement = event.target;

    selectContainers.forEach(function (selectContainer) {
      if (!selectContainer.contains(targetElement)) {
        selectContainer.classList.remove('open');
      }
    });
  });
}

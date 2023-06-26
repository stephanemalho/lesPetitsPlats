export function hideSelectBox() {
  document.addEventListener('click', function (event) {
    var selectContainers = document.getElementsByClassName('select-container');
    var targetElement = event.target;
    let i = 0;
    while (i < selectContainers.length) {
      const selectContainer = selectContainers[i];
      if (!selectContainer.contains(targetElement)) {
        selectContainer.classList.remove('open');
      }
      i++;
    }
  });
}


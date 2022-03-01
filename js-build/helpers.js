//# sourceURL=helpers.js
// Non-React JavaScript goes here

const doEventOnElement = (element, getEvent, fn) => {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener(getEvent, event => {
      fn(element[i])
    })
  }
}

function goToPage(el) {
  window.location = el.dataset.url
}

const getPostDiv =  document.querySelectorAll(".post-link-hook");
export const divClick = doEventOnElement(getPostDiv, 'click', goToPage)
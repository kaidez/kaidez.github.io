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


/* Click to Tweet link code
 * TODO: Refactor this with functional programming
 */
const linkElement = document.querySelector("#tweetButton");

linkElement.addEventListener("click", (event) => {

  event.preventDefault()
  event.stopPropagation()

  const getPostTitle = document.querySelector(".post__title").innerHTML;
  let tweetedLink;

  if(!window.location.origin) {
    tweetedLink = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
  } else {
    tweetedLink = window.location.origin + window.location.pathname;
  }

  window.open("http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=kaidez&", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")

})
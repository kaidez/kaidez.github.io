/**
 *
 */

export const divClick = () => {
  const getPostDiv =  document.querySelectorAll(".post-link-hook");

  for (let i = 0; i < getPostDiv.length; i++) {

    getPostDiv[i].addEventListener('click', (event) => {
      event.preventDefault();
      const getArticleLink = getPostDiv[i].dataset.url
      window.location = getArticleLink;
    });

  }

}
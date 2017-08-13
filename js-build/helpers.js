const helpers = () => {
  const getPostDiv =  document.querySelectorAll(".post-link-hook");

  for (var i = 0; i < getPostDiv.length; i++) {
    getPostDiv[i].addEventListener('click', (event) => {
        alert("boo-ya!!!!")
    });
}
}

export default helpers;
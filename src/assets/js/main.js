function copyrightYear() {
    const CURRENT_YEAR = new Date().getFullYear() % 100;
    let paragraphTag = document.createElement('p');
    paragraphTag.innerHTML = `&copy;2008-${CURRENT_YEAR} Kai "kaidez" Gittens. All rights reserved.`;
    document.querySelector('.footer-bottom').appendChild(paragraphTag);
}
copyrightYear();
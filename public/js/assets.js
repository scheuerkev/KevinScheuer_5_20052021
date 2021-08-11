//also known as common functions, assets.js is loaded by all web app
const toggleMenu = document.getElementsByTagName('nav');
const burgerSlice = document.getElementsByClassName('burgerSlice');

//toggle mobile menu controls
const dropdownFunction = () => {
    toggleMenu[0].classList.toggle("showMenu");
    burgerSlice[0].classList.toggle("transformFirstSlice");
    burgerSlice[1].classList.toggle("transformSecondSlice");
    burgerSlice[2].classList.toggle("transformThirdSlice");
}

window.onclick = (e) => {
    if (!(e.target.matches('.burgerSlice'))) {
        toggleMenu[0].classList.remove("showMenu");
        burgerSlice[0].classList.remove("transformFirstSlice");
        burgerSlice[1].classList.remove("transformSecondSlice");
        burgerSlice[2].classList.remove("transformThirdSlice");
    }
}

//async loadConfig function fetch config.json and return promise
async function loadConfig() {
    let result = await fetch("../../config.json");
    return result.json();
}
//also known as common functions, assets.js is loaded by all web app

const navigationButton = document.getElementById('menu--actionner');
const toggleMenu = document.getElementsByTagName('nav');
const burgerSlice = document.getElementsByClassName('burgerSlice');

//Toggle menu behaviour
navigationButton.addEventListener('click', () => {
        if(getComputedStyle(toggleMenu[0]).display != "none") {
                toggleMenu[0].style.display = "none";
                burgerSlice[0].style.transform = "none";
                burgerSlice[1].style.transform = "none";
                burgerSlice[1].style.opacity = "1";
                burgerSlice[1].style.transformOrigin = "initial";
                burgerSlice[2].style.transform = "none";
        } else {
                toggleMenu[0].style.display = "block";
                burgerSlice[0].style.transform = "rotate(45deg) translate(0, -2px)";
                burgerSlice[1].style.transform = "rotate(0) scale(0.2, 0.2)";
                burgerSlice[1].style.opacity = "0";
                burgerSlice[1].style.transformOrigin = "0 100%";
                burgerSlice[2].style.transform = "rotate(-45deg) translate(-1px, 0)";
        }
});

//async loadConfig function fecth config.json and return promise
async function loadConfig() {
        let result = await fetch("../../config.json");
        return result.json();
}
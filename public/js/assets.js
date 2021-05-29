/*Assets functions*/

/*This EventListener controls the apparition of mobile vue nav
Moreover, a click on the burgerSlice button load the animation of these elements
Each const is pointing a HTML element and set appointed styles after playing animation*/
const myBtn = document.getElementById('menu--actionner');
const myMenu = document.getElementsByTagName('nav');
const burgerSlice = document.getElementsByClassName('burgerSlice');
const searchForm = document.getElementById('search');
const headerLogo = document.getElementById('mainLogo');

myBtn.addEventListener('click', () => {
        if(getComputedStyle(myMenu[0]).display != "none") {
                myMenu[0].style.display = "none";
                burgerSlice[0].style.transform = "none";
                burgerSlice[1].style.transform = "none";
                burgerSlice[1].style.opacity = "1";
                burgerSlice[1].style.transformOrigin = "initial";
                burgerSlice[2].style.transform = "none";
        } else {
                myMenu[0].style.display = "block";
                burgerSlice[0].style.transform = "rotate(45deg) translate(0, -2px)";
                burgerSlice[1].style.transform = "rotate(0) scale(0.2, 0.2)";
                burgerSlice[1].style.opacity = "0";
                burgerSlice[1].style.transformOrigin = "0 100%";
                burgerSlice[2].style.transform = "rotate(-45deg) translate(-1px, 0)";
        }

});

/*This EventListener display modal for address and get the focus of all document on modal form*/
const sendOrderBtn = document.getElementById('sendOrderBtn');
const closeOrderBtn = document.getElementById('closeOrderBtn');
const blackdrop = document.getElementById('blackdrop');
const orderModal = document.getElementById('order__modal');

sendOrderBtn.addEventListener('click', () => {
        orderModal.style.display = "block";
        blackdrop.classList.add('blackdrop');
});

closeOrderBtn.addEventListener('click', () => {
        orderModal.style.display = "none";
        blackdrop.classList.remove('blackdrop');
});

/*These EventListeners increase or decrease quantity of item ordered*/
const minusBtn = document.getElementsByClassName('quantity__minus');
const plusBtn = document.getElementsByClassName('quantity__plus');
const quantityCell = document.getElementsByClassName('quantityCell');
let quantity = 1;

        if(quantity > 0) {
                for (let i = 0; i < minusBtn.length; i++) {
                        minusBtn[i].addEventListener('click', () => {
                                quantity--;
                                console.log(quantity);
                                quantityCell[i].textContent = quantity;
                        });
                }
                for (let i = 0; i < plusBtn.length; i++) {
                        plusBtn[i].addEventListener('click', () => {
                                quantity++;
                                console.log(quantity);
                                quantityCell[i].textContent = quantity;
                        });
                }
        }
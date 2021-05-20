const myBtn = document.getElementById('menu--actionner');
const myMenu = document.getElementsByTagName('nav');
console.log(myBtn);
console.log(myMenu[0]);

myBtn.addEventListener('click', (e) => {
    myMenu[0].setAttribute('transform', 'translateX(0)');
    console.log(myMenu[0]);
});
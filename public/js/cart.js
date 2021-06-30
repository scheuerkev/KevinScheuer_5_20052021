//La première fonction est chargée de créer le panier pour être visualisé par le client
//A chaque produit dans le local Storage, on crée une ligne de panier
//Chaque, la quantité peut être modifié a chaque ligne. Les cellules doivent se mettre à jour avec le calcul des prix

//proto

const currentCart = JSON.parse(localStorage.getItem("cart"));

fetch("http://localhost:3000/api/furniture")
    .then(data => data.json())
    .then(value => {

            for (let values of value) {
                if (currentCart === null) {
                    hideCart();
                } else {
                    for (let element of currentCart) {
                        if (element.id === values._id) {
                            document
                                .getElementById('table__body')
                                .innerHTML += `
                                                <tr>
                                                    <td class="product__name">${values.name}</td>
                                                    <td class="varnish">${element.varnish}</td>
                                                    <td class="price">${values.price / 100}€</td>
                                                    <td class="quantity"><button class="quantity__control quantity__minus"><i class="fas fa-minus"></i></button><span class="quantityCell">${element.quantity}</span><button class="quantity__control quantity__plus"><i class="fas fa-plus"></i></button></td>
                                                    <td class="total">${values.price * element.quantity / 100}€</td>
                                                </tr>
                                                `;
                        }
                    }


                }

            }

        displayOrderModal();
        checkValidity(document.getElementById('order__modal--firstname'), (e) => alphaMask.test(e.target.value));
        checkValidity(document.getElementById('order__modal--lastname'), (e) => alphaMask.test(e.target.value));
        checkValidity(document.getElementById('order__modal--numberAdress'), (e) => numericMask.test(e.target.value));
        checkValidity(document.getElementById('order__modal--street'), (e) => alphaMask.test(e.target.value));
        checkValidity(document.getElementById('order__modal--zipCode'), (e) => zipMask.test(e.target.value));
        checkValidity(document.getElementById('order__modal--city'), (e) => alphaMask.test(e.target.value));
        checkValidity(document.getElementById('order__modal--email'), (e) => emailMask.test(e.target.value));
        document.getElementById('resetFormBtn').addEventListener('click', function (e) {
            e.preventDefault();
            resetForm();
        });
            quantityControl();

        }
    )
    .catch(err => {
        throw err;
    });

const setTotal = (tab) => {
    let total = 0;
    for (let i = 0; i < tab.length; i++) {
        total += parseInt(tab[i].innerText);
    }
    return total;
}

const hideCart = () => {
    document
        .getElementById("order__controllers")
        .style.display = "none";

    document
        .getElementById("table__cart")
        .style.display = "none";

    document
        .getElementById("empty__cart")
        .style.display = "block";

}

const displayOrderModal = () => {
    let orderModal = document.getElementById('order__modal');
    let blackDrop = document.getElementById('blackdrop');

    document
        .getElementById('sendOrderBtn')
        .addEventListener('click', function (e) {
            orderModal.style.display = 'block';
            blackDrop.classList.add('blackdrop');
        });

    document
        .getElementById('sendFormBtn')
        .addEventListener('click', function (e) {
            console.log("Envoi de la commande");
            window.location.reload();
        });


    document
        .getElementById('resetFormBtn')
        .addEventListener('click', function (e) {
            console.log("Vidage des champs");
            window.location.reload();
        });


    document
        .getElementById('closeOrderBtn')
        .addEventListener('click', function (e) {
            console.log("Fermeture, annulation, retour au panier");
            orderModal.style.display = "none";
            blackDrop.classList.remove('blackdrop');
        });

}

document
    .getElementById('resetOrderBtn')
    .addEventListener('click', function (e) {
        localStorage.removeItem('cart');
        window.location.reload();
    });

const alphaMask = /^[a-zéèàêâùïüëA-ZÉÈÀÙ-\s\']{3,}$/;
const numericMask = /^[0-9\s]{1,}$/;
const zipMask = /^[0-9]{5}/;
const emailMask = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const checkValidity = (input, condition) => {
    input.oninput = (e) => {
        if (condition(e)) {
            allowEntry(e.target);
        } else {
            warnEntry(e.target);
        }
        input.onblur = (e) => {
            if (!condition(e)) {
                denyEntry(e.target);
            }
        }
    }
}

const allowEntry = (input) => {
    input.style.border = "2px solid green";
}
const warnEntry = (input) => {
    input.style.border = "2px solid orange";
}
const denyEntry = (input) => {
    input.style.border = "2px solid red";
}

const resetForm = () => {
    let entries = document
        .getElementsByTagName('input');
    for (let i = 0; i < entries.length; i++) {
        entries[i].value = "";
    }

}

const quantityControl = () => {
    const minusBtn = document.getElementsByClassName('quantity__minus');
    const plusBtn = document.getElementsByClassName('quantity__plus');
    let quantity = document.getElementsByClassName('quantityCell');

    for (let i = 0; i < minusBtn.length; i++) {
        minusBtn[i].addEventListener('click', function (e) {
            let currentQuantity = parseInt(quantity[i].textContent);
            if(currentQuantity>0) {
                currentQuantity--;
            }
            quantity[i].innerText = currentQuantity.toString();
        });
    }

    for (let i = 0; i < plusBtn.length; i++) {
        plusBtn[i].addEventListener('click', function (e) {
            let currentQuantity = parseInt(quantity[i].textContent);
            if(currentQuantity<9) {
                currentQuantity++;
            }
            quantity[i].innerText = currentQuantity.toString();
        });
    }

}

const totalInCells = () => {

}
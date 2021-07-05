//La première fonction est chargée de créer le panier pour être visualisé par le client
//A chaque produit dans le local Storage, on crée une ligne de panier
//Chaque, la quantité peut être modifié a chaque ligne. Les cellules doivent se mettre à jour avec le calcul des prix

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
            totalQtyInCells();
            totalPriceInCells();
            quantityControl();
            displayOrderModal();
            resetOrder();


        }
    )
    .catch(err => {
        throw err;
    });

//Cells functions
const quantityControl = () => {
    const minusBtn = document.getElementsByClassName('quantity__minus');
    const plusBtn = document.getElementsByClassName('quantity__plus');
    let quantity = document.getElementsByClassName('quantityCell');

    for (let i = 0; i < minusBtn.length; i++) {
        minusBtn[i].addEventListener('click', function (e) {
            let currentQuantity = parseInt(quantity[i].textContent);
            if (currentQuantity > 0) {
                currentQuantity--;
            }
            quantity[i].innerText = currentQuantity.toString();
            totalQtyInCells();
            totalPriceInCells();
        });
    }

    for (let i = 0; i < plusBtn.length; i++) {
        plusBtn[i].addEventListener('click', function (e) {
            let currentQuantity = parseInt(quantity[i].textContent);
            if (currentQuantity < 9) {
                currentQuantity++;
            }
            quantity[i].innerText = currentQuantity.toString();
            totalQtyInCells();
            totalPriceInCells();
        });
    }

}
const totalQtyInCells = () => {
    let totalItemCartQty = document.getElementById('totalItemCartQty');
    let quantity = document.getElementsByClassName('quantityCell');
    let sum = 0;

    for (let i = 0; i < quantity.length; i++) {
        sum += parseInt(quantity[i].textContent);
    }
    totalItemCartQty.innerText = sum;
}
const totalPriceInCells = () => {
    let totalItemCartPrice = document.getElementById('totalItemCartPrice');
    let quantity = document.getElementsByClassName('quantityCell');
    let priceLine = document.getElementsByClassName('price');
    let totalPriceLine = document.getElementsByClassName('total');
    let sum = 0;

    for (let i = 0; i < quantity.length; i++) {
        totalPriceLine[i].textContent = parseInt(quantity[i].textContent) * parseInt(priceLine[i].textContent) + "€";
        sum += parseInt(quantity[i].textContent) * parseInt(priceLine[i].textContent);
    }

    totalItemCartPrice.innerText = sum + "€";
}

//Cart manipulation functions
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

            sendOrder();
            e.preventDefault();


        });


    document
        .getElementById('resetFormBtn')
        .addEventListener('click', function (e) {
            console.log("Vidage des champs");
            resetForm();
        });


    document
        .getElementById('closeOrderBtn')
        .addEventListener('click', function (e) {
            console.log("Fermeture, annulation, retour au panier");
            orderModal.style.display = "none";
            blackDrop.classList.remove('blackdrop');
        });

}
const resetOrder = () => {
    document
        .getElementById('resetOrderBtn')
        .addEventListener('click', function (e) {
            localStorage.removeItem('cart');
            window.location.reload();
        });
}

//Form validity functions
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


const sendOrder = () => {
    const contact = {
        firstName: document.getElementById("order__modal--firstname").value,
        lastName: document.getElementById("order__modal--lastname").value,
        address: document.getElementById("order__modal--address").value,
        city: document.getElementById("order__modal--city").value,
        email: document.getElementById("order__modal--email").value,
    };


    if (!(testFirstName(contact.firstName)) ||
        !(testLastName(contact.lastName)) ||
        !(testAddress(contact.address)) ||
        !(testCity(contact.city)) ||
        !(testEmail(contact.email))
    ) {

    } else {
        const products = [];
        currentCart.forEach(product => {
            products.push(product.id);
        });

        let order = {
            contact: contact,
            products: products,
        };

        const request = new Request( // On crée notre requête POST vers API
            "http://localhost:3000/api/furniture/order",
            {
                method: "POST",
                body: JSON.stringify(order),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }),
            }
        );

        fetch(request)
            .then((response) => response.json())
            .then((response) => { //on récupère la réponse de l'API pour obtenir numéro de commande
                let orderId = response.orderId;
                let totalItemCartPrice = document.getElementById('totalItemCartPrice');
                //console.log(orderId)
                //localStorage.setItem("idCommand", JSON.stringify(orderId)); // on met à jour le localstorage avec numero de commande
                localStorage.removeItem("cart"); // on met à jour le localstorage avec infos de commande
                window.location.href = `./order.html?orderId=${orderId}?totalPrice=${totalItemCartPrice.innerText}`;
            })
            .catch(err => {
                throw err;
            });
    }


}

const alphaMask = /^[A-ZÉÈÀÙ][A-ZÉÈÀÙa-zéèàù' -]{2,30}$/;
const alphaNumMask = /^[A-ZÉÈÀÙa-zéèàêâùïüëA-Z0-9-\s,']{5,50}$/;
const emailMask = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const testFirstName = (input) => {
    const alertMessage = document.getElementsByClassName('alertMessage');

    if(!(alphaMask.test(input))) {
        alertMessage[0].innerText = "Ce champ pose problème, merci de le corriger";
        return false;
    }
    else {
        alertMessage[0].innerText = "";
        return true;
    }
}
const testLastName = (input) => {
    const alert = document.getElementsByClassName('alertMessage');

    if(!(alphaMask.test(input))) {
        alert[1].innerText = "Ce champ pose problème, merci de le corriger";
        return false;
    }
    else {
        alert[1].innerText = "";
        return true;
    }
}
const testAddress = (input) => {
    const alert = document.getElementsByClassName('alertMessage');

    if(!(alphaNumMask.test(input))) {
        alert[2].innerText = "Ce champ pose problème, merci de le corriger";
        return false;
    }
    else {
        alert[2].innerText = "";
        return true;
    }
}
const testCity = (input) => {
    const alert = document.getElementsByClassName('alertMessage');

    if(!(alphaMask.test(input))) {
        alert[3].innerText = "Ce champ pose problème, merci de le corriger";
        return false;
    }
    else {
        alert[3].innerText = "";
        return true;
    }
}
const testEmail = (input) => {
    const alert = document.getElementsByClassName('alertMessage');

    if(!(emailMask.test(input))) {
        alert[4].innerText = "Ce champ pose problème, merci de le corriger";
        return false;
    }
    else {
        alert[4].innerText = "";
        return true;
    }
}


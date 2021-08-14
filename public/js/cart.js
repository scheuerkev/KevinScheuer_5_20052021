//get item with "cart" key in localStorage
const currentCart = JSON.parse(localStorage.getItem("cart"));

loadConfig().then(data => {
    console.log("Host config loaded");
    //fetching API
    fetch(data.host + "/api/furniture")
        //promise return raw datas parsed from JSON
        .then(data => {
            console.log("API connection OK");
            return data.json()
        })
        //got a promise with JS Object now
        .then(value => {
                console.log("Get results from API");
                for (let values of value) {
                    //checking if currentCart is existing
                    if (currentCart === null) {
                        hideCart();
                    } else {
                        //for each element of existing current cart build a table line.
                        //we have to fetch API because localStorage store only id, quantity and varnish
                        //product price and name are provided from API to ensure security
                        //
                        for (let element of currentCart) {
                            if (element.id === values._id) {
                                document
                                    .getElementById('table__body')
                                    .innerHTML += `
                                                <tr>
                                                    <td class="product__name">${values.name}</td>
                                                    <td class="varnish">${element.varnish}</td>
                                                    <td class="price">${values.price / 100}€</td>
                                                    <td class="quantity"><button class="quantity__control quantity__minus"><i class="fas fa-minus"></i></button><span class="quantityCell">${normalizeQty(element.quantity)}</span><button class="quantity__control quantity__plus"><i class="fas fa-plus"></i></button></td>
                                                    <td class="total">${values.price * normalizeQty(element.quantity) / 100}€</td>
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
            //catch and throw error of fetching API promise
            console.error("API error : " + err);
            window.location.href = '../html/404.html';
        });

//cells controls functions
    const quantityControl = () => {
        const minusBtn = document.getElementsByClassName('quantity__minus');
        const plusBtn = document.getElementsByClassName('quantity__plus');
        let quantity = document.getElementsByClassName('quantityCell');

        for (let i = 0; i < minusBtn.length; i++) {
            minusBtn[i].addEventListener('click', () => {
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
            plusBtn[i].addEventListener('click', () => {
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
    const normalizeQty = (quantity) => {
        if (quantity < 0) {
            console.log("Data corruption : normalize quantity to 0");
            quantity = 0;
            return quantity;
        } else if (quantity > 9) {
            console.log("Data corruption : normalize quantity to 9");
            quantity = 9;
            return quantity;
        } else {
            return quantity;
        }
    }

//cart manipulation functions
    //hideCart table if localStorage is empty
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
    //when order button is clicked from currentCart table, display a form modal
    const displayOrderModal = () => {
        let orderModal = document.getElementById('order__modal');
        let blackDrop = document.getElementById('blackdrop');

        document
            .getElementById('sendOrderBtn')
            .addEventListener('click', () => {
                orderModal.style.display = 'block';
                blackDrop.classList.add('blackdrop');
            });

        document
            .getElementById('sendFormBtn')
            .addEventListener('click', (e) => {
                sendOrder();
                e.preventDefault();
            });

        document
            .getElementById('resetFormBtn')
            .addEventListener('click', (e) => {
                resetForm();
                e.preventDefault();
            });

        document
            .getElementById('closeOrderBtn')
            .addEventListener('click', () => {
                orderModal.style.display = "none";
                blackDrop.classList.remove('blackdrop');
            });
    }
    //resetOrder function remove current cart and reload current page
    const resetOrder = () => {
        document
            .getElementById('resetOrderBtn')
            .addEventListener('click', () => {
                localStorage.removeItem('cart');
                window.location.reload();
            });
    }

//form functions
    //resetForm empty forms inputs
    const resetForm = () => {
        let entries = document
            .getElementsByTagName('input');
        for (let i = 0; i < entries.length; i++) {
            entries[i].value = "";
        }
    }
    //sendOrder build contact object and call testFields
    const sendOrder = () => {
        const firstName = document.getElementById("order__modal--firstname").value;
        const lastName = document.getElementById("order__modal--lastname").value;
        const address = document.getElementById("order__modal--address").value;
        const city = document.getElementById("order__modal--city").value;
        const email = document.getElementById('order__modal--email').value;

        const contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        };
        const products = [];
        currentCart.forEach(product => {
            products.push(product.id);
        });
        //build order object as waited from server
        let order = {
            contact: contact,
            products: products,
        };

        if (testFields(contact)) {
            //build POST request
            console.log("Order datas :" + JSON.stringify(order));
            loadConfig().then(data => {
                console.log("Host config loaded");
                const request = new Request(
                    data.host + "/api/furniture/order",
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
                    //fetching API with POST request params, get raw datas from parsed json
                    .then((response) => {
                        console.log("API connection OK");
                        return response.json();
                    })
                    //got JS object now
                    .then((response) => {
                        console.log("POST Request OK");
                        let orderId = response.orderId;
                        //get total price from total price cell
                        let totalItemCartPrice = document.getElementById('totalItemCartPrice');
                        totalItemCartPrice = totalItemCartPrice.innerText.split('€');
                        //empty localStorage
                        localStorage.removeItem("cart");
                        window.location.href = `./order.html?orderId=${orderId}?totalPrice=${totalItemCartPrice[0]}`;
                    })
                    .catch(err => {
                        console.error("POST Request error : " + err);
                    });
            })
                .catch(err => {
                    console.error("Host config error : " + err);
                });
        }
    }

//input validation
    //testFields check validity on each input form. It tests datas with proper regexp and set a message if test fails.
    const testFields = (input) => {
        //regexp patterns
        const alphaMask = /^[A-ZÉÈÀÙa-zéèàêâùïüë'\s-]{2,30}$/;
        const alphaNumMask = /^[A-ZÉÈÀÙa-zéèàêâùïüë0-9-\s,']{5,50}$/;
        const emailMask = /^[a-z0-9-_]*[.]{0,1}[a-zA-Z0-9-_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,15}){1}$/;

        const alertMessage = document.getElementsByClassName('alertMessage');
        //valid boolean is update when a regexp test fail
        let valid = true;

        if (!(alphaMask.test(input.firstName))) {
            valid = false;
            alertMessage[0].innerText = "Le prénom doit être compris entre 2 et 30 caractères, uniquement des lettres";
        } else {
            alertMessage[0].innerText = "";
        }

        if (!(alphaMask.test(input.lastName))) {
            valid = false;
            alertMessage[1].innerText = "Le nom doit être compris entre 2 et 30 caractères, uniquement des lettres";
        } else {
            alertMessage[1].innerText = "";
        }

        if (!(alphaNumMask.test(input.address))) {
            valid = false;
            alertMessage[2].innerText = "L'addresse doit être compris entre 5 et 50 caractères, lettres et chiffres";
        } else {
            alertMessage[2].innerText = "";
        }

        if (!(alphaMask.test(input.city))) {
            valid = false;
            alertMessage[3].innerText = "La ville doit être compris entre 2 et 30 caractères, uniquement des lettres";
        } else {
            alertMessage[3].innerText = "";
        }

        if (!(emailMask.test(input.email))) {
            valid = false;
            alertMessage[4].innerText = "L'adresse email doit être de la forme : monaddresse@email.xyz";
        } else {
            alertMessage[4].innerText = "";
        }
        return valid;
    }
});
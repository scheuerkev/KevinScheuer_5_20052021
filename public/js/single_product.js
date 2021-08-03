//build a new URL object with current URL for comparision
let currentUrl = new URL(window.location.href);
currentUrl = currentUrl.searchParams.get("id");

//getting datas from existing cart in Local Storage
let currentCart = JSON.parse(localStorage.getItem("cart"));

loadConfig().then(data => {
    console.log("Host config loaded");
    //fetching API on current url
    fetch(data.host + "/api/furniture/" + currentUrl)
        //promise return raw datas parsed from JSON
        .then(data => {
            console.log("API follow id " + currentUrl + " : connection OK");
            return data.json();
        })

        .then(value => {
            console.log("Get results from API");
            //building product with matching ID
            let product = new Product(value);
            document
                .getElementById('single-product__container')//Displaying this one
                .innerHTML += product.displaySingleProduct(value);

            //loop his varnish (feature) array
            for (let varnish of value.varnish) {
                document
                    .getElementById('varnish')
                    .innerHTML += product.setVarnish(varnish);
            }

            //DOM elements
            const formController = document.getElementById('order__controller--send');
            const selectVarnish = document.querySelector('select#varnish ');
            const selectQuantity = document.querySelector('select#quantity');
            const warning = document.getElementById('warning');

            //adding an Event Listener on form
            formController.addEventListener('click', function (e) {
                //testing if there's one or two value missing
                if (selectVarnish.validity.valueMissing || selectQuantity.validity.valueMissing) {
                    warning.innerText = "Vous devez choisir un vernis et une quantité";
                    e.preventDefault();
                } else {
                    warning.innerText = "";
                    //build a new Item
                    let item = new Item(product.id, selectQuantity.value, selectVarnish.value);
                    //if a customer cart already exists
                    if (currentCart) {
                        console.log(currentCart);
                        //the some/map structure check and update quantity if product (with this feature) already exists in the cart
                        if (currentCart.some(articles => articles.id === item.id && articles.varnish === item.varnish)) {
                            currentCart = currentCart.map(article => {
                                if (article.id === item.id && article.varnish === item.varnish) {
                                    article.quantity += item.quantity;
                                }
                                return article;
                            })
                        } else {
                            //add item to cart
                            currentCart.push(item);
                        }
                        //update curent cart
                        localStorage.setItem("cart", JSON.stringify(currentCart));
                    } else {
                        //else, if the customer cart doesn't exists, create a new one from empty array.
                        currentCart = [];
                        currentCart.push(item);
                        localStorage.setItem("cart", JSON.stringify(currentCart));
                    }
                    displayValidationModal();
                    e.preventDefault();
                }
            });
        })

        .catch(err => {
            //if an error is catch, enforce 404 redirection
            window.location.href = '../html/404.html';
            console.error("API error: " + err);
        });

//display a validation modal when form is granted and redirect user
    const displayValidationModal = () => {
        document
            .getElementById('confirmation__modal')
            .style.display = "block";
        document
            .getElementById('blackdrop')
            .classList.add('blackdrop');

        document
            .getElementById('btn__continue')
            .addEventListener('click', () => {
                window.location.href = '../../index.html';
            })

        document
            .getElementById('btn__cart')
            .addEventListener('click', () => {
                window.location.href = '../html/cart.html';
            })

        document
            .getElementById('closeModalBtn')
            .addEventListener('click', () => {
                document
                    .getElementById('confirmation__modal')
                    .style.display = "none";
                document
                    .getElementById('blackdrop')
                    .classList.remove('blackdrop');
            })
    }
})

    .catch(err => {
        //catch and throw error of fetching config.json promise
        console.error("Host config error : " + err);
        document
            .getElementById('single-product__container')
            .innerHTML = `<div class="error"> 
                            <i class="fas fa-plug"></i>
                            <p>Help ! Il semble qu'il y ait un problème avec la configuration du serveur !</p>
                            </div>`;
    });
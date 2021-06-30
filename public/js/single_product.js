let currentUrl = new URL(window.location.href);                         //Build a new URL object with current URL for comparision
currentUrl = currentUrl.searchParams.get("id");
let currentCart = JSON.parse(localStorage.getItem("cart"));


fetch("http://localhost:3000/api/furniture/" + currentUrl)                        //Fetching API
    .then(data => data.json())                                           //Promise return raw datas parsed from JSON
    .then(value => {

        let product = new Product(value);                        //Building the Product with matching ID
        document
            .getElementById('single-product__container')//Displaying this one
            .innerHTML += product.displaySingleProduct(value);

        for (let varnish of value.varnish) {                        //Looping his varnish (feature) array
            document
                .getElementById('varnish')
                .innerHTML += product.setVarnish(varnish);
        }


        const formController = document.getElementById('order__controller--send');
        const selectVarnish = document.querySelector('select#varnish ');
        const selectQuantity = document.querySelector('select#quantity');
        const warning = document.getElementById('warning');

        formController.addEventListener('click', function (e) {

            if (selectVarnish.validity.valueMissing || selectQuantity.validity.valueMissing) {
                warning.innerText = "Vous devez choisir un vernis et une quantité";
                e.preventDefault();
            } else {
                warning.innerText = "";
                let item = new Item(product.id, selectQuantity.value, selectVarnish.value);
                if (currentCart) {
                    for (let obj of currentCart) {
                        if (obj.id.includes(product.id)) {
                            Object.keys(obj).map(function (key) {
                                obj[key] = item[key];
                            });
                        }
                    }
                    currentCart.push(item);
                    localStorage.setItem("cart", JSON.stringify(currentCart));
                } else {
                    currentCart = [];
                    currentCart.push(item);
                    localStorage.setItem("cart", JSON.stringify(currentCart));

                }


                displayModal();
                e.preventDefault();
            }
        });
    })
    .catch(err => {
        window.location.href = '../html/404.html';          //Enforce 404 redirection
        console.error(err);                                 //Throw error !
    });

//This function show a modal when form is granted to
function displayModal() {
    document
        .getElementById('confirmation__modal')
        .style.display = "block";
    document
        .getElementById('blackdrop')
        .classList.add('blackdrop');

    document
        .getElementById('btn__continue')
        .addEventListener('click', function (e) {
            document.location.href = "../../index.html";
        })

    document
        .getElementById('btn__cart')
        .addEventListener('click', function (e) {
            document.location.href = "cart.html";
        })

    document
        .getElementById('closeModalBtn')
        .addEventListener('click', function (e) {
            document
                .getElementById('confirmation__modal')
                .style.display = "none";
            document
                .getElementById('blackdrop')
                .classList.remove('blackdrop');
        })
}



let currentUrl = new URL(window.location.href);                         //Build a new URL object with current URL for comparision
currentUrl = currentUrl.searchParams.get("id");


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
                        e.preventDefault();
                        warning.innerText = "Vous devez choisir un vernis et une quantité";
                    } else {
                        warning.innerText = "";
                        let currentItem = new Item(currentUrl, selectQuantity.value);
                        currentItem.setValues();
                        /*successfullyAddToCart();*/
                        e.preventDefault();
                    }
                });
    })
    .catch(err => {
        // window.location.href = '../html/404.html';          //Enforce 404 redirection
        console.error(err);                                 //Throw error !
    });





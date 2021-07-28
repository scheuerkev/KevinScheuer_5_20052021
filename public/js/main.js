loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/furniture")        //Fetching API
        .then(data => data.json())                     //Promise return raw datas parsed from JSON
        .then(values => {                              //Got a JS Object now

            for (let value of values) {                //Building new product from Product class for each value in values :D
                let product = new Product(value);
                document
                    .getElementById('products')
                    .innerHTML += product.displayAllProducts(value);
            }

            let hero = document.getElementsByClassName('hero');
            hero[0].classList.remove('invisible'); //This remove invisible class to hero class be only shown on first product


        })
        .catch(err => {
            document
                .getElementById('products')
                .innerHTML = `<div class="error"> 
                            <i class="fas fa-plug"></i>
                            <p>Help ! Quelqu'un a débranché une prise !</p>
                            </div>`;
            throw err;                                        //Throw error !
        });
});





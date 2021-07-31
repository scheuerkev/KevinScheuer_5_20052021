loadConfig().then(data => {
    console.log("Host config loaded");
    //Fetching API
    fetch(data.host + "/api/furniture")
        //Promise return raw datas parsed from JSON
        .then(data => {
            console.log("API connexion OK");
            return data.json();
        })
        //Got a promise with JS Object now
        .then(values => {
            console.log("Get results from API");
            for (let value of values) {
                //Building new product from Product class for each value in values array returned
                let product = new Product(value);
                //Adding a product card in products html section
                document
                    .getElementById('products')
                    .innerHTML += product.displayAllProducts(value);
            }

            let hero = document.getElementsByClassName('hero');
            //Remove invisible class to hero class be only shown on first product
            hero[0].classList.remove('invisible');


        })
        .catch(err => {
            //Catch and throw error of fetching API promise
            console.error("API error : " + err);
            document
                .getElementById('products')
                .innerHTML = `<div class="error"> 
                            <i class="fas fa-plug"></i>
                            <p>Help ! Il semble qu'il y ait un problème avec le serveur !</p>
                            </div>`;
        });
    })
    .catch(err => {
        //Catch and throw error of fetching config.json promise
        console.error("Host config error : " + err);
        document
            .getElementById('products')
            .innerHTML = `<div class="error"> 
                            <i class="fas fa-plug"></i>
                            <p>Help ! Il semble qu'il y ait un problème avec la configuration du serveur !</p>
                            </div>`;
    });





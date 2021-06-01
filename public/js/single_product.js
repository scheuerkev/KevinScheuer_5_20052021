let currentUrl = new URL(window.location.href);                         //Build a new URL object with current URL for comparision
currentUrl = currentUrl.searchParams.get("id");


fetch("http://localhost:3000/api/furniture")  //Fetching API
    .then(data => data.json())                     //Promise return raw datas parsed from JSON
    .then(values => {
        for (let value of values) {
            if (currentUrl === value._id) {                                            //Building new product from Product class for each value in values :D
                let product = new Product(value);
                document
                    .getElementById('single-product__container')
                    .innerHTML += product.displaySingleProduct(value);
            }
        }
    })
    .catch(err=>{
        throw err;                                        //Throw error !
    });

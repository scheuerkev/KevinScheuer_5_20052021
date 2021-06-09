fetch("http://localhost:3000/api/furniture")  //Fetching API
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
        throw err;                                        //Throw error !
    });

/*let test;
const getFurniture = async () => {
    const response = await fetch("http://localhost:3000/api/furniture");
    const data = await response.json();

    addFurniture(data);

}
getFurniture();

const addFurniture = (data) => {
    // html
}*/





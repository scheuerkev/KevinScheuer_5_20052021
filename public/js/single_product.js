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
                console.log(currentCart);

                    if (currentCart.some(articles => articles.id === item.id && articles.varnish === item.varnish)) {
                        currentCart = currentCart.map(article => {
                            if (article.id === item.id && article.varnish === item.varnish) {
                                article.quantity += item.quantity;
                            }
                            return article;
                        })
                    } else {
                        currentCart.push(item);

                    }
                    localStorage.setItem("cart", JSON.stringify(currentCart));
                    /*
                    var test=true;

                    for (let obj of currentCart) {

                        if (currentCart.some(() => {
                            return item.id === obj.id && selectVarnish.value === obj.varnish;
                        })) {
                            Object.keys(obj).map((key) => {
                                obj[key] = item[key];
                                test = false;
                                localStorage.setItem("cart", JSON.stringify(currentCart));

                            });
                        }
                    }
*/
                    /*const myUsers = [
                        { name: 'shark', likes: 'ocean' },
                        { name: 'turtle', likes: 'pond' },
                        { name: 'otter', likes: 'fish biscuits' }
                    ]

                    const usersByLikes = myUsers.map(item => {
                        const container = {};

                        container[item.name] = item.likes;
                        container.age = item.name.length * 10;

                        return container;
                    })

                    console.log(usersByLikes);*/

                    /*currentCart.push(item);
                    localStorage.setItem("cart", JSON.stringify(currentCart));*/

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
const displayModal = () => {
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


const test = () => {
    return item.id === obj.id && selectVarnish.value === obj.varnish;
}
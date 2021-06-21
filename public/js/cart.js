//La première fonction est chargée de créer le panier pour être visualisé par le client
//A chaque produit dans le local Storage, on crée une ligne de panier
//Chaque, la quantité peut être modifié a chaque ligne. Les cellules doivent se mettre à jour avec le calcul des prix

//proto
fetch("http://localhost:3000/api/furniture")
    .then(data => data.json())
    .then(value => {

            for (let values of value) {
                let cartItem = new Product(values);
                cartItem.getProducts(values.id);
            }

            let itemCartQty = document
                .getElementsByClassName('quantityCell');

            let totalItemCartQty = document
                .getElementById('totalItemCartQty').innerText = setTotal(itemCartQty);

            let itemCartPrice = document
                .getElementsByClassName('total');

            let totalItemCartPrice = document
            .getElementById('totalItemCartPrice').innerText = setTotal(itemCartPrice);

        }
    )
    .catch(err => {
        throw err;
    });

const setTotal = (tab) => {
    let total = 0;
    for (let i = 0; i < tab.length; i++) {
        total += parseInt(tab[i].innerText);
    }
    return total;
}
//La première fonction est chargée de créer le panier pour être visualisé par le client
//A chaque produit dans le local Storage, on crée une ligne de panier
//Chaque, la quantité peut être modifié a chaque ligne. Les cellules doivent se mettre à jour avec le calcul des prix

//proto
fetch("http://localhost:3000/api/furniture")
    .then(data => data.json())
    .then(value => {

            for (let i = 0; i < localStorage.length; i++) {

                for (let values of value) {
                    let test = new Product(values);

                    /*if (test.id === localStorage.key(i)) {
                        document
                            .getElementById('table__body')
                            .innerHTML += `
                    <tr>
                          <td class="product__name">${test.name}</td>
                          <td class="varnish">Chocolate</td>
                          <td class="price">${test.price / 100}</td>
                          <td class="quantity"><button class="quantity__control quantity__minus"><i class="fas fa-minus"></i></button><span class="quantityCell">${localStorage.getItem(test.id)}</span><button class="quantity__control quantity__plus"><i class="fas fa-plus"></i></button></td>
                          <td class="total">${test.price * localStorage.getItem(test.id) / 100}</td>
                    </tr>
                    `;
                    }*/
                    getProduct(test);
                }
            }
        }
    )
    .catch(err => {
        throw err;
    });

const getProduct = (val) => {
    if (val.id === localStorage.key(i)) {
        document
            .getElementById('table__body')
            .innerHTML += `
                    <tr>
                          <td class="product__name">${test.name}</td>
                          <td class="varnish">Chocolate</td>
                          <td class="price">${test.price / 100}</td>
                          <td class="quantity"><button class="quantity__control quantity__minus"><i class="fas fa-minus"></i></button><span class="quantityCell">${localStorage.getItem(test.id)}</span><button class="quantity__control quantity__plus"><i class="fas fa-plus"></i></button></td>
                          <td class="total">${test.price * localStorage.getItem(test.id) / 100}</td>
                    </tr>
                    `;
    }
}
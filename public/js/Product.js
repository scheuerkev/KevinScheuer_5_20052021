//Product class operates construction of objects from a data list properties

class Product {

    constructor(productsDatas) {
        this.id = productsDatas._id;
        this.name = productsDatas.name;
        this.price = productsDatas.price;
        this.description = productsDatas.description;
        this.imageUrl = productsDatas.url;                                    //Staticly assign productsDatas in this instance
    }

    //This method displayAllProducts on homePage of Orinoco
    displayAllProducts(params) {
        let container = `<div class="products__container">
                            <span class="hero invisible"><i class="fas fa-meteor"></i> Notre dernier arrivé!</span>
                            <figure>
                                <a href="./public/html/single_product.html?id=${params._id}" title="Voir les détails de ${params.name}">
                                    <img src=${params.imageUrl} alt="${params.name}" />
                                </a>
                                <figcaption><h3>${params.name}</h3></figcaption>
                            </figure>
                             <button onclick="window.location.href = './public/html/single_product.html?id=${params._id}'"><i class="fas fa-plus-square"></i>Voir plus</button>
                        </div>`;

        return container;
    }

    //This method display a specific product on single product page of Orinoco
    displaySingleProduct(params) {
        let container = `<figure>
            <a href="#" title="Voir les détail de ${params.name}">
                <img src="${params.imageUrl}" alt="Voir les détails de ${params.name}">
            </a>
            <figcaption>
                <div class="single-product__headings">
                    <h3>${params.name}</h3>
                    <p class="single-product--price">
                        ${params.price / 100}€
                    </p>
                </div>
                <hr>
                <h4>Description :</h4>
                <p class="single-product--description">
                    ${params.description}
                </p>
                <span id="warning"></span>
                <form>
                    <label for="varnish"> Vernis :
                        <select id="varnish" required>
                            <option value="">--Selectionnez une finition--</option>
                        </select>
                    </label>
                    <label for="quantity"> Quantité :
                        <select id="quantity" required>
                            <option value="">--Selectionnez une quantité--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </label>
                    <button class="order__controller--send" id="order__controller--send">Ajouter au panier</button>
                </form>
            </figcaption>
        </figure>`;

        return container;
    }

    //This method set Varnish option for each product in item list
    setVarnish(params) {
        let container = `
         <option value=${params}>${params}</option>
        `;
        return container;

    }

    //This method set a product to localStorage. To enforce security, only id, quantity and varnish are set in LS. Price and name provide from API
    setProducts(id, [quantity, varnish]) {
        localStorage.setItem(id, JSON.stringify([quantity, varnish]));
    }

    //This method display a cart line for each localStorage item
    getProducts(id) {
        let datas = JSON.parse(localStorage.getItem(this.id));

        for (let i=0; i<6; i++){
            if (this.id === localStorage.key(i)) {
                document
                    .getElementById('table__body')
                    .innerHTML += `
                <tr>
                      <td class="product__name">${this.name}</td>
                      <td class="varnish">${datas[1]}</td>
                      <td class="price">${this.price / 100}€</td>
                      <td class="quantity"><button class="quantity__control quantity__minus"><i class="fas fa-minus"></i></button><span class="quantityCell" id="quantityCell">${datas[0]}</span><button class="quantity__control quantity__plus"><i class="fas fa-plus"></i></button></td>
                      <td class="total">${this.price * datas[0] / 100}€</td>
                </tr>
                `;
            }
        }
    }

    //This method reset cart and enforce page reloading
    cleanCart() {
        localStorage.clear();
        location.reload();
}

}
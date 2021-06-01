//Product class operates construction of objects from a data list properties

class Product {

    constructor(productsDatas) {
        this.id = productsDatas._id;
        this.name = productsDatas.name;
        this.price = productsDatas.price;
        this.description = productsDatas.description;
        this.imageUrl = productsDatas.url;
    }

    displayAllProducts(params){
        let container = `<div class="products__container">
                            <span class="hero invisible"><i class="fas fa-meteor"></i> Notre dernier arrivé!</span>
                            <figure>
                                <a href="./public/html/single_product.html?id=${params._id}" title="Voir les détails de ${params.name}">
                                    <img src=${params.imageUrl} alt="${params.name}" />
                                </a>
                                <figcaption><h3>${params.name}</h3></figcaption>
                            </figure>
                             <button onclick="window.location.href = '../html/single_product.html?id=${params._id}';"><i class="fas fa-plus-square"></i>Voir plus</button>
                        </div>`;

        return container;
    }

    displaySingleProduct(params) {
        let container = `<figure>
            <a href="#" title="Voir les détail de ${params.name}">
                <img src="${params.imageUrl}" alt="Voir les détails de ${params.name}">
            </a>
            <figcaption>
                <div class="single-product__headings">
                    <h3>${params.name}</h3>
                    <p class="single-product--price">
                        ${params.price}
                    </p>
                </div>
                <hr>
                <h4>Description :</h4>
                <p class="single-product--description">
                    ${params.description}
                </p>
                <form>
                    <label for="varnish"> Vernis :
                        <select id="varnish">
                            <option value="">--Selectionnez une finition--</option>
                            <option value="">Bleu</option>
                            <option value="">Noir</option>
                            <option value="">Jaune</option>
                        </select>
                    </label>
                    <label for="quantity"> Quantité :
                        <select id="quantity">
                            <option value="">--Selectionnez une quantité--</option>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                            <option value="">6</option>
                            <option value="">7</option>
                            <option value="">8</option>
                            <option value="">9</option>
                        </select>
                    </label>
                    <button class="order__controller--send">Ajouter au panier</button>
                </form>
            </figcaption>
        </figure>`;

        return container;
    }

}
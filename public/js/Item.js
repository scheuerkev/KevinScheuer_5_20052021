//Class Item build and set datas to application localStorage

class Item {
    constructor(id, quantity, varnish) {
        this.id = id;
        this.quantity = quantity;
        this.varnish = varnish;
    }

    setQuantity() {
        localStorage.setItem(this.id, this.quantity);
    }



}

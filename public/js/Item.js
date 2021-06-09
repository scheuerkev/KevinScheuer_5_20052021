//Class Item build and set datas to application localStorage

class Item {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    setValues(){
            localStorage.setItem(this.id, this.quantity);
        }


}
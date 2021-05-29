/*La classe Ajax est chargée de construire des objets

*/
class Ajax {

    constructor(url) {
        this.url = url;
    }

    setProducts(){
        fetch(this.url)
                .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
                .then(function(values) {
                for (let value of values ) {

                    let price = value.price/100;

                }
            })
                .catch(function(err) {
                    // Throw error !
                });
    }
}
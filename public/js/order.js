//get currentUrl and the orderId string in URL params
let currentUrl = new URL(window.location.href);
currentOrderId = currentUrl.searchParams.get("orderId");

let orderInfos = document.getElementById('orderInfo');

//if exists, then split it
if (currentOrderId) {
    let orderDatas = currentOrderId.split("?totalPrice=");
    orderInfos.innerHTML = `<p>Merci pour votre commande. <br>
                            Celle-ci porte le numéro ${orderDatas[0]}, pour un montant total de 
                            ${orderDatas[1]}€</p>`;
} else {
    orderInfos.innerHTML = `<p>Procédez à une commande pour retrouver les détails de celle-ci</p>`;
}
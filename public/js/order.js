let currentUrl = new URL(window.location.href);                         //Build a new URL object with current URL for comparision
currentOrderId = currentUrl.searchParams.get("orderId");


let orderInfos = document.getElementById('orderInfo');

if (currentOrderId) {
   let orderDatas =  currentOrderId.split("?totalPrice=");
    orderInfos.innerHTML = `
                        <p>Merci pour votre commande. <br>
                         Celle-ci porte le numéro ${orderDatas[0]}, pour un montant total de 
                   ${orderDatas[1]}</p>    
`;
} else {
    orderInfos.innerHTML = `
                        <p>Procédez à une commande pour retrouver les détails de celle-ci</p>   
`;
}
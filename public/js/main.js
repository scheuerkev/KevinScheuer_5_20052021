const listProducts = document.getElementById('products');
const requete = new Ajax("http://localhost:3000/api/furniture");
requete.setProducts();

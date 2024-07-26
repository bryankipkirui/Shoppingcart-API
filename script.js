

function showProductDetails(productId){
    let url = `https://fakestoreapi.com/products/${productId}`;
    fetch(url)
        .then(response => response.json())
        .then(product => {
            console.log(product);
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.id = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <img src="${product.image}" alt="${product.title}" width="100px" height="100px">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                </div>
                `;
                document.body.appendChild(modal);

              

              let modaldiv = document.getElementById("modal");
              modaldiv.style.display = 'block';

              const closeButton = modal.querySelector('.close-button');

              closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
              });
              modal.addEventListener('click', (event) => {
                if (event.target === modal){
                    document.body.removeChild(modal);
                }     
              });
        })

        .catch(err => {
            console.error(err);
        })
}




let cart = JSON.parse(localStorage.getItem('cart')) || [];

//Ensure cart is always an array

if (!Array.isArray(cart)){
    cart = [];
    
}

// console.log('cart', cart);
// console.log('is cart an array', Array.isArray(cart));


document.addEventListener('DOMContentLoaded',() => {
const productContainer = document.getElementById("products");
 
let url = 'https://fakestoreapi.com/products';

fetch(url)
    .then(data => data.json())
    .then(products => {
        products.forEach(product =>{
            // console.log(product);
            const productElement = document.createElement('div');
            productElement.className = 'product';

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${product.price}</div>
                <button onclick="showProductDetails(${product.id})">View details</button>
                <button class="btn" onclick="addToCart(${product.id},'${product.title}',${product.price})">Add to Cart</button>


               `;

                productContainer.appendChild(productElement);
                updateCartLogo(); //updating cart logo on initial load
        });
    })
    .catch(error => {
        console.error('Error fetching products: ', error);
        productContainer.innerHTML = '<p>Failed to load products</p>';
    })
    
});

/*function addToCart checks using the if-else conditions, if product already exist in the cart, if true it increaments the
the quantity, otherwise it adds  a new product object to cart*/
function addToCart(productId,title,price){
    const existingProduct = cart.find(item => item.id === productId); //

        if (existingProduct) {
            existingProduct.quantity++;
        }
        else{

            cart.push({id: productId, title: title, price: price, quantity: 1});

        }

        //saving cart bck to 'localStorage' and updating cart-logo
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartLogo();
}

/*function updateCartLogo calculates the total number of item in the cart
using reduce()method and updates the content of the cart logo element*/
function updateCartLogo(){
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartLogo = document.getElementById('cartLogo');
    cartLogo.textContent = `${totalItems}`;
}


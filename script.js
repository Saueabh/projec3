document.addEventListener('DOMContentLoaded', () => {
  const products = [  // ✅ Added 'const' here
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart = [];
  const productList = document.getElementById("product-list");
  const cartItemsContainer = document.getElementById("cart-items"); // ✅ Renamed for clarity
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Render products
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>`;
    productList.appendChild(productDiv);
  });

  // Event delegation for add-to-cart buttons
  productList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const productId = parseInt(e.target.getAttribute('data-id')); // ✅ Fixed typo: getAttribue → getAttribute
      const product = products.find(p => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItemsContainer.innerText = ""; // ✅ Clear the container before re-rendering
    let totalPrice = 0;

    if (cart.length>0) {
      emptyCartMessage.classList.add('hidden');
      cartTotal.classList.remove('hidden');

      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement('div'); // ✅ Renamed variable from 'cartItems' to 'cartItem'
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem); // ✅ Append to correct container
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // ✅ Show final price
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`; // ✅ Display correctly
    }
  }

  checkOutBtn.addEventListener('click', () => {
    cart.length = 0;
    alert("Checkout successful");
    renderCart();
  });
});

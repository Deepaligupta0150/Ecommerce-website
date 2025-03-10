let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    const noOfItems = document.querySelector('.noOfItems');
    const totalAmount = document.querySelector('.total');

    cartItemsDiv.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => { // Added index to use in deleteItem
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <h3>${item.name}</h3>
            <div class="cart-detail">
                <div class="mid">
                    <button onclick="decrItem(${index})">-</button>
                    <p>${item.quantity}</p>
                    <button onclick="incrItem(${index})">+</button>
                </div>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="deleteItem(${index})" class="cart-product">D</button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItem);
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    noOfItems.textContent = `${itemCount} items`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getTotal() { // Removed cart parameter as it is global
    let { totalItem, cartTotal } = cart.reduce(
        (total, cartItem) => {
            total.cartTotal += cartItem.price * cartItem.quantity;
            total.totalItem += cartItem.quantity;
            return total;
        },
        { totalItem: 0, cartTotal: 0 }
    );
    const totalItemsHTML = document.querySelector(".noOfItems");
    totalItemsHTML.innerHTML = `${totalItem} items`;
    const totalAmountHTML = document.querySelector(".total");
    totalAmountHTML.innerHTML = `$${cartTotal.toFixed(2)}`;
}

function incrItem(index) {
    if (cart[index]) {
        cart[index].quantity += 1;
    }
    updateCart();
    getTotal();
}

function decrItem(index) {
    if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    updateCart();
    getTotal();
}

function deleteItem(index) {
    cart.splice(index, 1);
    updateCart();
    getTotal();
}

updateCart();
getTotal();
$(document).ready(function () {
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });
});

$(".menu-items a").click(function () {
    $("#checkbox").prop("checked", false);
});
// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find the product container
        const productContainer = this.closest('.best-p1');
        
        // Extract product details
        const productName = productContainer.dataset.name;
        const productPrice = parseFloat(productContainer.dataset.price);
        const productImage = productContainer.querySelector('img').src;
        
        // Create product object
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        
        // Retrieve existing cart or initialize
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Redirect to cart page
        window.location.href = 'cart.html';
    });
});
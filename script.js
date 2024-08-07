
        let cart = [];
        let products = [];

        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                
                products = await response.json();
                updateProductDisplay();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        function showProducts() {
            document.getElementById('products').style.display = 'block';
            document.getElementById('cart').style.display = 'none';
            fetchProducts();
        }

        function showCart() {
            document.getElementById('products').style.display = 'none';
            document.getElementById('cart').style.display = 'block';
            updateCartDisplay();
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingProduct = cart.find(p => p.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCartDisplay();
            updateCartCount();
        }

        function removeFromCart(productId) {
            cart = cart.filter(p => p.id !== productId);
            updateCartDisplay();
            updateCartCount();
        }

        function increaseQuantity(productId) {
            const product = cart.find(p => p.id === productId);
            if (product) {
                product.quantity += 1;
                updateCartDisplay();
            }
        }

        function decreaseQuantity(productId) {
            const product = cart.find(p => p.id === productId);
            if (product) {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    removeFromCart(productId);
                }
                updateCartDisplay();
            }
        }

        function totalPrice() {
            return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        }

        function averagePrice() {
            const total = totalPrice();
            return cart.length > 0 ? total / cart.reduce((count, product) => count + product.quantity, 0) : 0;
        }

        function sortProducts(order) {
            products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
            updateProductDisplay();
        }

        function filterProducts() {
            const maxPrice = parseFloat(document.getElementById('price-filter').value) || Infinity;
            const filteredProducts = products.filter(product => product.price <= maxPrice);
            updateProductDisplay(filteredProducts);
        }

        function clearCart() {
            cart = [];
            updateCartDisplay();
            updateCartCount();
            alert("Your cart is empty");
        }

        function updateProductDisplay(filteredProducts = products) {
            const productsDiv = document.getElementById('product-list');
            productsDiv.innerHTML = `
                ${filteredProducts.map(product => `
                    <div class="product">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-info">
                            <h3>${product.title}</h3>
                            <p>Price: $${product.price.toFixed(2)}</p>
                            <button onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                `).join('')}
            `;
        }

        function updateCartDisplay() {
            const cartDiv = document.getElementById('cart-items');
            cartDiv.innerHTML = `
                <p class="final-price">Total Price: $${totalPrice().toFixed(2)}</p>
                <p class="final-price">Average Price: $${averagePrice().toFixed(2)}</p>
                ${cart.length === 0 ? '<p class="empty">Your cart is empty.</p>' : `
                    <div>
                        ${cart.map(product => `
                            <div class="cart-item">
                                <img src="${product.image}" alt="${product.title}">
                                <div class="cart-item-info">
                                    <h3>${product.title}</h3>
                                    <p>Price: $${product.price.toFixed(2)} x ${product.quantity}</p>
                                    <div class="cart-item-controls">
                                        <button onclick="decreaseQuantity(${product.id})">-</button>
                                        <button onclick="increaseQuantity(${product.id})">+</button>
                                        <button onclick="removeFromCart(${product.id})">Remove</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            `;
        }

        function updateCartCount() {
            const cartCount = cart.length;
            document.getElementById('cart-count').innerText = cartCount > 0 ? `(${cartCount})` : '';
        }

        // Initialize display
        showProducts();
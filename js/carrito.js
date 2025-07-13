<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GameZone | Tienda de Videojuegos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* Variables CSS */
        :root {
            --primary-color: #ff5e00;
            --secondary-color: #2d2d2d;
            --accent-color: #0077ff;
            --light-color: #f8f8f8;
            --dark-color: #1a1a1a;
            --font-main: 'Roboto', sans-serif;
            --font-title: 'Press Start 2P', cursive;
        }

        /* Estilos generales */
        body {
            font-family: var(--font-main);
            color: var(--dark-color);
            line-height: 1.6;
            padding-top: 70px;
        }

        h1, h2, h3 {
            font-family: var(--font-title);
        }

        /* Header */
        .game-header {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://via.placeholder.com/1920x600');
            background-size: cover;
            background-position: center;
            color: white;
            padding-bottom: 50px;
        }

        .navbar {
            background-color: transparent !important;
        }

        .navbar-brand img {
            transition: transform 0.3s;
        }

        .navbar-brand img:hover {
            transform: scale(1.1);
        }

        /* Contador del carrito */
        .cart-icon {
            position: relative;
            display: flex;
            align-items: center;
        }

        .cart-counter {
            position: absolute;
            top: -8px;
            right: -12px;
            background: var(--primary-color);
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        /* Estilos del carrito */
        .cart-container {
            position: fixed;
            top: 0;
            right: -400px;
            width: 380px;
            height: 100%;
            background-color: white;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            transition: right 0.4s ease;
            z-index: 1050;
            overflow-y: auto;
            padding: 20px;
        }

        .cart-open .cart-container {
            right: 0;
        }

        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1040;
            display: none;
        }

        .cart-open .cart-overlay {
            display: block;
        }

        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent-color);
        }

        .cart-item {
            display: flex;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }

        .cart-item img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            margin-right: 15px;
        }

        .cart-item-info {
            flex-grow: 1;
        }

        .cart-item-controls {
            display: flex;
            align-items: center;
            margin-top: 8px;
        }

        .quantity-control {
            display: flex;
            align-items: center;
            margin-right: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 2px 8px;
        }

        .quantity-btn {
            background: none;
            border: none;
            font-size: 16px;
            width: 25px;
            height: 25px;
            cursor: pointer;
        }

        .quantity-control input {
            width: 30px;
            text-align: center;
            border: none;
            background: transparent;
        }

        .cart-remove-btn {
            background: none;
            border: none;
            color: #ff4444;
            cursor: pointer;
            font-size: 18px;
        }

        .cart-totals {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px solid var(--accent-color);
        }

        .cart-total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .cart-actions {
            margin-top: 20px;
            display: flex;
            gap: 10px;
        }

        /* Resto de estilos... (los del documento original) */
        /* ... (mantengo todos los estilos del documento original) ... */
        /* Para este ejemplo, asumiré que el resto de estilos se mantienen igual */
    </style>
</head>
<body>
    <!-- Header con navbar -->
    <header class="game-header">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="index.html" aria-label="GameZone Logo - Inicio">
                    <img src="https://via.placeholder.com/150x50?text=GameZone" alt="GameZone Logo" width="120">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-label="Alternar navegación">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#inicio">Inicio</a></li>
                        <li class="nav-item"><a class="nav-link" href="#productos">Productos</a></li>
                        <li class="nav-item"><a class="nav-link" href="#proximos">Próximos</a></li>
                        <li class="nav-item"><a class="nav-link" href="#reseñas">Reseñas</a></li>
                        <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
                    </ul>

                    <!-- Botón carrito -->
                    <div class="cart-icon ms-3" id="cart-button">
                        <i class="fas fa-shopping-cart fa-lg"></i>
                        <span class="cart-counter">0</span>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Banner -->
        <section id="inicio" class="hero-banner" aria-label="Promoción destacada">
            <div class="container">
                <h1>Bienvenido a GameZone</h1>
                <p>Los mejores juegos al mejor precio, con envío en 24h</p>
                <div class="hero-buttons">
                    <a href="#productos" class="btn btn-primary">Ver Catálogo</a>
                    <a href="#proximos" class="btn btn-outline-light">Próximos Lanzamientos</a>
                </div>
            </div>
        </section>
    </header>

    <div class="cart-overlay" id="cart-overlay"></div>
    <div class="cart-container" id="cart-container">
        <div class="cart-header">
            <h3><i class="fas fa-shopping-cart me-2"></i>Tu Carrito</h3>
            <button class="btn btn-close" id="close-cart"></button>
        </div>
        <div class="cart-items" id="cart-items">
            <!-- Los items se mostrarán aquí dinámicamente -->
            <div class="empty-cart-message text-center py-5" id="empty-cart">
                <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                <p>Tu carrito está vacío</p>
            </div>
        </div>
        <div class="cart-totals" id="cart-totals" style="display: none;">
            <div class="cart-total-row">
                <span>Subtotal:</span>
                <span id="cart-subtotal">$0.00</span>
            </div>
            <div class="cart-total-row">
                <span>Envío:</span>
                <span id="cart-shipping">$0.00</span>
            </div>
            <div class="cart-total-row fw-bold fs-5">
                <span>Total:</span>
                <span id="cart-total">$0.00</span>
            </div>
            <div class="cart-actions">
                <button class="btn btn-outline-secondary" id="continue-shopping">Seguir Comprando</button>
                <button class="btn btn-primary" id="checkout-btn">Finalizar Compra</button>
            </div>
        </div>
    </div>

    <main id="main" class="container">
        <!-- Sección Productos -->
        <section id="productos" class="product-section" aria-labelledby="productos-heading">
            <h2 id="productos-heading">Nuestros Productos Destacados</h2>
            <div class="product-filters mb-4">
                <button class="filter-btn btn btn-outline-primary btn-sm active">Todos</button>
                <button class="filter-btn btn btn-outline-primary btn-sm">PlayStation</button>
                <button class="filter-btn btn btn-outline-primary btn-sm">Xbox</button>
                <button class="filter-btn btn btn-outline-primary btn-sm">Nintendo</button>
                <button class="filter-btn btn btn-outline-primary btn-sm">PC</button>
            </div>
            <div id="products-container" class="products-grid">
                <!-- Los productos se renderizarán con JavaScript aquí -->
            </div>
        </section>

        <!-- Otras secciones del sitio... -->
    </main>

    <script>
        // Datos de productos de ejemplo
        const products = [
            {
                id: 1,
                name: "Elden Ring: Edición Premium",
                price: 59.99,
                oldPrice: 79.99,
                platform: "PS5, Xbox, PC",
                rating: 4.7,
                image: "https://via.placeholder.com/250x350?text=Elden+Ring"
            },
            {
                id: 2,
                name: "The Legend of Zelda: Breath of the Wild",
                price: 55.99,
                oldPrice: 64.99,
                platform: "Nintendo Switch",
                rating: 4.9,
                image: "https://via.placeholder.com/250x350?text=Zelda"
            },
            {
                id: 3,
                name: "God of War: Ragnarök",
                price: 69.99,
                oldPrice: 79.99,
                platform: "PS5",
                rating: 4.8,
                image: "https://via.placeholder.com/250x350?text=God+of+War"
            },
            {
                id: 4,
                name: "Halo Infinite",
                price: 49.99,
                oldPrice: 59.99,
                platform: "Xbox Series X|S",
                rating: 4.2,
                image: "https://via.placeholder.com/250x350?text=Halo+Infinite"
            },
            {
                id: 5,
                name: "Cyberpunk 2077: Phantom Liberty",
                price: 49.99,
                oldPrice: 69.99,
                platform: "PC, PS5, Xbox Series X|S",
                rating: 4.5,
                image: "https://via.placeholder.com/250x350?text=Cyberpunk+2077"
            },
            {
                id: 6,
                name: "Mario Kart 8 Deluxe",
                price: 49.99,
                oldPrice: 59.99,
                platform: "Nintendo Switch",
                rating: 4.7,
                image: "https://via.placeholder.com/250x350?text=Mario+Kart"
            }
        ];

        // Renderizar productos
        function renderProducts() {
            const container = document.getElementById('products-container');
            container.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                const stars = '★★★★★'.slice(0, Math.floor(product.rating)) + 
                              (product.rating % 1 >= 0.5 ? '½' : '');
                
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="platform">${product.platform}</p>
                        <div class="rating">
                            <span class="stars">${stars}</span>
                            <span>${product.rating.toFixed(1)}</span>
                        </div>
                        <p class="price">$${product.price.toFixed(2)} <span class="old-price">$${product.oldPrice.toFixed(2)}</span></p>
                        <button class="btn btn-cart" data-id="${product.id}">
                            Añadir al carrito <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                `;
                
                container.appendChild(productCard);
            });
        }
        
        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            
            // Inicializar módulo del carrito
            initCart();
            
            // Event listeners para botones de añadir al carrito
            document.getElementById('products-container').addEventListener('click', e => {
                if (e.target.classList.contains('btn-cart') || e.target.closest('.btn-cart')) {
                    const button = e.target.closest('.btn-cart');
                    const productId = parseInt(button.dataset.id);
                    const product = products.find(p => p.id === productId);
                    
                    if (product) {
                        addToCart(product);
                        
                        // Mostrar notificación
                        showNotification(`${product.name} añadido al carrito`);
                    }
                }
            });
        });
        
        // Función de notificación temporal
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'alert alert-success notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }
    </script>

    <!-- Archivo carrito.js modular -->
    <script>
        // carrito.js
        
        // Estado del carrito
        let cartItems = [];
        const SHIPPING_COST = 5.99;

        // Referencias del DOM
        let cartContainer, cartItemsEl, cartOverlay, closeCartBtn, cartButton;
        let cartTotalEl, cartSubtotalEl, cartShippingEl;
        let cartCounter, cartTotals, emptyCartMessage;

        // Función para inicializar el módulo del carrito
        function initCart() {
            // Obtener referencias del DOM
            cartContainer = document.getElementById('cart-container');
            cartOverlay = document.getElementById('cart-overlay');
            cartItemsEl = document.getElementById('cart-items');
            closeCartBtn = document.getElementById('close-cart');
            cartButton = document.getElementById('cart-button');
            cartTotalEl = document.getElementById('cart-total');
            cartSubtotalEl = document.getElementById('cart-subtotal');
            cartShippingEl = document.getElementById('cart-shipping');
            cartCounter = document.querySelector('.cart-counter');
            cartTotals = document.getElementById('cart-totals');
            emptyCartMessage = document.getElementById('empty-cart');
            const continueShoppingBtn = document.getElementById('continue-shopping');
            const checkoutBtn = document.getElementById('checkout-btn');

            // Configurar event listeners
            cartButton.addEventListener('click', toggleCart);
            closeCartBtn.addEventListener('click', closeCart);
            cartOverlay.addEventListener('click', closeCart);
            continueShoppingBtn.addEventListener('click', closeCart);
            checkoutBtn.addEventListener('click', checkout);

            // Cargar carrito desde localStorage
            loadCart();

            // Renderizar carrito
            renderCart();
        }

        // Función para abrir/cerrar el carrito
        function toggleCart() {
            document.body.classList.toggle('cart-open');
        }

        function closeCart() {
            document.body.classList.remove('cart-open');
        }

        // Métodos para gestionar el carrito
        /**
         * Agrega un producto al carrito
         * @param {Object} product - Producto a agregar
         */
        function addToCart(product) {
            // Verificar si el producto ya está en el carrito
            const existingItem = cartItems.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    platform: product.platform,
                    quantity: 1
                });
            }
            
            // Actualizar localStorage
            saveCart();
            
            // Renderizar el carrito actualizado
            renderCart();
        }

        /**
         * Elimina un producto del carrito
         * @param {Number} productId - ID del producto a eliminar
         */
        function removeFromCart(productId) {
            cartItems = cartItems.filter(item => item.id !== productId);
            
            // Actualizar localStorage
            saveCart();
            
            // Renderizar el carrito actualizado
            renderCart();
        }

        /**
         * Actualiza la cantidad de un producto en el carrito
         * @param {Number} productId - ID del producto
         * @param {Number} newQuantity - Nueva cantidad
         */
        function updateQuantity(productId, newQuantity) {
            // Convertir a número
            newQuantity = parseInt(newQuantity);
            
            // Validar que sea un número positivo
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
            }
            
            // Buscar el producto y actualizar cantidad
            const item = cartItems.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                
                // Actualizar localStorage
                saveCart();
                
                // Renderizar el carrito actualizado
                renderCart();
            }
        }

        /**
         * Calcula el total del carrito
         * @returns {Object} - Objeto con subtotal, costo de envío y total
         */
        function calculateTotals() {
            const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const shipping = cartItems.length > 0 ? SHIPPING_COST : 0;
            const total = subtotal + shipping;
            
            // Redondear a 2 decimales
            return {
                subtotal: subtotal.toFixed(2),
                shipping: shipping.toFixed(2),
                total: total.toFixed(2)
            };
        }

        /**
         * Guarda el estado del carrito en localStorage
         */
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }

        /**
         * Carga el carrito desde localStorage
         */
        function loadCart() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                cartItems = JSON.parse(cartData);
            }
        }

        /**
         * Renderiza el carrito en la interfaz de usuario
         */
        function renderCart() {
            // Limpiar el contenido actual
            cartItemsEl.innerHTML = '';
            
            if (cartItems.length === 0) {
                // Mostrar mensaje de carrito vacío
                cartTotals.style.display = 'none';
                emptyCartMessage.style.display = 'block';
            } else {
                // Ocultar mensaje de carrito vacío
                emptyCartMessage.style.display = 'none';
                cartTotals.style.display = 'block';
                
                // Renderizar cada ítem
                cartItems.forEach(item => {
                    const cartItemEl = document.createElement('div');
                    cartItemEl.className = 'cart-item';
                    cartItemEl.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.platform}</p>
                            <div class="cart-item-controls">
                                <div class="quantity-control">
                                    <button class="quantity-btn minus" data-id="${item.id}">−</button>
                                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                </div>
                                <div>$${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                        <button class="cart-remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    
                    cartItemsEl.appendChild(cartItemEl);
                });
            }
            
            // Actualizar totales
            const totals = calculateTotals();
            cartSubtotalEl.textContent = `$${totals.subtotal}`;
            cartShippingEl.textContent = `$${totals.shipping}`;
            cartTotalEl.textContent = `$${totals.total}`;
            
            // Actualizar el contador
            const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCounter.textContent = itemCount;
            
            // Añadir event listeners para los controles
            addCartEventListeners();
        }

        // Añadir event listeners a los controles del carrito
        function addCartEventListeners() {
            // Botones para aumentar cantidad
            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.dataset.id);
                    const item = cartItems.find(item => item.id === id);
                    if (item) {
                        updateQuantity(id, item.quantity + 1);
                    }
                });
            });

            // Botones para disminuir cantidad
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.dataset.id);
                    const item = cartItems.find(item => item.id === id);
                    if (item && item.quantity > 1) {
                        updateQuantity(id, item.quantity - 1);
                    }
                });
            });

            // Inputs para cambiar cantidad manualmente
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const id = parseInt(this.dataset.id);
                    const newQuantity = parseInt(this.value);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                        updateQuantity(id, newQuantity);
                    }
                });
            });

            // Botones para eliminar ítem
            document.querySelectorAll('.cart-remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.dataset.id);
                    removeFromCart(id);
                });
            });
        }

        // Proceso de checkout
        function checkout() {
            if (cartItems.length === 0) {
                showNotification('No hay productos en el carrito');
                return;
            }
            
            showNotification('Pedido realizado con éxito!');
            
            // Vaciar el carrito
            cartItems = [];
            saveCart();
            renderCart();
            closeCart();
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Estilos adicionales para mejora visual -->
    <style>
        /* Animación para notificaciones */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 1050;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out, fadeOut 2s ease-in 2s forwards;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }
        
        .btn-cart {
            transition: all 0.3s;
        }
        
        .btn-cart:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .cart-remove-btn {
            transition: transform 0.2s;
        }
        
        .cart-remove-btn:hover {
            transform: scale(1.2);
        }
        
        .quantity-control {
            transition: border-color 0.3s;
        }
        
        .quantity-control:focus-within {
            border-color: var(--accent-color);
        }
    </style>
</body>
</html>

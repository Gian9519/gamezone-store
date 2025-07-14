<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GameZone | Tienda de Videojuegos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
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
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://via.placeholder.com/1920x600?text=GameZone');
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
            background: var(--accent-color);
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

        /* Carrito */
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

        .empty-cart-message {
            text-align: center;
            padding: 40px 0;
            color: #777;
        }

        /* Hero Banner */
        .hero-banner {
            text-align: center;
            padding: 100px 0;
        }

        .hero-banner h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: fadeIn 1.5s;
        }

        /* Sección Productos */
        .product-section {
            padding: 80px 0;
            background: 
                radial-gradient(circle at 10% 20%, rgba(255,94,0,0.05) 0%, rgba(255,94,0,0) 20%),
                radial-gradient(circle at 90% 80%, rgba(0,119,255,0.08) 0%, rgba(0,119,255,0) 20%),
                linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%);
        }

        .section-heading {
            text-align: center;
            margin-bottom: 40px;
            color: var(--secondary-color);
        }

        .product-filters {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 30px;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 20px;
        }

        .product-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .product-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .product-info {
            padding: 20px;
        }

        .product-title {
            font-size: 1.2rem;
            color: var(--dark-color);
            margin-bottom: 10px;
            min-height: 60px;
        }

        .platform {
            background: #f0f0f0;
            color: #555;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 0.9rem;
            display: inline-block;
            margin-bottom: 10px;
            word-break: break-word;
            overflow-wrap: break-word;
        }

        .rating {
            color: gold;
            margin: 10px 0;
            font-size: 0.9rem;
        }

        .price-container {
            display: flex;
            gap: 10px;
            align-items: center;
            margin: 15px 0;
        }

        .price {
            font-weight: bold;
            font-size: 1.3rem;
            color: var(--primary-color);
        }

        .old-price {
            text-decoration: line-through;
            color: #999;
            font-size: 1rem;
        }

        .btn-cart {
            width: 100%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-weight: bold;
        }

        .btn-cart:hover {
            background-color: var(--accent-color);
        }

        .spinner-container {
            display: flex;
            justify-content: center;
            padding: 40px;
        }

        .alert-box {
            text-align: center;
            padding: 20px;
            background: #fff3cd;
            border-radius: 5px;
            margin: 20px auto;
            max-width: 600px;
        }

        .alert-box .btn {
            margin-top: 15px;
        }

        /* Notificaciones */
        .notification {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            text-align: center;
            max-width: 90%;
            animation: slideIn 0.4s forwards, fadeOut 0.5s forwards 2.7s;
            opacity: 0;
        }

        @keyframes slideIn {
            from {
                transform: translateX(-50%) translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }

        /* Formulario errores */
        .error-message {
            color: #e53935;
            font-size: 0.85rem;
            font-weight: 500;
            margin-top: 5px;
            display: block;
        }

        .is-invalid {
            border: 1px solid #e53935 !important;
        }

        /* Misc */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: #333;
            color: white;
            padding: 8px;
            z-index: 100;
        }
        
        .skip-link:focus {
            top: 0;
        }

        .btn-active {
            background-color: var(--primary-color) !important;
            color: white !important;
        }
    </style>
</head>
<body>
    <a class="skip-link" href="#main" tabindex="0">Saltar al contenido principal</a>
    
    <header class="game-header">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="index.html" aria-label="GameZone Logo - Inicio">
                    <img src="https://via.placeholder.com/150?text=GZ" alt="GameZone Logo" width="120">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-label="Alternar navegación">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#inicio">Inicio</a></li>
                        <li class="nav-item"><a class="nav-link" href="#productos">Productos</a></li>
                        <li class="nav-item"><a class="nav-link" href="#proximos">Próximos Lanzamientos</a></li>
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

    <!-- Carrito -->
    <div class="cart-overlay" id="cart-overlay"></div>
    <div class="cart-container" id="cart-container">
        <div class="cart-header">
            <h3><i class="fas fa-shopping-cart me-2"></i>Tu Carrito</h3>
            <button class="btn btn-close" id="close-cart" aria-label="Cerrar carrito"></button>
        </div>
        <div class="cart-items" id="cart-items">
            <div class="empty-cart-message" id="empty-cart">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <h4>Tu carrito está vacío</h4>
                <p>¡Explora nuestros productos y empieza a agregar!</p>
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

    <!-- Contenido principal -->
    <main id="main" class="container">
        <!-- Sección Productos -->
        <section id="productos" class="product-section" aria-labelledby="productos-heading">
            <h2 id="productos-heading" class="section-heading">Nuestros Productos Destacados</h2>
            <div class="product-filters">
                <button class="filter-btn btn btn-outline-primary btn-sm btn-active" data-filter="Todos">Todos</button>
                <button class="filter-btn btn btn-outline-primary btn-sm" data-filter="PlayStation">PlayStation</button>
                <button class="filter-btn btn btn-outline-primary btn-sm" data-filter="Xbox">Xbox</button>
                <button class="filter-btn btn btn-outline-primary btn-sm" data-filter="Nintendo Switch">Nintendo Switch</button>
                <button class="filter-btn btn btn-outline-primary btn-sm" data-filter="PC">PC</button>
            </div>
            <div id="products-container" class="products-grid"></div>
        </section>

        <!-- Próximos Lanzamientos -->
        <section id="proximos" class="py-5" aria-labelledby="proximos-heading">
            <div class="container">
                <h2 id="proximos-heading" class="section-heading">Próximos Lanzamientos</h2>
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/300x400?text=Hades+II" class="card-img-top" alt="Hades II para PlayStation 5">
                            <div class="card-body">
                                <h5 class="card-title">Hades II</h5>
                                <p class="card-text">Plataforma: PlayStation 5, Xbox Series X|S, PC</p>
                                <p class="card-text"><small class="text-muted">Lanzamiento: 3 octubre 2023</small></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/300x400?text=Hollow+Knight" class="card-img-top" alt="Hollow Knight para Nintendo Switch">
                            <div class="card-body">
                                <h5 class="card-title">Hollow Knight: Silksong</h5>
                                <p class="card-text">Plataforma: Nintendo Switch, PC</p>
                                <p class="card-text"><small class="text-muted">Lanzamiento: 15 noviembre 2023</small></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/300x400?text=Star+Wars" class="card-img-top" alt="Star Wars Outlaws para Xbox Series X">
                            <div class="card-body">
                                <h5 class="card-title">Star Wars Outlaws</h5>
                                <p class="card-text">Plataforma: Xbox Series X|S, PlayStation 5, PC</p>
                                <p class="card-text"><small class="text-muted">Lanzamiento: 28 febrero 2024</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contacto -->
        <section id="contacto" class="py-5" aria-labelledby="contacto-heading">
            <div class="container">
                <h2 id="contacto-heading" class="section-heading">Contáctanos</h2>
                <div class="row">
                    <div class="col-md-6 mx-auto">
                        <form id="contact-form" class="contact-form needs-validation" novalidate>
                            <div class="mb-3">
                                <label for="contact-name" class="form-label">Nombre completo</label>
                                <input type="text" id="contact-name" class="form-control" required>
                                <div class="invalid-feedback">Por favor ingrese su nombre</div>
                            </div>
                            <div class="mb-3">
                                <label for="contact-email" class="form-label">Correo electrónico</label>
                                <input type="email" id="contact-email" class="form-control" required>
                                <div class="invalid-feedback">Por favor ingrese un correo válido</div>
                            </div>
                            <div class="mb-3">
                                <label for="contact-message" class="form-label">Tu mensaje</label>
                                <textarea id="contact-message" class="form-control" rows="4" required></textarea>
                                <div class="invalid-feedback">Por favor escriba su mensaje</div>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Enviar Mensaje</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4 text-center">
                    <img src="https://via.placeholder.com/120?text=GZ-Logo" alt="GameZone Logo" class="mb-3">
                    <p>La experiencia gaming más completa desde 2010</p>
                </div>
                <div class="col-md-4 mb-4">
                    <h4>Enlaces rápidos</h4>
                    <ul class="list-unstyled">
                        <li><a href="#inicio" class="text-white text-decoration-none">Inicio</a></li>
                        <li><a href="#productos" class="text-white text-decoration-none">Productos</a></li>
                        <li><a href="#proximos" class="text-white text-decoration-none">Próximos</a></li>
                        <li><a href="#reseñas" class="text-white text-decoration-none">Reseñas</a></li>
                        <li><a href="#contacto" class="text-white text-decoration-none">Contacto</a></li>
                    </ul>
                </div>
                <div class="col-md-4 mb-4">
                    <h4>Suscríbete a nuestro boletín</h4>
                    <form class="mt-3">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Tu correo electrónico" aria-label="Correo electrónico">
                            <button class="btn btn-primary" type="submit">Suscribir</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="border-top pt-3 mt-3 text-center">
                <p>&copy; 2023 GameZone Store SRL. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script>
        // ============== MÓDULO DE PRODUCTOS Y CARRITO ==============
        const App = (function() {
            // Variables globales
            let cart = [];
            let products = [];
            const SHIPPING_COST = 5.99;
            
            // Referencias DOM
            const productsContainer = document.getElementById('products-container');
            const cartContainer = document.getElementById('cart-items');
            const cartOverlay = document.getElementById('cart-overlay');
            const closeCartBtn = document.getElementById('close-cart');
            const cartCounter = document.querySelector('.cart-counter');
            const contactForm = document.getElementById('contact-form');
            const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
            const cartTotalsSection = document.getElementById('cart-totals');
            const cartSubtotalEl = document.getElementById('cart-subtotal');
            const cartShippingEl = document.getElementById('cart-shipping');
            const cartTotalEl = document.getElementById('cart-total');
            const cartButton = document.getElementById('cart-button');
            const emptyCartMessage = document.getElementById('empty-cart');
            const continueShoppingBtn = document.getElementById('continue-shopping');
            const checkoutBtn = document.getElementById('checkout-btn');
            
            // Inicializar
            function init() {
                loadCart();
                fetchProducts();
                setupEventListeners();
            }
            
            // ================== FUNCIONES DE PRODUCTOS ==================
            
            // Consumir API de productos
            function fetchProducts() {
                productsContainer.innerHTML = '<div class="spinner-container"><div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div></div>';
                
                fetch('https://fakestoreapi.com/products')
                    .then(res => res.json())
                    .then(data => {
                        // Transformar datos para videojuegos
                        products = data.map(product => ({
                            id: product.id,
                            title: product.title,
                            price: parseFloat(product.price) * 1.5,
                            image: product.image,
                            system: getRandomPlatform(),
                            rating: {
                                rate: (Math.random() * 1.5 + 3.5).toFixed(1),
                                count: Math.floor(Math.random() * 200) + 50
                            },
                            oldPrice: (parseFloat(product.price) * 1.8).toFixed(2)
                        }));
                        renderProducts(products);
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                        productsContainer.innerHTML = `
                            <div class="alert-box">
                                <p>No se pudieron cargar los productos. Intenta de nuevo más tarde.</p>
                                <button class="btn btn-primary" onclick="App.fetchProducts()">Reintentar</button>
                            </div>
                        `;
                    });
            }
            
            // Obtener plataformas aleatorias
            function getRandomPlatform() {
                const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'];
                return platforms[Math.floor(Math.random() * platforms.length)];
            }
            
            // Renderizar productos en el DOM
            function renderProducts(productsToRender) {
                productsContainer.innerHTML = '';
                
                if (productsToRender.length === 0) {
                    productsContainer.innerHTML = `
                        <div class="alert-box">
                            <p>No se encontraron productos en esta categoría.</p>
                        </div>
                    `;
                    return;
                }
                
                productsToRender.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="Portada de ${product.title}" class="product-img">
                        <div class="product-info">
                            <h3 class="product-title">${product.title}</h3>
                            <p class="platform">${product.system}</p>
                            <div class="rating">
                                ${getStarRating(Number(product.rating.rate))}
                                <span>${product.rating.rate}</span>
                            </div>
                            <div class="price-container">
                                <span class="price">$${product.price.toFixed(2)}</span>
                                <span class="old-price">$${product.oldPrice}</span>
                            </div>
                            <button class="btn btn-cart" data-id="${product.id}" aria-label="Añadir ${product.title} al carrito">
                                Añadir al carrito <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    `;
                    productsContainer.appendChild(productCard);
                });
            }
            
            // Generar clasificación por estrellas
            function getStarRating(rating) {
                const stars = [];
                const fullStars = Math.floor(rating);
                const halfStar = rating - fullStars >= 0.5;
                
                // Estrellas completas
                for (let i = 0; i < fullStars; i++) {
                    stars.push('<i class="fas fa-star"></i>');
                }
                
                // Media estrella si es necesario
                if (halfStar) {
                    stars.push('<i class="fas fa-star-half-alt"></i>');
                }
                
                // Estrellas vacías
                const remaining = 5 - stars.length;
                for (let i = 0; i < remaining; i++) {
                    stars.push('<i class="far fa-star"></i>');
                }
                
                return stars.join('');
            }
            
            // ================== FUNCIONES DEL CARRITO ==================
            
            // Cargar carrito desde localStorage
            function loadCart() {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    try {
                        cart = JSON.parse(savedCart);
                        updateCartCounter();
                    } catch (e) {
                        console.error('Error parsing cart from localStorage:', e);
                        cart = [];
                    }
                }
                renderCart();
            }
            
            // Guardar carrito en localStorage
            function saveCart() {
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCounter();
            }
            
            // Actualizar contador de carrito
            function updateCartCounter() {
                const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
                cartCounter.textContent = totalItems;
            }
            
            // Añadir producto al carrito
            function addToCart(productId) {
                const product = products.find(p => p.id === productId);
                
                if (!product) return;
                
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        system: product.system,
                        quantity: 1
                    });
                }
                
                // Mostrar notificación
                showNotification(`"${product.title}" añadido al carrito`);
                
                // Actualizar y guardar carrito
                saveCart();
                renderCart();
            }
            
            // Eliminar producto del carrito
            function removeFromCart(itemId) {
                cart = cart.filter(item => item.id !== itemId);
                saveCart();
                renderCart();
            }
            
            // Actualizar cantidad
            function updateQuantity(itemId, quantity) {
                const item = cart.find(item => item.id === itemId);
                if (item) {
                    item.quantity = quantity >= 1 ? quantity : 1;
                    saveCart();
                    renderCart();
                }
            }
            
            // Renderizar carrito
            function renderCart() {
                cartContainer.innerHTML = '';
                
                if (cart.length === 0) {
                    cartTotalsSection.style.display = 'none';
                    emptyCartMessage.style.display = 'block';
                    return;
                }
                
                cartTotalsSection.style.display = 'block';
                emptyCartMessage.style.display = 'none';
                
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="Portada de ${item.title}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h4>${item.title}</h4>
                            <p>${item.system}</p>
                            <div class="cart-item-controls">
                                <div class="quantity-control">
                                    <button class="quantity-btn minus" data-id="${item.id}" aria-label="Reducir cantidad">−</button>
                                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}" aria-label="Cantidad">
                                    <button class="quantity-btn plus" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
                                </div>
                                <div>$${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                        <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remover del carrito">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    cartContainer.appendChild(cartItem);
                });
                
                // Calcular y mostrar totales
                const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                const shipping = subtotal > 0 ? SHIPPING_COST : 0;
                const total = subtotal + shipping;
                
                cartSubtotalEl.textContent = '$' + subtotal.toFixed(2);
                cartShippingEl.textContent = '$' + shipping.toFixed(2);
                cartTotalEl.textContent = '$' + total.toFixed(2);
            }
            
            // Filtrar productos por plataforma
            function filterProducts(category) {
                if (category === 'Todos') {
                    renderProducts(products);
                } else {
                    const filteredProducts = products.filter(product => product.system === category);
                    renderProducts(filteredProducts);
                }
            }
            
            // Completar compra
            function checkout() {
                if (cart.length === 0) {
                    showNotification('No hay productos en el carrito');
                    return;
                }
                
                // Vaciar el carrito
                cart = [];
                saveCart();
                renderCart();
                closeCart();
                showNotification('¡Compra completada con éxito! Gracias por tu pedido.');
            }
            
            // ================== VALIDACIÓN / NOTIFICACIONES ==================
            
            // Mostrar notificación
            function showNotification(message) {
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.textContent = message;
                document.body.appendChild(notification);
                
                // Eliminar después de 3 segundos
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
            
            // Validar formulario
            function validateForm() {
                const nameInput = document.getElementById('contact-name');
                const emailInput = document.getElementById('contact-email');
                const messageInput = document.getElementById('contact-message');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                let isValid = true;
                resetFormErrors();
                
                // Validar nombre
                if (!nameInput.value.trim()) {
                    nameInput.classList.add('is-invalid');
                    isValid = false;
                }
                
                // Validar email
                if (!emailInput.value.trim()) {
                    emailInput.classList.add('is-invalid');
                    isValid = false;
                } else if (!emailRegex.test(emailInput.value)) {
                    emailInput.classList.add('is-invalid');
                    isValid = false;
                }
                
                // Validar mensaje
                if (!messageInput.value.trim()) {
                    messageInput.classList.add('is-invalid');
                    isValid = false;
                }
                
                // Si todo es válido
                if (isValid) {
                    contactForm.reset();
                    showNotification('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
                }
                return isValid;
            }
            
            // Resetear errores
            function resetFormErrors() {
                const inputs = [document.getElementById('contact-name'), 
                               document.getElementById('contact-email'),
                               document.getElementById('contact-message')];
                inputs.forEach(input => input.classList.remove('is-invalid'));
            }
            
            // ================== SETUP DE EVENTOS ==================
            
            // Configurar eventos
            function setupEventListeners() {
                // Eventos para añadir al carrito (delegación)
                productsContainer.addEventListener('click', function(e) {
                    if (e.target.closest('.btn-cart')) {
                        const button = e.target.closest('.btn-cart');
                        const productId = parseInt(button.dataset.id);
                        addToCart(productId);
                    }
                });
                
                // Eventos para filtrar productos
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Actualizar clases activas
                        filterButtons.forEach(btn => {
                            btn.classList.remove('btn-active');
                            btn.classList.add('btn-outline-primary');
                        });
                        this.classList.add('btn-active');
                        this.classList.remove('btn-outline-primary');
                        
                        // Filtrar productos
                        const category = this.dataset.filter;
                        filterProducts(category);
                    });
                });
                
                // Eventos para el carrito
                cartButton.addEventListener('click', toggleCart);
                closeCartBtn.addEventListener('click', closeCart);
                cartOverlay.addEventListener('click', closeCart);
                continueShoppingBtn.addEventListener('click', closeCart);
                checkoutBtn.addEventListener('click', checkout);
                
                // Eventos dentro del carrito (delegación)
                cartContainer.addEventListener('click', function(e) {
                    // Eliminar item
                    if (e.target.closest('.cart-remove-btn')) {
                        const button = e.target.closest('.cart-remove-btn');
                        const itemId = parseInt(button.dataset.id);
                        removeFromCart(itemId);
                    }
                    // Aumentar cantidad
                    else if (e.target.classList.contains('plus') || e.target.closest('.plus')) {
                        const button = e.target.closest('.plus');
                        const itemId = parseInt(button.dataset.id);
                        const item = cart.find(item => item.id === itemId);
                        if (item) updateQuantity(itemId, item.quantity + 1);
                    }
                    // Disminuir cantidad
                    else if (e.target.classList.contains('minus') || e.target.closest('.minus')) {
                        const button = e.target.closest('.minus');
                        const itemId = parseInt(button.dataset.id);
                        const item = cart.find(item => item.id === itemId);
                        if (item && item.quantity > 1) updateQuantity(itemId, item.quantity - 1);
                    }
                });
                
                // Actualizar cantidad con el input
                cartContainer.addEventListener('change', function(e) {
                    if (e.target.classList.contains('quantity-input')) {
                        const input = e.target;
                        const itemId = parseInt(input.dataset.id);
                        updateQuantity(itemId, parseInt(input.value) || 1);
                    }
                });
                
                // Evento para el formulario de contacto
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (validateForm()) {
                        // En un caso real, aquí se enviaría el formulario
                    }
                });
            }
            
            // Abrir/cerrar carrito
            function toggleCart() {
                document.body.classList.toggle('cart-open');
            }
            
            // Cerrar carrito
            function closeCart() {
                document.body.classList.remove('cart-open');
            }
            
            // Interface pública
            return {
                init,
                fetchProducts,
                addToCart,
                removeFromCart,
                updateQuantity,
                filterProducts,
                checkout,
                validateForm,
                showNotification
            };
        })();
        
        // Ejecutar aplicación cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', App.init);
    </script>
</body>
</html>

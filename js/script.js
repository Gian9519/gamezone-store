document.addEventListener('DOMContentLoaded', () => {
    // ================== VARIABLES GLOBALES ==================
    const cartButton = document.getElementById('cart-button');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartContainer = document.getElementById('cart-container');
    const closeCartBtn = document.getElementById('close-cart');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const emptyCartBtn = document.getElementById('empty-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotals = document.getElementById('cart-totals');
    const emptyCartMessage = document.getElementById('empty-cart');
    const gamesContainer = document.getElementById('games-container');
    const apiLoading = document.getElementById('api-loading');
    
    // Variables de formulario
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm ? document.getElementById('submit-button') : null;
    const submitBtnText = submitButton ? document.querySelector('.submit-btn-text') : null;
    const sendingMessage = document.getElementById('sending-message');
    const formMessages = document.getElementById('form-messages');
    
    // ================== FUNCIONES DEL CARRITO ==================
    // Cargar carrito desde localStorage
    function loadCartFromStorage() {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        if(savedCart.length > 0) {
            cartItemsContainer.innerHTML = '';
            savedCart.forEach(item => {
                const cartProduct = createCartItem(item);
                cartItemsContainer.prepend(cartProduct);
                addCartItemEvents(cartProduct);
            });
            updateCartUI();
        }
    }
    
    // Crear elemento de carrito
    function createCartItem(item) {
        const cartProduct = document.createElement('div');
        cartProduct.className = 'cart-item';
        cartProduct.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <div>
                    <h5 class="cart-item-title">${item.title}</h5>
                    <p class="cart-item-platform">${item.platform}</p>
                </div>
                <div class="cart-item-price fw-bold text-primary">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button class="quantity-btn">+</button>
                    </div>
                    <button class="cart-remove-btn" aria-label="Eliminar"><i class="fas fa-trash-alt"></i></button>
                    </div>
            </div>
        `;
        return cartProduct;
    }
    
    // Añadir eventos a elementos del carrito
function addCartItemEvents(element) {
    // Eventos para botones de cantidad
    const quantityBtns = element.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.closest('.quantity-control').querySelector('input');
            let value = parseInt(input.value);

            if (this.textContent === '+') {
                input.value = value + 1;
            } else if (value > 1) {
                input.value = value - 1;
            }

            updateCartUI();
        });
    });

    // Evento para botón de eliminar
    const removeBtn = element.querySelector('.cart-remove-btn');
    removeBtn.addEventListener('click', function () {
        element.remove();
        updateCartUI();
    });

    // Seguridad extra: evitar edición manual del input
    const qtyInput = element.querySelector('.quantity-control input');
    if (qtyInput) {
        qtyInput.setAttribute('readonly', true);
        qtyInput.setAttribute('tabindex', '-1');
        qtyInput.style.cursor = 'default';
    }
}
    
    // Guardar carrito en localStorage
    function saveCartToStorage() {
        const items = cartItemsContainer.querySelectorAll('.cart-item');
        if(items.length === 0) return;
        
        const cartItemsToSave = [];
        items.forEach(item => {
            cartItemsToSave.push({
                title: item.querySelector('.cart-item-title').textContent,
                platform: item.querySelector('.cart-item-platform').textContent,
                price: parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', '')),
                image: item.querySelector('.cart-item-img').src,
                quantity: parseInt(item.querySelector('input').value)
            });
        });
        
        localStorage.setItem('cart', JSON.stringify(cartItemsToSave));
    }
    
    // Actualizar interfaz del carrito
    function updateCartUI() {
        const items = cartItemsContainer.querySelectorAll('.cart-item');
        const cartCounter = document.querySelector('.cart-counter');
        
        if (items.length === 0) {
            emptyCartMessage.style.display = 'flex';
            cartTotals.style.display = 'none';
            cartCounter.textContent = '0';
            localStorage.removeItem('cart');
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        cartTotals.style.display = 'block';
        cartCounter.textContent = items.length.toString();
        
        let subtotal = 0;
        items.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent.replace('$', '');
            const quantity = parseInt(item.querySelector('input').value);
            const price = parseFloat(priceText);
            subtotal += price * quantity;
        });
        
        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cart-shipping').textContent = `$0.00`;
        document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
        
        saveCartToStorage();
    }
    
    // Abrir/Cerrar carrito
    function openCart() {
        document.body.classList.add('cart-open');
    }
    
    function closeCart() {
        document.body.classList.remove('cart-open');
    }
    
    // Función pública para añadir productos al carrito
    window.addToCart = function(product) {
        const { title, platform, price, image } = product;
        const newItem = {
            title,
            platform,
            price: parseFloat(price),
            image: image,
            quantity: 1
        };
        
        const cartProduct = createCartItem(newItem);
        cartItemsContainer.prepend(cartProduct);
        addCartItemEvents(cartProduct);
        updateCartUI();
        openCart();
        
        // Notificación visual
        showNotification(`${title} añadido al carrito`);
    };
    
    // Mostrar notificación
    function showNotification(message) {
        const toast = document.createElement('div');
        toast.classList.add('position-fixed', 'bottom-0', 'end-0', 'p-3');
        toast.style.zIndex = '1050';
        toast.innerHTML = `
            <div class="toast align-items-center text-white bg-success border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-check-circle me-2"></i> ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    
    // ================== API DE JUEGOS (RAWG) ==================
    // Obtener juegos desde API
    function fetchGames() {
        apiLoading.querySelector('.spinner-border').style.display = 'block';
        
        const API_KEY = '41d36e4ceece409ca3e8d65e8e752729'; 
        const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`;
        
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                apiLoading.querySelector('.spinner-border').style.display = 'none';
                apiLoading.innerText = '';
                renderGames(data.results);
            })
            .catch(error => {
                console.error('Error fetching games:', error);
                apiLoading.querySelector('.spinner-border').style.display = 'none';
                apiLoading.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error al cargar juegos. Mostrando catálogo de respaldo...
                    </div>
                `;
                renderGames(getBackupGames());
            });
    }
    
    // Renderizar juegos en el DOM
    function renderGames(games) {
        gamesContainer.innerHTML = '';
        
        games.forEach(game => {
            const platforms = [];
            game.platforms.forEach(p => {
                platforms.push(p.platform.name);
            });
            
            // Precios aleatorios
            const priceValue = (Math.floor(Math.random() * 50) + 10).toFixed(2);
            
            // Crear tarjeta de producto
            const card = document.createElement('div');
            card.className = 'col-md-4 col-sm-6 mb-4';
            card.innerHTML = `
                <div class="card product-card h-100">
                    <img src="${game.background_image || 'https://via.placeholder.com/400x225?text=Juego'}" 
                         alt="${game.name}" 
                         class="card-img-top">
                    <div class="card-body">
                        <div class="product-info">
                            <h3>${game.name}</h3>
                            <div class="platform">${platforms.join(', ')}</div>
                            <div class="price">$${priceValue} <span class="badge bg-success ms-2">Destacado</span></div>
                            <button class="btn btn-primary w-100 mt-2">Añadir al carrito</button>
                        </div>

                    </div>
                </div>
            `;
            
            // Evento para añadir al carrito
            const button = card.querySelector('button');
            button.addEventListener('click', () => {
                window.addToCart({
                    title: game.name,
                    platform: platforms.join(', '),
                    price: priceValue,
                    image: game.background_image || 'https://via.placeholder.com/400x225?text=Juego'
                });
            });
            
            gamesContainer.appendChild(card);
        });
    }
    
    // Juegos de respaldo
    function getBackupGames() {
        return [
            {
                id: 5100,
                name: "The Witcher 3: Wild Hunt",
                background_image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png",
                platforms: [
                    { platform: { name: "PlayStation 4" } },
                    { platform: { name: "Xbox One" } },
                    { platform: { name: "PC" } }
                ]
            },
            {
                id: 1890,
                name: "Elden Ring",
                background_image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w0w.png",
                platforms: [
                    { platform: { name: "PlayStation 5" } },
                    { platform: { name: "Xbox Series X|S" } },
                    { platform: { name: "PC" } }
                ]
            },
            {
                id: 2452,
                name: "Red Dead Redemption 2",
                background_image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.png",
                platforms: [
                    { platform: { name: "PlayStation 4" } },
                    { platform: { name: "Xbox One" } },
                    { platform: { name: "PC" } }
                ]
            }
        ];
    }
    
    // ================== FORMULARIO DE CONTACTO ==================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const messageInput = document.getElementById('contact-message');
            let isValid = true;
            
            // Validar nombre
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            // Validar mensaje
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
            }
            
            if (!isValid) return;
            
            // Mostrar spinner de envío
            submitBtnText.style.display = 'none';
            sendingMessage.style.display = 'block';
            submitButton.disabled = true;
            
            // Enviar a Formspree
            const formData = new FormData(this);
            fetch('https://formspree.io/f/mwpodngv', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                // Restaurar botón
                submitBtnText.style.display = 'inline';
                sendingMessage.style.display = 'none';
                submitButton.disabled = false;
                
                if (response.ok) {
                    // Mensaje de éxito
                    formMessages.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="fas fa-check-circle me-2"></i>¡Mensaje enviado con éxito! Te responderemos en breve.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    `;
                    contactForm.reset();
                } else {
                    // Error de servidor
                    response.json().then(data => {
                        formMessages.innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <i class="fas fa-exclamation-triangle me-2"></i>Error: ${data.error || 'Ocurrió un problema'}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        `;
                    });
                }
            })
            .catch(error => {
                // Error de conexión
                formMessages.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <i class="fas fa-exclamation-triangle me-2"></i>Error de conexión. Intente nuevamente.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                
                // Restaurar botón
                submitBtnText.style.display = 'inline';
                sendingMessage.style.display = 'none';
                submitButton.disabled = false;
            });
        });
    }
    
    // ================== MANEJADORES DE EVENTOS ==================
    // Eventos de carrito
    if (cartButton) cartButton.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCart);
        
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', () => {
            closeCart();
            document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showNotification('¡Compra exitosa! Se ha procesado tu pedido.');
            cartItemsContainer.innerHTML = '';
            updateCartUI();
            closeCart();
        });
    }
    
    // ================== INICIALIZACIÓN ==================
    // Cargar carrito al iniciar
    loadCartFromStorage();
    
    // Cargar juegos desde la API
    fetchGames();
});

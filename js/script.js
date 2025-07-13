// script.js

// Variables globales
let cart = [];
let products = [];
const productsContainer = document.getElementById('products-container');
const cartCounter = document.querySelector('.cart-counter');
const contactForm = document.getElementById('contact-form');
const filterButtons = document.querySelectorAll('.filter-btn');

// Función principal que se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    loadCart();
    
    // Consumir API de productos
    fetchProducts();
    
    // Configurar eventos
    setupEventListeners();
});

// ================== FUNCIONES DE LA API ==================
function fetchProducts() {
    // Usamos la API de FakeStoreAPI para simular una tienda de juegos
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            // Transformamos los datos para que parezcan productos de videojuegos
            const gamingProducts = data.map(product => ({
                ...product,
                category: "Videojuegos",
                system: getRandomPlatform(),
                rating: { 
                    rate: (Math.random() * 1.5 + 3.5).toFixed(1), // Rating entre 3.5 y 5
                    count: Math.floor(Math.random() * 200) + 50
                },
                oldPrice: (Number(product.price) * 1.3).toFixed(2) // Precio antiguo +30%
            }));
            
            products = gamingProducts;
            renderProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            // Mostrar mensaje de error en caso de fallo
            productsContainer.innerHTML = `
                <div class="alert alert-warning w-100 text-center">
                    <p>No se pudieron cargar los productos. Intenta de nuevo más tarde.</p>
                    <button class="btn btn-primary mt-2" onclick="fetchProducts()">Reintentar</button>
                </div>
            `;
        });
}

// Función auxiliar para obtener plataformas aleatorias
function getRandomPlatform() {
    const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'];
    return platforms[Math.floor(Math.random() * platforms.length)];
}

// Renderizar productos en el DOM
function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="platform">${product.system}</p>
                <div class="rating">
                    ${getStarRating(Number(product.rating.rate))}
                    <span>${product.rating.rate}</span>
                </div>
                <p class="price">$${product.price} <span class="old-price">$${product.oldPrice}</span></p>
                <button class="btn btn-cart" data-id="${product.id}">
                    Añadir al carrito <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Función auxiliar para generar las estrellas
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
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounter.textContent = totalItems;
}

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
            quantity: 1
        });
    }
    
    // Mostrar notificación
    showNotification(`${product.title} añadido al carrito`);
    
    // Actualizar y guardar carrito
    saveCart();
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.add('slide-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ================== VALIDACIÓN DEL FORMULARIO ==================
function validateForm(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;
    resetFormErrors();
    
    // Validar nombre
    if (!nameInput.value.trim()) {
        showFormError(nameInput, 'Por favor ingrese su nombre');
        isValid = false;
    }
    
    // Validar email
    if (!emailInput.value.trim()) {
        showFormError(emailInput, 'Por favor ingrese su correo electrónico');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        showFormError(emailInput, 'Por favor ingrese un correo válido');
        isValid = false;
    }
    
    // Validar mensaje
    if (!messageInput.value.trim()) {
        showFormError(messageInput, 'Por favor escriba su mensaje');
        isValid = false;
    }
    
    // Si todo es válido, mostrar mensaje de éxito y resetear el formulario
    if (isValid) {
        showNotification('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
        contactForm.reset();
        // Aquí normalmente se enviaría el formulario al servidor
    }
}

// Mostrar errores en el formulario
function showFormError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector('.error-message');
    
    if (!error) {
        error = document.createElement('p');
        error.className = 'error-message';
        formGroup.appendChild(error);
    }
    
    error.textContent = message;
    input.classList.add('is-invalid');
}

// Resetear errores del formulario
function resetFormErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
}

// ================== SETUP DE EVENTOS ==================
function setupEventListeners() {
    // Eventos para añadir al carrito
    productsContainer.addEventListener('click', function(e) {
        if (e.target.closest('.btn-cart')) {
            const button = e.target.closest('.btn-cart');
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        }
    });
    
    // Evento para el formulario de contacto
    contactForm.addEventListener('submit', validateForm);
    
    // Eventos para filtrar productos
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase activa al botón seleccionado
            this.classList.add('active');
            
            const category = this.textContent;
            
            if (category === 'Todos') {
                renderProducts(products);
            } else {
                const filteredProducts = products.filter(
                    product => product.system.includes(category)
                );
                renderProducts(filteredProducts);
            }
        });
    });
}
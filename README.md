# 🎮 GameZone Store - E-commerce de Videojuegos

![Banner](https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)

**GameZone Store** es una tienda de videojuegos completa que combina diseño moderno con funcionalidades avanzadas de e-commerce. Consume datos en tiempo real desde una API externa y ofrece un sistema de carrito con persistencia local.

---

## 🌟 Características Implementadas

### 🛒 Sistema de Carrito
- Añadir productos con notificaciones inmediatas
- Persistencia en localStorage
- Gestión de cantidades
- Cálculo dinámico de totales

### 🔌 Integraciones
- **[RAWG API](https://api.rawg.io/docs/)** para catálogo dinámico
- **Formspree** para formularios funcionales
- Backup data para fallos de conexión

### 🖥️ Interfaz de Usuario
- Diseño responsive con Bootstrap 5
- Tipografía gaming con Google Fonts
- Animaciones y efectos visuales
- Optimización avanzada de imágenes

### 🔍 SEO y Accesibilidad
- Metatags optimizados
- Atributos alt descriptivos
- Navegación por teclado
- Total responsividad

---

## 🛠️ Stack Tecnológico
- **HTML5** - Estructura semántica
- **CSS3** - Variables personalizadas
- **JavaScript ES6+** - Lógica interactiva
- **Bootstrap 5** - Componentes UI

## 🏗️ Estructura de Proyecto
```
gamezone-store/
├── index.html          # Página principal
├── README.md           # Documentación
├── styles.css          # Estilos globales
└── script.js           # Lógica de la aplicación
```

---

## 🚀 Instalación y Uso
1. Clona el repositorio:
```bash
git clone https://github.com/Gian9519/gamezone-store.git
cd gamezone-store
```

2. Abre `index.html` en tu navegador

> **Nota:** No requiere dependencias externas

---

## 🌐 Demo Online
**URL pública:**  
[https://gian9519.github.io/gamezone-store](https://gian9519.github.io/gamezone-store)

---

## ✅ Funcionalidades Clave
1. **Catálogo de Productos:**
   - Fetch API a RAWG
   - Filtros por plataforma
   - Cards responsivas

2. **Carrito de Compras:**
   - Persistencia en localStorage
   - Edición en tiempo real
   - Simulación de compra

3. **Formulario de Contacto:**
   - Validación integrada
   - Envío via Formspree
   - Estados de carga visuales

---

## 🔍 Ejemplos de Código
```javascript
// API RAWG Games
const API_KEY = '41d36e4ceece409ca3e8d65e8e752729';
fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
  .then(response => response.json())
  .then(renderGames);
```

```javascript
// Persistencia del carrito
function saveCart() {
  const items = [...cartItemsContainer.children];
  const cartData = items.map(item => ({
    title: item.querySelector('.cart-item-title').textContent,
    price: parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''))
  }));
  localStorage.setItem('cart', JSON.stringify(cartData));
}
```

---

## 🌟 Próximos Desarrollos
- Sistema de búsqueda
- Filtros avanzados
- Login de usuarios
- Historial de compras

---

## 🤝 Contribuir
1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

**Desarrollado por [Gianluca Pippolo](https://github.com/Gian9519)**

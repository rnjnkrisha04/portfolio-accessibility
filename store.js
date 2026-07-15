document.addEventListener('DOMContentLoaded', () => {
    // 1. Modular Data Layer: Product Catalog Data Object
    const catalogData = {
        storeName: "Digital Tech & Accessibility Hub",
        products: [
            { id: 1, name: "Signova Premium Portal", category: "Software", price: 2999, description: "Real-time AI sign language translation API integration module.", image: "💻" },
            { id: 2, name: "Accessible UI Components", category: "Development", price: 1499, description: "Fully keyboard-navigable, WCAG-compliant structural boilerplate templates.", image: "🎨" },
            { id: 3, name: "Cinematic Media Presets", category: "Creative", price: 999, description: "High-end, production-ready visual asset parameters for modern digital storytelling.", image: "🎬" }
        ]
    };

    const storeContainer = document.getElementById('store-app-container');
    
    // 2. Client-Side Routing Logic Implementation
    const initRouter = () => {
        const handleRoute = () => {
            const hash = window.location.hash || '#all';
            renderCatalog(hash.replace('#', ''));
        };

        window.addEventListener('hashchange', handleRoute);
        handleRoute(); // Run initially
    };

    // 3. Dynamic Rendering Layer
    const renderCatalog = (filterCategory = 'all') => {
        if (!storeContainer) return;

        const filteredProducts = filterCategory === 'all' 
            ? catalogData.products 
            : catalogData.products.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());

        storeContainer.innerHTML = `
            <div class="store-layout animate-fade">
                <header class="store-sub-header">
                    <h3>${catalogData.storeName}</h3>
                    <nav aria-label="Catalog Filtering Navigation" class="router-nav">
                        <a href="#all" class="route-link ${filterCategory === 'all' ? 'active-route' : ''}">All Products</a>
                        <a href="#software" class="route-link ${filterCategory === 'software' ? 'active-route' : ''}">Software</a>
                        <a href="#development" class="route-link ${filterCategory === 'development' ? 'active-route' : ''}">Development</a>
                        <a href="#creative" class="route-link ${filterCategory === 'creative' ? 'active-route' : ''}">Creative</a>
                    </nav>
                </header>
                <div class="product-grid">
                    ${filteredProducts.map(product => `
                        <article class="product-card" data-id="${product.id}">
                            <div class="product-icon">${product.image}</div>
                            <h4>${product.name}</h4>
                            <span class="product-tag">${product.category}</span>
                            <p>${product.description}</p>
                            <div class="product-footer">
                                <span class="product-price">₹${product.price}</span>
                                <button class="buy-btn" aria-label="Purchase ${product.name}">Acquire License</button>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        `;
    };

    // Initialize Capstone Module
    initRouter();
});

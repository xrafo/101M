document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname; // Obtener la ruta actual

    // Comprobación para la página index.html
    if (currentPage.includes('index.html') || currentPage === '/') {
        const productForm = document.getElementById('product-form');

        if (productForm) {
            // Evento de envío del formulario
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Obtener datos del formulario
                const description = document.getElementById('description').value;
                const price = document.getElementById('price').value;
                const quantity = document.getElementById('quantity').value;


                // Cargar productos almacenados en localStorage
                const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

                // Crear nuevo producto con un ID único
                const product = {
                    id: Date.now(),
                    description,
                    price,
                    quantity
                };

                // Guardar el nuevo producto en localStorage
                storedProducts.push(product);
                localStorage.setItem('products', JSON.stringify(storedProducts));

                // Limpiar formulario y mostrar mensaje
                productForm.reset();
                alert('Producto creado con éxito!');
                window.location.href = 'products.html'; // Redirigir a la lista de productos
            });
        }
    }

    // Comprobación para la página products.html
    if (currentPage.includes('products.html')) {
        const productList = document.getElementById('product-list');
        const noProductsMessage = document.getElementById('no-products');

        // Verificar que los elementos no sean null
        if (!productList || !noProductsMessage) {
            console.error('No se encontraron los elementos necesarios en el DOM en products.html.');
            return;
        }

        // Cargar productos almacenados en localStorage
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        if (storedProducts.length > 0) {
            noProductsMessage.style.display = 'none';
            storedProducts.forEach(product => renderProduct(product));
        }

        // Función para renderizar un producto
        function renderProduct(product) {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.setAttribute('data-id', product.id); // Agregar ID único a cada elemento
            productDiv.innerHTML = `
                <h2>${product.description}</h2>
                <p>Precio: $${product.price}</p>
                <p>Cantidad: ${product.quantity}</p>
                <button class="delete-button">Eliminar</button>
            `;
            productList.appendChild(productDiv);

            // Agregar eventos a los botones de eliminar
            const deleteButton = productDiv.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => deleteProduct(product.id));
        }

        // Función para eliminar un producto
        function deleteProduct(id) {
            const updatedProducts = storedProducts.filter(product => product.id !== id);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            location.reload(); // Recargar la página para mostrar los cambios
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Credenciales de ejemplo
        const validUsername = 'usuario@ejemplo.com';
        const validPassword = 'contraseña123';

        if (username === validUsername && password === validPassword) {
            document.getElementById('message').textContent = '¡Bienvenido!';
            document.getElementById('message').style.color = 'green';
        } else {
            document.getElementById('message').textContent = 'Correo o contraseña incorrectos';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('productForm').addEventListener('submit', function(event) {

        event.preventDefault();

    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

        // Crear una nueva fila para la tabla
        const newRow = document.createElement('tr');

        // Crear las celdas para la fila
        newRow.innerHTML = `
            <td>${description}</td>
            <td>${quantity}</td>
            <td>${price}</td>
            <td class="actions">
                <button onclick="editProduct(this)">Editar</button>
                <button onclick="deleteProduct(this)">Eliminar</button>
            </td>
        `;

        // Añadir la fila a la tabla
        document.getElementById('productList').appendChild(newRow);

        // Limpiar el formulario
        document.getElementById('productForm').reset();
    });
});

// Función para eliminar un producto
function deleteProduct(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

// Función para editar un producto
function editProduct(button) {
    const row = button.parentElement.parentElement;
    const description = row.children[0].textContent;
    const quantity = row.children[1].textContent;
    const price = row.children[2].textContent;

    document.getElementById('description').value = description;
    document.getElementById('quantity').value = quantity;
    document.getElementById('price').value = price;

    // Eliminar la fila actual para que se pueda volver a agregar con los cambios
    row.remove();
}

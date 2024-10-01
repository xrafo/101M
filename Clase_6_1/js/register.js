// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Asignar el evento al formulario después de que todo el DOM esté listo
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const workerName = document.getElementById('workerName').value;
        const workerCategory = document.getElementById('workerCategory').value;

        // Obtener trabajadores existentes de localStorage o crear un array vacío
        let workers = JSON.parse(localStorage.getItem('workers')) || [];

        // Crear nuevo trabajador
        const newWorker = {
            id: Date.now(),  // ID único basado en la marca de tiempo
            name: workerName,
            category: workerCategory
        };

        // Agregar nuevo trabajador al array
        workers.push(newWorker);

        // Guardar en localStorage
        localStorage.setItem('workers', JSON.stringify(workers));

        alert('Trabajador registrado exitosamente');

        // Limpiar el formulario
        document.getElementById('registerForm').reset();
    });
});

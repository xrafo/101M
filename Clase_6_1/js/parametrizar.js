// parametrizar.js

// Cargar trabajadores desde localStorage y mostrar en el <select>
window.addEventListener('DOMContentLoaded', () => {
    const workerSelect = document.getElementById('workerSelect');
    const workers = JSON.parse(localStorage.getItem('workers')) || [];

    workers.forEach(worker => {
        const option = document.createElement('option');
        option.value = worker.id;
        option.textContent = worker.name;
        workerSelect.appendChild(option);
    });

    // Mostrar los costos actuales
    displayCurrentRates();
});

// Guardar el nuevo costo por hora en un arreglo separado (hourRates)
document.getElementById('parametrizationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const workerId = parseInt(document.getElementById('workerSelect').value);
    const workerRate = parseFloat(document.getElementById('workerRate').value);

    // Obtener el arreglo de hourRates o crearlo si no existe
    let hourRates = JSON.parse(localStorage.getItem('hourRates')) || [];

    // Buscar si ya existe una entrada para este trabajador
    const rateEntryIndex = hourRates.findIndex(rate => rate.workerId === workerId);

    if (rateEntryIndex !== -1) {
        // Si ya existe, actualizamos el costo
        hourRates[rateEntryIndex].rate = workerRate;
    } else {
        // Si no existe, lo añadimos al arreglo
        hourRates.push({
            workerId: workerId,
            rate: workerRate
        });
    }

    // Guardar el arreglo de hourRates actualizado en localStorage
    localStorage.setItem('hourRates', JSON.stringify(hourRates));

    alert('Costo actualizado exitosamente');
    document.getElementById('parametrizationForm').reset();

    // Actualizar la lista de costos actuales
    displayCurrentRates();
});

// Función para mostrar los costos actuales en la lista
function displayCurrentRates() {
    const workersList = document.getElementById('workersList');
    workersList.innerHTML = '';  // Limpiar la lista

    const workers = JSON.parse(localStorage.getItem('workers')) || [];
    const hourRates = JSON.parse(localStorage.getItem('hourRates')) || [];

    hourRates.forEach(rate => {
        const worker = workers.find(w => w.id === rate.workerId);
        if (worker) {
            const listItem = document.createElement('li');
            listItem.textContent = `${worker.name} - Costo por hora: $${rate.rate.toFixed(2)}`;
            workersList.appendChild(listItem);
        }
    });
}

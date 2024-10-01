// calculate.js

// Cargar trabajadores desde localStorage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const workerSelect = document.getElementById('workerSelect');
    const workers = JSON.parse(localStorage.getItem('workers')) || [];

    workers.forEach(worker => {
        const option = document.createElement('option');
        option.value = worker.id;
        option.textContent = `${worker.name} (${worker.category})`;
        workerSelect.appendChild(option);
    });
});

document.getElementById('calculateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const workerId = parseInt(document.getElementById('workerSelect').value);
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);

    const hourRates = JSON.parse(localStorage.getItem('hourRates')) || [];
    const rateEntry = hourRates.find(rate => rate.workerId === workerId);

    if (rateEntry) {
        // Si se encuentra el costo, calcular el pago
        const totalPayment = hoursWorked * rateEntry.rate;

        // Mostrar el resultado
        document.getElementById('totalPayment').textContent = `$${totalPayment.toFixed(2)}`;
        document.getElementById('resultSection').classList.remove('hidden');
    } else {
        // Si no se encuentra el costo, mostrar un mensaje de error
        alert('Error: No se ha parametrizado el costo por hora para este trabajador.');
    }
});

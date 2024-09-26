// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const countryInput = document.getElementById('country-name');
    const suggestionsDiv = document.getElementById('suggestions');
    const countryInfoDiv = document.getElementById('country-info');

    let countries = [];

    // Cargar la lista de todos los países al inicio para sugerencias
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countries = data.map(country => ({
                name: country.name.common,
                fullData: country
            }));
        })
        .catch(error => console.error('Error al cargar la lista de países:', error));

    // Filtrar países mientras se escribe en el input
    countryInput.addEventListener('input', () => {
        showSuggestions();
    });

    // Buscar al presionar Enter
    countryInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar que el formulario se envíe
            showAllMatches();
        }
    });

    function showSuggestions() {
        const query = countryInput.value.toLowerCase().trim();
        suggestionsDiv.innerHTML = '';
        countryInfoDiv.innerHTML = '';

        if (query.length < 2) {
            return; // Mostrar sugerencias solo si se escriben al menos 2 letras
        }

        const filteredCountries = countries.filter(country => 
            country.name.toLowerCase().includes(query)
        );

        if (filteredCountries.length === 0) {
            suggestionsDiv.innerHTML = '<div>No se encontraron coincidencias</div>';
            return;
        }

        filteredCountries.forEach(country => {
            const suggestion = document.createElement('div');
            suggestion.textContent = country.name;
            suggestion.addEventListener('click', () => {
                displayCountryInfo(country.fullData);
                countryInput.value = country.name;
                suggestionsDiv.innerHTML = '';
            });
            suggestionsDiv.appendChild(suggestion);
        });
    }

    function showAllMatches() {
        const query = countryInput.value.toLowerCase().trim();
        countryInfoDiv.innerHTML = '';
        suggestionsDiv.innerHTML = '';

        if (query.length < 2) {
            countryInfoDiv.innerHTML = '<div>Por favor, ingresa al menos 2 letras para buscar un país.</div>';
            return;
        }

        const filteredCountries = countries.filter(country => 
            country.name.toLowerCase().includes(query)
        );

        if (filteredCountries.length === 0) {
            countryInfoDiv.innerHTML = '<div>No se encontraron coincidencias para la búsqueda.</div>';
            return;
        }

        filteredCountries.forEach(country => {
            displayCountryInfo(country.fullData);
        });
    }

    function displayCountryInfo(country) {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Región:</strong> ${country.region}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
            <p><strong>Moneda:</strong> ${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})</p>
            <p><strong>Idioma:</strong> ${Object.values(country.languages).join(', ')}</p>
        `;
        countryInfoDiv.appendChild(countryCard);
    }
});

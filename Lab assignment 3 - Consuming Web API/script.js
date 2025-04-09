document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', fetchHolidays);
});

async function fetchHolidays() {
    const countryCode = document.getElementById('countryCode').value.toUpperCase();
    console.log(countryCode)
    const year = document.getElementById('year').value;

    if(!countryCode || !year) {
        alert('Please enter both country code and year');
        return;
    }

    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        if(!response.ok) {
            throw new Error('Failed to fetch holidays');
        }
        const holidays = await response.json();
        displayHolidays(holidays, countryCode);
    }
    catch (error) {
        console.error('Error:', error);
        alert('Error fetching holidays. Please check the country code and year and try again.');
    }
}

function displayHolidays(holidays, countryCode) {
    const tableBody = document.getElementById('holidaysBody');
    tableBody.innerHTML=''; // clear previous results
    
    holidays.forEach(holiday => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = formatDate(holiday.date);

        const nameCell = document.createElement('td');
        nameCell.textContent = holiday.name;  // Fixed: using holiday.name

        const localNameCell = document.createElement('td');
        localNameCell.textContent = holiday.localName;  // Fixed: using holiday.localName

        const countryCell = document.createElement('td');
        countryCell.textContent = countryCode;  // Fixed: using the parameter

        const globalCell = document.createElement('td');
        globalCell.innerHTML = holiday.global ? '✓' : '□';  // Fixed: proper global indicator

        row.appendChild(dateCell);
        row.appendChild(nameCell);
        row.appendChild(localNameCell);
        row.appendChild(countryCell);
        row.appendChild(globalCell);

        tableBody.appendChild(row);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
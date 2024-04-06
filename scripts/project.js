document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount'); // Get input element for amount
    const fromCurrencySelect = document.getElementById('fromCurrency'); // Get select element for from currency
    const toCurrencySelect = document.getElementById('toCurrency'); // Get select element for to currency
    const convertBtn = document.getElementById('convertBtn'); // Get button element for conversion
    const resultDiv = document.getElementById('result'); // Get div element to display result

    // Function to fetch and populate currency options
    async function populateCurrencyOptions() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Fetch currency data from API
            const data = await response.json(); // Convert response to JSON
            const currencies = Object.keys(data.rates); // Extract currencies from response data

            // Clear existing options
            fromCurrencySelect.innerHTML = '';
            toCurrencySelect.innerHTML = '';

            // Add new options
            currencies.forEach(currency => {
                const option1 = new Option(currency, currency); // Create new option for from currency
                const option2 = new Option(currency, currency); // Create new option for to currency
                fromCurrencySelect.appendChild(option1); // Add option to from currency select
                toCurrencySelect.appendChild(option2); // Add option to to currency select
            });
        } catch (error) {
            console.error('Error fetching currency data:', error); // Log error if fetching currency data fails
        }
    }

    // Function to convert currency
    async function convertCurrency() {
        const amount = amountInput.value; // Get amount value from input
        const fromCurrency = fromCurrencySelect.value; // Get selected from currency
        const toCurrency = toCurrencySelect.value; // Get selected to currency

        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`); // Fetch exchange rate data from API
            const data = await response.json(); // Convert response to JSON
            const exchangeRate = data.rates[toCurrency]; // Get exchange rate for selected currencies

            if (exchangeRate) {
                const result = amount * exchangeRate; // Calculate converted amount
                resultDiv.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`; // Display result
            } 
            
            else {
                resultDiv.textContent = 'Error: Conversion not available for selected currencies'; // Display error if conversion is not available
            }
        } 
        catch (error) {
            console.error('Error fetching exchange rate data:', error); // Log error if fetching exchange rate data fails
            resultDiv.textContent = 'Error: Failed to fetch exchange rate data'; // Display error if fetching data fails
        }
    }

    // Event listener for conversion button
    convertBtn.addEventListener('click', convertCurrency);

    // Populate currency options when page loads
    populateCurrencyOptions();
});
document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    function populateCurrencyOptions() {
        const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';

        currencies.forEach(currency => {
            const option1 = new Option(currency, currency);
            const option2 = new Option(currency, currency);
            fromCurrencySelect.appendChild(option1);
            toCurrencySelect.appendChild(option2);
        });
    }

    async function convertCurrency() {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        const exchangeRate = 1.2; 
        const result = amount * exchangeRate;

        resultDiv.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    }

    convertBtn.addEventListener('click', convertCurrency);

    populateCurrencyOptions();
});

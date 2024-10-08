const parseTrades = require('./task-2.js');

function computeExchangeAmount(amount, sourceCurrency, targetCurrency, trades) {
    let exchangeRate = null;

    for (let trade of trades) {
        if (trade.sourceCurrency === sourceCurrency && trade.destinationCurrency === targetCurrency) {
            exchangeRate = trade.destinationQuantity / trade.sourceQuantity;
        } else if (trade.sourceCurrency === targetCurrency && trade.destinationCurrency === sourceCurrency) {
            exchangeRate = trade.sourceQuantity / trade.destinationQuantity;
        }
    }

    if (exchangeRate === null) {
        throw new Error(`No found for ${sourceCurrency} to ${targetCurrency}`);
    }

    return amount * exchangeRate;
}

// Example
const info = {
    amount: 20,
    sourceCurrency: 'ZWD', targetCurrency: 'HKD',
};

const amountInFJD = computeExchangeAmount(...Object.values((info)),  parseTrades('015100HKD400:USD51021300ZWD700000:HKD17064'));

console.log('PART-3', `${info.amount} ${info.sourceCurrency} is worth ${amountInFJD} ${info.targetCurrency}`);

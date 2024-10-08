const sum = require('./helpers');

function parseTrades(tradeString) {
    const trades = [];
    let position = 0;

    while (position < tradeString.length) {
        let trade = {};
        let bodyPosition = 0;

        const payloadLength = parseInt(tradeString.slice(position, position + 3));
        position = sum(position, 3);

        const payloadBody = tradeString.slice(position, sum(position, payloadLength));
        position = sum(position, payloadLength);

        const timestampEnd = payloadBody.search(/[A-Z]/);
        trade.timestamp = parseInt(payloadBody.slice(bodyPosition, timestampEnd));
        bodyPosition = timestampEnd;

        trade.sourceCurrency = payloadBody.slice(bodyPosition, sum(bodyPosition, 3));
        bodyPosition = sum(bodyPosition, 3);

        const sourceQuantityEnd = payloadBody.indexOf(':', bodyPosition);
        trade.sourceQuantity = parseInt(payloadBody.slice(bodyPosition, sourceQuantityEnd));
        bodyPosition = sum(sourceQuantityEnd, 1);

        trade.destinationCurrency = payloadBody.slice(bodyPosition, sum(bodyPosition, 3));
        bodyPosition = sum(bodyPosition, 3);

        trade.destinationQuantity = parseInt(payloadBody.slice(bodyPosition));

        trades.push(trade);
    }

    return trades;
}

// Example
if (require.main === module) {
    console.log('PART-2', parseTrades('015100HKD400:USD51021300ZWD700000:HKD17064'));
}

module.exports = parseTrades;

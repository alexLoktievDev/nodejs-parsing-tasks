const sum = require('./helpers');

function getMessages(input) {
    let messages = [];
    let i = 0;

    while (i < input.length) {
        const length = +input.slice(i, i + 3);
        i = sum(i,3)

        const payload = input.slice(i, i + length);

        messages.push(payload);

        i = i + length;
    }

    return messages;
}

// Example
console.log('PART-1', getMessages('001a002bc0041234'));


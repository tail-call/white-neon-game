export function loadImage(path) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.src = path;

        image.onload = () => {
            resolve(image);
        }
    });
}

export function idiv(dividend, divisor) {
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return [quotient, remainder];
}

export function assert(...conditions) {
    let message = '';
    let errorType = Error;

    const last = conditions[conditions.length - 1];

    if (typeof(last) === 'object') {
        conditions.pop();
        message = last.otherwise;
    } else if (typeof(last) === 'string') {
        conditions.pop();
        message = last;
    }

    let succeeded = conditions.reduce((acc, cond) => acc && cond);

    if (!succeeded) {
        throw new Error(`Assertion failed` + (message ? `: ${message}` : ''));
    }
}

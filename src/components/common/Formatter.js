export function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function scoreNumber(number) {
    return parseFloat(number).toFixed(2);
}

export function keyArrayFromDict(array, key) {
    let keyArray = []

    array.forEach(element => {
        keyArray.push(element[key])
    });

    return keyArray
}
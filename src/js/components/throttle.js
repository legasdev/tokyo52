export function throttle(delay, ...functions) {
    let checker = true;

    return function throttleActive(...arg) {
        if (checker) {
            checker = false;
            setTimeout(() => {
                checker = true;
                functions.forEach(fn => fn(...arg));
            }, delay);
        }
    };
};
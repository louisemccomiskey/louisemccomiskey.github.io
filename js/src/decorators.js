//utilizes a props decorator to add a Backbone-esque hash of properties to the prototype.

export function props(value) {
    return function decorator(target) {
        Object.assign(target.prototype, value);
    }
}
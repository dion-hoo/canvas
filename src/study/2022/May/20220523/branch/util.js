export function Random(min, max) {
    return Math.random() * (max - min + 1) + min;
}

export function degreeToRadian(degree) {
    return (degree * Math.PI) / 180;
}

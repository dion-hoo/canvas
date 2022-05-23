const buttons = document.querySelectorAll('button');
const turbulence = document.querySelector('feTurbulence');
let verticalFrequency = 0.00001;
let horizonalFrequency = 0.00001;

const steps = 30;
const interval = 10;

buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        verticalFrequency = 0.00001;

        for (let i = 0; i < steps; i++) {
            setTimeout(() => {
                verticalFrequency += 0.9;
                horizonalFrequency += 0.0009;
                turbulence.setAttribute('baseFrequency', `${verticalFrequency} ${horizonalFrequency}`);
            }, i * interval);
        }

        setTimeout(() => {
            verticalFrequency = 0;
            horizonalFrequency = 0.2;
            turbulence.setAttribute('baseFrequency', `${verticalFrequency} ${horizonalFrequency}`);
        }, steps * interval);
    });
});

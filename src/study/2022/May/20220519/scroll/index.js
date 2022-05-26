const easing = {
    easeOutCubic: (pos) => {
        return Math.pow(pos - 1, 3) + 1;
    },
    easeOutExpo: (pos) => {
        return 1 - Math.pow(2, -10 * pos);
    },
    easeOutBounce: (pos) => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (pos < 1 / d1) {
            return n1 * pos * pos;
        } else if (pos < 2 / d1) {
            return n1 * (pos -= 1.5 / d1) * pos + 0.75;
        } else if (pos < 2.5 / d1) {
            return n1 * (pos -= 2.25 / d1) * pos + 0.9375;
        } else {
            return n1 * (pos -= 2.625 / d1) * pos + 0.984375;
        }
    },
};
const list = document.querySelector('.options');

class IosSelector {
    constructor(options) {
        this.el = options.el;
        this.source = options.source;
        this.count = options.count - (options.count % 4);
        this.sensitivity = 30;
        this.cancelAnimation = null;
        this.itemAngle = 360 / this.count;
        this.half = 10;
        this.scroll = 0;
        this.mouse = {
            moveY: 0,
            offsetY: 0,
            moveToScroll: 0,
            isDown: false,
        };

        this.init();
    }

    init() {
        this.el.addEventListener('touchstart', this.touchstart.bind(this));
        this.el.addEventListener('touchmove', this.touchmove.bind(this));
        this.el.addEventListener('touchend', this.touchend.bind(this));

        this.el.addEventListener('mousedown', this.touchstart.bind(this));
        this.el.addEventListener('mousemove', this.touchmove.bind(this));
        this.el.addEventListener('mouseup', this.touchend.bind(this));
    }

    touchstart(event) {
        this.mouse.moveY = 0;
        this.mouse.offsetY = event.clientY;
        this.mouse.isDown = true;
        this.stop;
    }

    touchmove(event) {
        if (this.mouse.isDown) {
            this.mouse.moveY = (event.clientY - this.mouse.offsetY) / 45;

            let moveToScroll = this.mouse.moveY + this.scroll;

            this.moveTo(moveToScroll);

            this.mouse.moveToScroll = moveToScroll;
        }
    }

    touchend() {
        this.mouse.isDown = false;
        this.scroll = this.mouse.moveToScroll;
    }

    moveTo(scroll) {
        list.style.transform = `rotateX(${this.itemAngle * scroll}deg)`;

        [...list.children].map((li, index) => {
            const visibleIndex = Math.abs(scroll - index);

            visibleIndex <= this.half ? (li.style.visibility = 'visible') : (li.style.visibility = 'hidden');
        });

        return scroll;
    }

    animateToScroll(initScroll, finalScroll, moveScroll, easingName = 'easeOutExpo') {
        let currnetScroll = 0;

        const tick = () => {
            if (initScroll + currnetScroll < finalScroll) {
                this.scroll = this.moveTo(initScroll + easing[easingName](currnetScroll / moveScroll) * moveScroll);
                this.cancelAnimation = requestAnimationFrame(tick);
            } else {
                this.scroll = this.moveTo(initScroll + moveScroll);
                this.stop;
            }

            currnetScroll += 0.1;
        };
        tick();
    }

    stop() {
        cancelAnimationFrame(this.cancelAnimation);
    }

    select(value) {
        for (let i = 0; i < this.source.length; i++) {
            if (this.source[i].value === value) {
                window.cancelAnimationFrame(this.cancelAnimation);

                const initScroll = this.scroll;
                const finalScroll = i;
                const moveScroll = Math.abs(finalScroll - initScroll);

                this.animateToScroll(initScroll, finalScroll, moveScroll);

                return;
            }
        }
    }
}

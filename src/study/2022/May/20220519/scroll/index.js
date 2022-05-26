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
        this.mouse.offsetY = event.clientY || event.touches[0].clientY;
        this.mouse.isDown = true;
        this.stop;
    }

    touchmove(event) {
        if (this.mouse.isDown) {
            let eventY = event.clientY || event.touches[0].clientY;

            this.mouse.moveY = (this.mouse.offsetY - eventY) / 45;

            let moveToScroll = this.mouse.moveY + this.scroll;

            if (moveToScroll < 0) {
                // 처음일때
                moveToScroll *= 0.3;
            } else if (moveToScroll > this.source.length - 1) {
                // 제일 끝일때
                moveToScroll = this.source.length + (moveToScroll - this.source.length) * 0.3;
            }

            this.mouse.moveToScroll = this.moveTo(moveToScroll);
        }
    }

    touchend() {
        let direction = 0; // 방향

        if (this.mouse.moveToScroll < 0) {
        } else {
        }

        this.mouse.isDown = false;
        this.scroll = this.mouse.moveToScroll;
        this.animateToScroll(8, 20, 12);
    }

    touchToScroll() {
        const initScroll = this.scroll;
        let finalScroll;
        let moveScroll;

        a = initV > 0 ? -this.a : this.a;
        t = Math.abs(initV / a);
        moveScroll = initV * t + (a * t * t) / 2;

        finalScroll = Math.round(this.scroll + moveScroll);
        finalScroll = finalScroll < 0 ? 0 : finalScroll > this.source.length - 1 ? this.source.length - 1 : finalScroll;

        moveScroll = finalScroll - initScroll;
        t = Math.sqrt(Math.abs(moveScroll / a));

        this.animateToScroll(initScroll, finalScroll, t);
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

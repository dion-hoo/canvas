const easing = {
    easeOutCubic: (x) => {
        return 1 - Math.pow(1 - x, 3);
    },
    easeOutExpo: (x) => {
        return 1 - Math.pow(2, -10 * x);
    },
    easeOutBounce: (x) => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    },
    easeInOutElastic: (x) => {
        const c5 = (2 * Math.PI) / 4.5;

        return x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5
            ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
            : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    },
};

class IosSelector {
    constructor(options) {
        this.el = options.el;
        this.source = options.source;
        this.count = options.count - (options.count % 4);
        this.itemAngle = 360 / this.count;
        this.cancelAnimation = null;
        this.half = 7;
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
    }

    touchmove(event) {
        if (this.mouse.isDown) {
            let eventY = event.clientY || event.touches[0].clientY;

            this.mouse.moveY = (this.mouse.offsetY - eventY) / 45;

            let moveToScroll = this.mouse.moveY + this.scroll;

            if (moveToScroll < 0) {
                // 처음일때
                moveToScroll *= 0.1;
            } else if (moveToScroll > this.source.length) {
                // 제일 끝일때
                moveToScroll = this.source.length + (moveToScroll - this.source.length) * 0.1;
            }

            this.mouse.moveToScroll = this.moveTo(moveToScroll);
        }
    }

    touchend() {
        this.mouse.isDown = false;

        const finalScroll = this.mouse.moveToScroll;

        this.scroll = finalScroll;
    }

    touchToScroll(force) {
        let initScroll = this.scroll;
        let finalScroll;
        let moveScroll;

        finalScroll = Math.round(this.scroll + force);
        finalScroll = finalScroll < 0 ? 0 : finalScroll > this.source.length - 1 ? this.source.length - 1 : finalScroll;
        moveScroll = finalScroll - initScroll;

        this.animateToScroll(initScroll, finalScroll, moveScroll);
    }

    moveTo(scroll) {
        const list = this.el.querySelector('.options');

        list.style.transform = `rotateX(${this.itemAngle * scroll}deg)`;

        [...list.children].map((li, index) => {
            const visibleIndex = Math.abs(scroll - index);

            visibleIndex <= this.half ? (li.style.visibility = 'visible') : (li.style.visibility = 'hidden');
        });

        return scroll;
    }

    animateToScroll(initScroll, finalScroll, velocity, easingName = 'easeOutExpo') {
        let scrollLength = finalScroll - initScroll;
        let startTimeStamp = new Date().getTime() / 1000; // second
        // 타임 스탬프 값을 얻는다. 타임스탬프란 현재 시간을 밀리 세컨드 단위로 변환하여 보여주는 것
        // 밀리 세컨드를 반환한다.
        // 1초가 1000ms
        // 1ms = 1 / 1000초
        // 밀리 세컨드로 사용하는 이유는 값을 비교할때 정확한 값을 비교하기 위해서다.
        // 그리고 시, 분,초 로 하게 되면 24시간이 지나면 1로 되고, 60분이 지나면 1로 되어서 계산하기가 힘들다.

        const tick = () => {
            let endTimeStamp = new Date().getTime() / 1000 - startTimeStamp; // 밀리세컨트를 초로 변경해서 1초 2초 3초 이거를 구하기 위해서이다.

            if (endTimeStamp < velocity) {
                this.scroll = this.moveTo(initScroll + easing[easingName](endTimeStamp / velocity) * scrollLength);
                this.cancelAnimation = requestAnimationFrame(tick);
            } else {
                this.scroll = this.moveTo(initScroll + scrollLength);
                this.cancelAnimation = cancelAnimationFrame(tick);
            }
        };
        tick();
    }

    stop() {
        cancelAnimationFrame(this.cancelAnimation);
    }

    select(value) {
        for (let i = 0; i < this.source.length; i++) {
            if (+this.source[i].dataset.value === value) {
                const initScroll = this.scroll;
                const finalScroll = i;
                const moveScroll = Math.abs(finalScroll - initScroll);
                const velocity = moveScroll / 10; // 도달 위치를 10초안에 이동을 해야한다.
                // 그래서 1초에 이동할 속도를 구한다.

                this.animateToScroll(initScroll, finalScroll, velocity);

                return;
            }
        }
    }
}

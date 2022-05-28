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
            finalScroll: 0,
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

        this.mouse.finalScroll = this.scroll;

        this.stop();
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

            this.mouse.finalScroll = this.moveTo(moveToScroll);
        }
    }

    touchend() {
        this.mouse.isDown = false;
        const finalScroll = this.mouse.finalScroll;
        this.scroll = finalScroll;
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

    animateToScroll(initScroll, finalScroll, velocity, easingName = 'easeOutBounce') {
        let scrollLength = finalScroll - initScroll;
        let startTimeStamp = new Date().getTime() / 1000; // second
        // 타임 스탬프 값을 얻는다. 타임스탬프란 현재 시간을 밀리 세컨드 단위로 변환하여 보여주는 것
        // 밀리 세컨드를 반환한다.
        // 1초가 1000ms
        // 1ms = 1 / 1000초
        // 밀리 세컨드로 사용하는 이유는 값을 비교할때 정확한 값을 비교하기 위해서다.
        // 그리고 시, 분,초 로 하게 되면 24시간이 지나면 1로 되고, 60분이 지나면 1로 되어서 계산하기가 힘들다.

        const tick = () => {
            let endTimeStamp = new Date().getTime() / 1000 - startTimeStamp;
            // 밀리세컨트를 뺀다.
            // 쉽게 얘기해서 처음 (startTimeStamp)밀리세컨트에서 endTimeStamp를 계속 빼면서
            // second(초)로 얘기하면 1초, 2초 ,3초 이렇게 지나가는 초를 구하기 위해서이다.

            if (endTimeStamp < velocity) {
                // endTimeStamp / velocity게 하는 이유는
                // endTimeStamp를 지금 second(초)로 바꾸었다.
                // 그리고 velocity 1초당 이동해야할 속도를 구해노았다.

                // 그러면 예를 들어 endTimeStamp = 1s, 2s, 3s 이렇게 시간이 지날때
                // velocity = 지금 날짜를 기준으로(29일) 인덱스 번호로는 28이 들어오고
                // 28까지의 거리는 10초동안 이동하려면 1초에 2.8m/s다.
                // 여기서 endTimeStamp / velocity => 1s / 2.8m/s 이렇게 되고, 같은 's'를 지우면
                // 1 / 2.8m 가 되고 거리를 구할 수가 있다. 그 거리를 easing props값으로 넘기면 된다.
                // easing 공식홈페이지에 보면 props(변수 x)의 범위 0~1사이의 움직임 진척도이기 때문에
                // 시간이 2.8 즉 velocity보다 작을때 까지의 거리만 구해주고, 나머지는 곱하기 이동해야할 거리를 곱해주면
                // 0 ~ 1 사이의 거리에서 * 거리(scrollLength) 하면  0 ~ scrollLength까지의 easing값이 된다!!!
                this.scroll = this.moveTo(initScroll + easing[easingName](endTimeStamp / velocity) * scrollLength);
                this.cancelAnimation = requestAnimationFrame(tick);
            } else {
                this.scroll = this.moveTo(initScroll + scrollLength);
                this.stop();
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

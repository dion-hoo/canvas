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
    easeInOutBack: (x) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        return x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeOutElastic: (x) => {
        const c4 = (2 * Math.PI) / 3;

        return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    },
    easeOutQuart: (x) => {
        return 1 - Math.pow(1 - x, 4);
    },
};

class Rolldate {
    constructor(options) {
        this.el = options.trigger;
        this.source = options.source;
        this.itemAngle = options.angle;

        this.cancelAnimation = null;
        this.half = options.length;

        this.deceleration = 8; // 감속
        this.initDateIndex = options.initDateIndex ?? 0;
        this.scroll = this.initDateIndex;
        this.startDate = options.startDate;
        this.isPicker = options.isPicker ?? false;
        this.isAnimation = options.isAnimation ?? true;

        this.mouse = {
            moveY: 0,
            offsetY: 0,
            endScroll: 0,
            isDown: false,
        };

        const list = this.el.querySelector('.day');
        const target = [...list.children][0];
        const regex = /\D+/gi;
        const style = getComputedStyle(target).height;
        const height = style.replace(regex, '');

        this.height = height;

        this.init();
    }

    init() {
        this.el.addEventListener('touchstart', this.onStart.bind(this));
        this.el.addEventListener('touchmove', this.onMove.bind(this));
        this.el.addEventListener('touchend', this.onEnd.bind(this));

        this.el.addEventListener('mousedown', this.onStart.bind(this));
        this.el.addEventListener('mousemove', this.onMove.bind(this));
        this.el.addEventListener('mouseup', this.onEnd.bind(this));

        this.onSelect(this.startDate);
    }

    onStart(event) {
        const eventY = event.clientY || event.touches[0].clientY;

        this.mouse.offsetY = eventY;
        this.mouse.isDown = true;
        this.mouse.endScroll = this.scroll;

        this.touchData = {
            yArr: [],
        };

        // 처음 눌렀을때의 시간
        this.startTimeStamp = new Date().getTime() / 1000;

        this.stop();
    }

    onMove(event) {
        if (this.mouse.isDown) {
            const eventY = event.clientY || event.touches[0].clientY;

            // time
            this.endTimeStamp = new Date().getTime() / 1000;

            this.mouse.moveY = (this.mouse.offsetY - eventY) / this.height;

            this.touchData.yArr.push([this.mouse.moveY, new Date().getTime() / 1000]);

            let moveToScroll = this.scroll + this.mouse.moveY;

            if (moveToScroll < 0) {
                // 처음일때
                moveToScroll = moveToScroll * 0.3;
            } else if (moveToScroll > this.source.length) {
                // 제일 끝일때
                moveToScroll = this.source.length + (moveToScroll - this.source.length) * 0.2;
            }

            this.mouse.endScroll = this.moveTo(moveToScroll);
        }
    }

    onEnd() {
        this.mouse.isDown = false;
        this.scroll = this.mouse.endScroll;
        let velocity = 0;

        if (this.touchData.yArr.length !== 0) {
            let startTime = this.touchData.yArr[this.touchData.yArr.length - 2][1];
            let endTime = this.touchData.yArr[this.touchData.yArr.length - 1][1];
            let startY = this.touchData.yArr[this.touchData.yArr.length - 2][0];
            let endY = this.touchData.yArr[this.touchData.yArr.length - 1][0];

            // 한번 이동하는 거리 / 얼마만의 시간 = 속력(m/s)
            velocity = (endY - startY) / 3 / (endTime - startTime);
        }

        const MAXSPEED = 10;
        const direction = velocity > 0 ? 1 : -1;
        const v = Math.abs(velocity) > MAXSPEED ? MAXSPEED * direction : velocity;

        // 만약에 시간을 구한다면
        const time = Math.abs(v / this.deceleration); // 속도가 0이 되는 시간을 구한다.
        let distance = v * time + (this.deceleration * time * time) / 2; //제동거리 공식

        // 만약, 시간을 구하지 않고, 속도로 조절을 한다면
        // let distance2 = ((Math.pow(v2) - Math.pow(v)) / 2) * this.deceleration;

        const initScroll = this.scroll;
        let finalScroll = Math.round(this.scroll + distance);
        finalScroll = finalScroll < 0 ? 0 : finalScroll > this.source.length - 1 ? this.source.length - 1 : finalScroll;

        distance = Math.abs(finalScroll - initScroll);
        let t = v === 0 ? 0 : distance / this.deceleration;

        this.animateToScroll(initScroll, finalScroll, t);
    }

    moveTo(scroll) {
        const list = this.el.querySelector('.day');

        list.style.transform = `rotateX(${this.itemAngle * scroll}deg)`;

        [...list.children].map((li, index) => {
            const visibleIndex = Math.abs(scroll - index);

            visibleIndex <= this.half ? (li.style.visibility = 'visible') : (li.style.visibility = 'hidden');
        });

        return scroll;
    }

    animateToScroll(initScroll, finalScroll, time, easingName = 'easeOutQuart') {
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

            if (endTimeStamp < time) {
                // endTimeStamp / velocity게 하는 이유는
                // endTimeStamp를 지금 second(초)로 바꾸었다.
                // 그리고 velocity 1초당 이동해야할 속도를 구해놓았다.

                // 그러면 예를 들어 endTimeStamp = 1s, 2s, 3s 이렇게 시간이 지날때
                // velocity = 지금 날짜를 기준으로(29일) 인덱스 번호로는 28이 들어오고
                // 28까지의 거리는 10초동안 이동하려면 1초에 2.8m/s다.
                // easing 공식홈페이지에 보면 props(변수 x)의 범위 0~1사이의 움직임 진척도이기 때문에
                // 1 * 2.8m 가 아니라 1 / 2.8m 나누어서 '움직임에 대한 진척도를 구하기 위해서다.'
                // 그 거리를 easing props값으로 넘기면 된다.
                // 시간이 2.8 즉 velocity보다 작을때 까지의 거리만 구해주고, 나머지는 곱하기 이동해야할 거리를 곱해주면
                // 0 ~ 1 사이의 거리에서 * 거리(scrollLength) 하면  0 ~ scrollLength까지의 easing값이 된다!!!
                this.scroll = this.moveTo(initScroll + easing[easingName](endTimeStamp / time) * scrollLength);
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

    onChange() {
        return this.scroll;
    }

    onSelect(value) {
        for (let i = 0; i < this.source.length; i++) {
            if (+this.source[i].dataset.value === value) {
                const initScroll = this.scroll;
                const finalScroll = i;
                const moveScroll = Math.abs(finalScroll - initScroll);

                // 최종 목적지에 도달하는 데 걸리는 시간
                // v = s / t , t = s / v;
                const time = moveScroll / this.deceleration;

                this.animateToScroll(initScroll, finalScroll, time);

                break;
            }
        }
    }
}

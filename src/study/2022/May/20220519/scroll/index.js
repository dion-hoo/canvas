const easing = {
    easeOutCubic: function (pos) {
        return Math.pow(pos - 1, 3) + 1;
    },
    easeOutQuart: function (pos) {
        return -(Math.pow(pos - 1, 4) - 1);
    },
};

const list = document.querySelector('.options');

class IosSelector {
    constructor(options) {
        let defaults = {
            el: '', // dom
            type: 'infinite', // infinite 无限滚动，normal 非无限
            count: 20, // 圆环规格，圆环上选项个数，必须设置 4 的倍数
            sensitivity: 0.8, // 灵敏度
            source: [], // 选项 {value: xx, text: xx}
            value: null,
            onChange: null,
        };

        this.options = Object.assign({}, defaults, options);
        this.options.count = this.options.count - (this.options.count % 4);
        Object.assign(this, this.options);

        this.halfCount = this.options.count / 2;
        this.quarterCount = this.options.count / 4;
        this.a = this.options.sensitivity * 30; // 滚动减速度
        this.minV = Math.sqrt(1 / this.a); // 最小初速度
        this.selected = this.source[0];

        this.exceedA = 10; // 超出减速
        this.moveT = 0; // 滚动 tick
        this.moving = false;

        this.elems = {
            el: document.querySelector(this.options.el),
            circleList: null,
            circleItems: null, // list
        };
        this.events = {
            touchstart: null,
            touchmove: null,
            touchend: null,
        };

        this.itemHeight = (this.elems.el.offsetHeight * 3) / this.options.count;
        this.scroll = 0;
        this._init();
    }

    _init() {
        let touchData = {
            startY: 0,
            yArr: [],
        };

        for (let eventName in this.events) {
            this.events[eventName] = ((eventName) => {
                return (e) => {
                    if (this.elems.el.contains(e.target) || e.target === this.elems.el) {
                        e.preventDefault();
                        if (this.source.length) {
                            this['_' + eventName](e, touchData);
                        }
                    }
                };
            })(eventName);
        }

        this.elems.el.addEventListener('touchstart', this.events.touchstart);
        document.addEventListener('mousedown', this.events.touchstart);
        this.elems.el.addEventListener('touchend', this.events.touchend);
        document.addEventListener('mouseup', this.events.touchend);
        if (this.source.length) {
            this.value = this.value !== null ? this.value : this.source[0].value;
            this.select(this.value);
        }
    }

    _touchstart(e, touchData) {
        this.elems.el.addEventListener('touchmove', this.events.touchmove);
        document.addEventListener('mousemove', this.events.touchmove);
        let eventY = e.clientY || e.touches[0].clientY;
        touchData.startY = eventY;
        touchData.yArr = [[eventY, new Date().getTime()]];
        touchData.touchScroll = this.scroll;
        this._stop();
    }

    _touchmove(e, touchData) {
        let eventY = e.clientY || e.touches[0].clientY;
        touchData.yArr.push([eventY, new Date().getTime()]);
        if (touchData.length > 5) {
            touchData.unshift();
        }

        let scrollAdd = (touchData.startY - eventY) / this.itemHeight;
        let moveToScroll = scrollAdd + this.scroll;

        moveToScroll = this._normalizeScroll(moveToScroll);
        touchData.touchScroll = this._moveTo(moveToScroll);
    }

    _touchend(e, touchData) {
        this.elems.el.removeEventListener('touchmove', this.events.touchmove);
        document.removeEventListener('mousemove', this.events.touchmove);

        let v;

        if (touchData.yArr.length === 1) {
            v = 0;
        } else {
            let startTime = touchData.yArr[touchData.yArr.length - 2][1];
            let endTime = touchData.yArr[touchData.yArr.length - 1][1];
            let startY = touchData.yArr[touchData.yArr.length - 2][0];
            let endY = touchData.yArr[touchData.yArr.length - 1][0];

            // 计算速度
            v = (((startY - endY) / this.itemHeight) * 1000) / (endTime - startTime);
            let sign = v > 0 ? 1 : -1;

            v = Math.abs(v) > 30 ? 30 * sign : v;
        }

        this.scroll = touchData.touchScroll;
        this._animateMoveByInitV(v);
    }

    _normalizeScroll(scroll) {
        let normalizedScroll = scroll;

        while (normalizedScroll < 0) {
            normalizedScroll += this.source.length;
        }
        normalizedScroll = normalizedScroll % this.source.length;
        return normalizedScroll;
    }

    _moveTo(scroll) {
        if (this.type === 'infinite') {
            scroll = this._normalizeScroll(scroll);
        }

        list.style.transform = `translate3d(0, 0, 0) rotateX(${30 * scroll}deg)`;

        [...list.children].forEach((itemElem) => {
            if (Math.abs(itemElem.dataset.index - scroll) > this.quarterCount) {
                itemElem.style.visibility = 'hidden';
            } else {
                itemElem.style.visibility = 'visible';
            }
        });
        return scroll;
    }

    async _animateMoveByInitV(initV) {
        let finalScroll;
        let totalScrollLen;
        let a;
        let t;

        a = initV > 0 ? -this.a : this.a;
        t = Math.abs(initV / a);
        totalScrollLen = initV * t + (a * t * t) / 2;
        finalScroll = Math.round(this.scroll + totalScrollLen);
        await this._animateToScroll(this.scroll, finalScroll, t, 'easeOutQuart');

        this._selectByScroll(this.scroll);
    }

    _animateToScroll(initScroll, finalScroll, t, easingName = 'easeOutQuart') {
        if (initScroll === finalScroll || t === 0) {
            this._moveTo(initScroll);
            return;
        }

        let start = new Date().getTime() / 1000;
        let pass = 0;
        let totalScrollLen = finalScroll - initScroll;

        return new Promise((resolve, reject) => {
            this.moving = true;
            let tick = () => {
                pass = new Date().getTime() / 1000 - start;

                if (pass < t) {
                    this.scroll = this._moveTo(initScroll + easing[easingName](pass / t) * totalScrollLen);
                    this.moveT = requestAnimationFrame(tick);
                } else {
                    resolve();
                    this._stop();
                    this.scroll = this._moveTo(initScroll + totalScrollLen);
                }
            };
            tick();
        });
    }

    _stop() {
        this.moving = false;
        cancelAnimationFrame(this.moveT);
    }

    _selectByScroll(scroll) {
        scroll = this._normalizeScroll(scroll) | 0;
        if (scroll > this.source.length - 1) {
            scroll = this.source.length - 1;
            this._moveTo(scroll);
        }
        this._moveTo(scroll);
        this.scroll = scroll;
        this.selected = this.source[scroll];
        this.value = this.selected.value;
        this.onChange && this.onChange(this.selected);
    }

    select(value) {
        for (let i = 0; i < this.source.length; i++) {
            if (this.source[i].value === value) {
                window.cancelAnimationFrame(this.moveT);
                // this.scroll = this._moveTo(i);
                let initScroll = this._normalizeScroll(this.scroll);
                let finalScroll = i;
                let t = Math.sqrt(Math.abs((finalScroll - initScroll) / this.a));
                this._animateToScroll(initScroll, finalScroll, t);
                setTimeout(() => this._selectByScroll(i));
                return;
            }
        }
    }
}

export class Text {
    constructor(str, x, y) {
        this.str = str;

        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 10;
        this.friction = 0.86;

        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        };

        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.onMove.bind(this));
    }

    update() {
        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = this.mouse.radius + this.radius;

        if (dist < minDist) {
            const angle = Math.atan2(dy, dx);
            const tx = this.x + Math.cos(angle) * minDist;
            const ty = this.y + Math.sin(angle) * minDist;

            const ax = tx - this.mouse.x;
            const ay = ty - this.mouse.y;

            this.vx += -1 * ax;
            this.vy += -1 * ay;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.font = '700 40px system-ui';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.str, this.x, this.y);
    }

    onMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
}

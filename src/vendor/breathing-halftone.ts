import Vector from './vector';
import Particle from './particle';

const TAU: number = Math.PI * 2;
const ROOT_2: number = Math.sqrt(2);

const supports: { canvas: boolean; darker: boolean } = { canvas: false, darker: false };

interface ParticleData {
    channel: string;
    parent: BreathingHalftone;
    origin: Vector;
    naturalSize: number;
    friction: number;
}

function insertAfter(elem: HTMLElement, afterElem: HTMLElement): void {
    const parent = afterElem.parentNode;
    const nextElem = afterElem.nextElementSibling;
    if (nextElem) {
        parent.insertBefore(elem, nextElem);
    } else {
        parent.appendChild(elem);
    }
}

function makeCanvasAndCtx() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
}

export class BreathingHalftone {
    private options: any;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private channels: string[];
    private proxyCanvases: { [key: string]: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D } };
    private img: HTMLImageElement;
    private cursors: any = {};
    private particles: Particle[] = [];
    private channelParticles: { [key: string]: Particle[] } = {};
    private imgWidth: number;
    private imgHeight: number;
    private imgData: Uint8ClampedArray;
    private canvasPosition: Vector = new Vector();
    private canvasScale: number;
    private isActive: boolean = false;

    static defaults = {
        dotSize: 1 / 40,
        dotSizeThreshold: 0.05,
        initVelocity: 0.02,
        oscPeriod: 3,
        oscAmplitude: 0.2,
        isAdditive: false,
        isRadial: false,
        channels: ['red', 'green', 'blue'],
        isChannelLens: true,
        friction: 0.06,
        hoverDiameter: 0.3,
        hoverForce: -0.02,
        activeDiameter: 0.6,
        activeForce: 0.01
    };

    constructor(img: HTMLImageElement, options: object = {}) {
        this.options = { ...BreathingHalftone.defaults, ...options };
        this.img = img;
        if (!supports.canvas) return;

        this.create();
    }

    private create() {
        this.isActive = true;

        const canvasAndCtx = makeCanvasAndCtx();
        this.canvas = canvasAndCtx.canvas;
        this.ctx = canvasAndCtx.ctx;
        this.canvas.className = this.img.className;
        insertAfter(this.canvas, this.img);
        this.img.style.visibility = 'hidden';

        this.channels = !this.options.isAdditive && !supports.darker ? ['lum'] : this.options.channels;
        this.proxyCanvases = {};
        for (const channel of this.channels) {
            this.proxyCanvases[channel] = makeCanvasAndCtx();
        }

        this.loadImage();

        this.getCanvasPosition();
        this.addCursor('mouse', { pageX: -1e5, pageY: -1e5 });

        this.bindEvents();
    }

    private getCanvasPosition() {
        const rect = this.canvas.getBoundingClientRect();
        const x = rect.left + window.pageXOffset;
        const y = rect.top + window.pageYOffset;
        this.canvasPosition.set(x, y);
        this.canvasScale = this.canvas.offsetWidth ? this.canvas.offsetWidth / this.canvas.width : 1;
    }

    private loadImage() {
        const src = this.img.getAttribute('data-src') || this.img.src;
        const loadingImg = new Image();
        loadingImg.onload = () => this.onImgLoad();
        loadingImg.src = src;

        if (this.img.src !== src) {
            this.img.src = src;
        }
    }

    private onImgLoad() {
        this.getImgData();
        this.resizeCanvas();
        this.getCanvasPosition();
        this.img.style.display = 'none';
        this.getCanvasPosition();
        this.initParticles();
        this.animate();
    }

    private getImgData() {
        const canvasAndCtx = makeCanvasAndCtx();
        const imgCanvas = canvasAndCtx.canvas;
        const ctx = canvasAndCtx.ctx;
        this.imgWidth = imgCanvas.width = this.img.naturalWidth;
        this.imgHeight = imgCanvas.height = this.img.naturalHeight;
        ctx.drawImage(this.img, 0, 0);
        this.imgData = ctx.getImageData(0, 0, this.imgWidth, this.imgHeight).data;
    }

    private resizeCanvas() {
        const w = this.width = this.img.offsetWidth;
        const h = this.height = this.img.offsetHeight;
        this.diagonal = Math.sqrt(w * w + h * h);
        this.imgScale = w / this.imgWidth;
        this.gridSize = this.options.dotSize * this.diagonal;

        for (const prop in this.proxyCanvases) {
            const proxy = this.proxyCanvases[prop];
            proxy.canvas.width = w;
            proxy.canvas.height = h;
        }
        this.canvas.width = w;
        this.canvas.height = h;
    }

    private initParticles() {
        const getParticlesMethod = this.options.isRadial ? 'getRadialGridParticles' : 'getCartesianGridParticles';

        this.particles = [];
        this.channelParticles = {};

        const angles = { red: 1, green: 2.5, blue: 5, lum: 4 };

        for (const channel of this.channels) {
            const angle = angles[channel];
            const channelParticlesArray = this[getParticlesMethod](channel, angle);
            this.channelParticles[channel] = channelParticlesArray;
            this.particles = this.particles.concat(channelParticlesArray);
        }
    }

    private animate() {
        this.update();
        this.render();
        requestAnimationFrame(this.animate.bind(this));
    }

    private update() {
        for (const particle of this.particles) {
            for (const identifier in this.cursors) {
                const cursor = this.cursors[identifier];
                const cursorState = cursor.isDown ? 'active' : 'hover';
                const forceScale = this.options[cursorState + 'Force'];
                const diameter = this.options[cursorState + 'Diameter'];
                const radius = diameter / 2 * this.diagonal;
                const force = Vector.subtract(particle.position, cursor.position);
                let distanceScale = Math.max(0, radius - force.magnitude) / radius;
                distanceScale = Math.cos(distanceScale * Math.PI) * -0.5 + 0.5;
                force.scale(distanceScale * forceScale);
                particle.applyForce(force);
            }
            particle.update();
        }
    }

    private render() {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = this.options.isAdditive ? 'black' : 'white';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.globalCompositeOperation = this.options.isAdditive ? 'lighter' : 'darker';

        for (const channel of this.channels) {
            this.renderGrid(channel);
        }
    }

    private renderGrid(channel: string) {
        const proxy = this.proxyCanvases[channel];
        proxy.ctx.fillStyle = this.options.isAdditive ? 'black' : 'white';
        proxy.ctx.fillRect(0, 0, this.width, this.height);

        const blend = this.options.isAdditive ? 'additive' : 'subtractive';
        proxy.ctx.fillStyle = channelFillStyles[blend][channel];

        const particles = this.channelParticles[channel];
        for (const particle of particles) {
            particle.render(proxy.ctx);
        }

        this.ctx.drawImage(proxy.canvas, 0, 0);
    }

    private getCartesianGridParticles(channel: string, angle: number) {
        const particles: Particle[] = [];
        const w = this.width;
        const h = this.height;
        const diag = Math.max(w, h) * ROOT_2;

        const gridSize = this.gridSize;
        const cols = Math.ceil(diag / gridSize);
        const rows = Math.ceil(diag / gridSize);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x1 = (col + 0.5) * gridSize;
                let y1 = (row + 0.5) * gridSize;
                x1 -= (diag - w) / 2;
                y1 -= (diag - h) / 2;
                x1 -= w / 2;
                y1 -= h / 2;
                let x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
                let y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);
                x2 += w / 2;
                y2 += h / 2;

                const particle = this.initParticle(channel, x2, y2);
                if (particle) {
                    particles.push(particle);
                }
            }
        }
        return particles;
    }

    private getRadialGridParticles(channel: string, angle: number) {
        const particles: Particle[] = [];
        const w = this.width;
        const h = this.height;
        const diag = Math.max(w, h) * ROOT_2;

        const gridSize = this.gridSize;

        const halfW = w / 2;
        const halfH = h / 2;
        const offset = gridSize;
        const centerX = halfW + Math.cos(angle) * offset;
        const centerY = halfH + Math.sin(angle) * offset;

        const maxLevel = Math.ceil((diag + offset) / gridSize);

        for (let level = 0; level < maxLevel; level++) {
            const max = level * 6 || 1;
            for (let j = 0; j < max; j++) {
                const theta = TAU * j / max + angle;
                const x = centerX + Math.cos(theta) * level * gridSize;
                const y = centerY + Math.sin(theta) * level * gridSize;
                const particle = this.initParticle(channel, x, y);
                if (particle) {
                    particles.push(particle);
                }
            }
        }
        return particles;
    }

    private initParticle(channel: string, x: number, y: number) {
        const pixelChannelValue = this.getPixelChannelValue(x, y, channel);
        if (pixelChannelValue < this.options.dotSizeThreshold) {
            return;
        }

        return new Particle({
            channel,
            parent: this,
            origin: new Vector(x, y),
            naturalSize: this.gridSize * ROOT_2 / 2,
            friction: this.options.friction
        });
    }

    private getPixelChannelValue(x: number, y: number, channel: string) {
        x = Math.round(x / this.imgScale);
        y = Math.round(y / this.imgScale);
        const w = this.imgWidth;
        const h = this.imgHeight;

        if (x < 0 || x > w || y < 0 || y > h) {
            return 0;
        }

        const pixelIndex = (x + y * w) * 4;
        let value;
        if (channel === 'lum') {
            value = this.getPixelLum(pixelIndex);
        } else {
            const index = pixelIndex + channelOffset[channel];
            value = this.imgData[index] / 255;
        }

        value = value || 0;
        if (!this.options.isAdditive) {
            value = 1 - value;
        }

        return value;
    }

    private getPixelLum(pixelIndex: number) {
        const r = this.imgData[pixelIndex + 0] / 255;
        const g = this.imgData[pixelIndex + 1] / 255;
        const b = this.imgData[pixelIndex + 2] / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        return (max + min) / 2;
    }

    private bindEvents() {
        this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('touchstart', this, false);
        window.addEventListener('mousemove', this, false);
        window.addEventListener('touchmove', this, false);
        window.addEventListener('touchend', this, false);
        window.addEventListener('resize', this, false);
    }

    private unbindEvents() {
        this.canvas.removeEventListener('mousedown', this, false);
        this.canvas.removeEventListener('touchstart', this, false);
        window.removeEventListener('mousemove', this, false);
        window.removeEventListener('touchmove', this, false);
        window.removeEventListener('touchend', this, false);
        window.removeEventListener('resize', this, false);
    }

    private handleEvent(event: Event) {
        const method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    }

    private onresize() {
        this.getCanvasPosition();
    }

    private destroy() {
        this.isActive = false;
        this.unbindEvents();

        this.img.style.visibility = '';
        this.img.style.display = '';
        this.canvas.parentNode.removeChild(this.canvas);
    }
}

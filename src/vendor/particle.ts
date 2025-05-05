import Vector from './vector.js';

// ----- constants ----- //
const TAU = Math.PI * 2;

function getNow(): number {
    return Date.now();
}

interface ParticleOptions {
    channel: string;
    origin: Vector;
    parent: {
        options: {
            initVelocity: number;
            oscPeriod: number;
            oscAmplitude: number;
            isChannelLens: boolean;
            friction: number;
            [key: string]: any;
        };
        getPixelChannelValue: (x: number, y: number, channel: string) => number;
    };
    naturalSize: number;
    friction: number;
}

class Particle {
    channel: string;
    origin: Vector;
    parent: ParticleOptions['parent'];
    friction: number;

    position: Vector;
    velocity: Vector;
    acceleration: Vector;

    naturalSize: number;
    size: number;
    sizeVelocity: number;
    oscSize: number;
    initSize: number;
    initSizeVelocity: number;
    oscillationOffset: number;
    oscillationMagnitude: number;
    isVisible: boolean;
    originChannelValue?: number;

    constructor(properties: ParticleOptions) {
        this.channel = properties.channel;
        this.origin = properties.origin;
        this.parent = properties.parent;
        this.friction = properties.friction;

        this.position = Vector.copy(this.origin);
        this.velocity = new Vector();
        this.acceleration = new Vector();

        this.naturalSize = properties.naturalSize;
        this.size = 0;
        this.sizeVelocity = 0;
        this.oscSize = 0;
        this.initSize = 0;
        this.initSizeVelocity =
            (Math.random() * 0.5 + 0.5) * this.parent.options.initVelocity;

        this.oscillationOffset = Math.random() * TAU;
        this.oscillationMagnitude = Math.random();
        this.isVisible = false;
    }

    applyForce(force: Vector): void {
        this.acceleration.add(force);
    }

    update(): void {
        if (!this.isVisible && Math.random() > 0.03) return;
        this.isVisible = true;

        this.applyOriginAttraction();

        this.velocity.add(this.acceleration);
        this.velocity.scale(1 - this.friction);
        this.position.add(this.velocity);
        this.acceleration.set(0, 0);

        this.calculateSize();
    }

    render(ctx: CanvasRenderingContext2D): void {
        let size = this.size * this.oscSize;
        const initSize = Math.cos(this.initSize * TAU / 2) * -0.5 + 0.5;
        size *= initSize;
        size = Math.max(0, size);

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, size, 0, TAU);
        ctx.fill();
        ctx.closePath();
    }

    calculateSize(): void {
        if (this.initSize !== 1) {
            this.initSize += this.initSizeVelocity;
            this.initSize = Math.min(1, this.initSize);
        }

        const targetSize =
            this.naturalSize * this.getChannelValue();

        const sizeAcceleration = (targetSize - this.size) * 0.1;
        this.sizeVelocity += sizeAcceleration;
        this.sizeVelocity *= 1 - 0.3;
        this.size += this.sizeVelocity;

        const now = getNow();
        const opts = this.parent.options;
        let oscSize = (now / (1000 * opts.oscPeriod)) * TAU;
        oscSize = Math.cos(oscSize + this.oscillationOffset);
        oscSize = oscSize * opts.oscAmplitude + 1;
        this.oscSize = oscSize;
    }

    getChannelValue(): number {
        const opts = this.parent.options;
        const position = opts.isChannelLens ? this.position : this.origin;

        if (opts.isChannelLens) {
            return this.parent.getPixelChannelValue(position.x, position.y, this.channel);
        } else {
            if (this.originChannelValue === undefined) {
                this.originChannelValue = this.parent.getPixelChannelValue(position.x, position.y, this.channel);
            }
            return this.originChannelValue;
        }
    }

    applyOriginAttraction(): void {
        const attraction = Vector.subtract(this.position, this.origin);
        attraction.scale(-0.02);
        this.applyForce(attraction);
    }
}

export default Particle;

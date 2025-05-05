import Vector from './vector';
import Particle from './particle';

const TAU: number = Math.PI * 2;
const ROOT_2: number = Math.sqrt(2);

const supports: { canvas: boolean; darker: boolean } = { canvas: false, darker: false };

// Helper function to insert an element after another element
function insertAfter(elem: HTMLElement, afterElem: HTMLElement): void {
    const parent = afterElem.parentNode;
    const nextElem = afterElem.nextElementSibling;
    if (nextElem) {
        parent.insertBefore(elem, nextElem);
    } else {
        parent.appendChild(elem);
    }
}

// Function to create a canvas and context
function makeCanvasAndCtx() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
}

// Function to initialize BreathingHalftone
export function BreathingHalftone(img: HTMLImageElement, options: object = {}): void {
    console.log('BreathingHalftone initialized');

    const defaults = {
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
        activeForce: 0.01,
    };

    const optionsMerged = { ...defaults, ...options };

    if (!supports.canvas) {
        console.log('Canvas not supported');
        return;
    }

    // Create the main canvas and context
    const canvasAndCtx = makeCanvasAndCtx();
    const canvas = canvasAndCtx.canvas;
    const ctx = canvasAndCtx.ctx;

    // Copy over the class name from the image to the canvas
    canvas.className = img.className;

    console.log('Canvas created and class set:', canvas);

    // Insert the canvas after the image
    insertAfter(canvas, img);

    // Hide the original image completely
    img.style.display = 'none'; // Completely hide the image, no visibility hidden

    console.log('Original image hidden:', img);

    // Set the canvas size to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    const channels = !optionsMerged.isAdditive && !supports.darker ? ['lum'] : optionsMerged.channels;

    // Create canvases for each color channel
    const proxyCanvases: { [key: string]: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D } } = {};
    for (const channel of channels) {
        proxyCanvases[channel] = makeCanvasAndCtx();
    }

    // Load the image
    const loadImage = () => {
        console.log('Loading image...');
        const src = img.getAttribute('data-src') || img.src;
        const loadingImg = new Image();
        loadingImg.onload = () => onImgLoad();
        loadingImg.src = src;

        if (img.src !== src) {
            img.src = src;
        }
    };

    const onImgLoad = () => {
        console.log('Image loaded');
        getImgData();
        resizeCanvas();
        getCanvasPosition();
        img.style.display = 'none';
        initParticles();
        animate();
    };

    let imgWidth: number, imgHeight: number, imgData: Uint8ClampedArray;

    const getImgData = () => {
        console.log('Getting image data...');
        const canvasAndCtx = makeCanvasAndCtx();
        const imgCanvas = canvasAndCtx.canvas;
        const ctx = canvasAndCtx.ctx;
        imgWidth = imgCanvas.width = img.naturalWidth;
        imgHeight = imgCanvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        imgData = ctx.getImageData(0, 0, imgWidth, imgHeight).data;
    };

    const resizeCanvas = () => {
        console.log('Resizing canvas...');
        const w = canvas.width = img.offsetWidth;
        const h = canvas.height = img.offsetHeight;
        const diagonal = Math.sqrt(w * w + h * h);
        const imgScale = w / imgWidth;
        const gridSize = optionsMerged.dotSize * diagonal;

        for (const channel in proxyCanvases) {
            const proxy = proxyCanvases[channel];
            proxy.canvas.width = w;
            proxy.canvas.height = h;
        }

        canvas.width = w;
        canvas.height = h;
    };

    const initParticles = () => {
        console.log('Initializing particles...');
        const getParticlesMethod = optionsMerged.isRadial ? 'getRadialGridParticles' : 'getCartesianGridParticles';

        let particles: Particle[] = [];
        let channelParticles: { [key: string]: Particle[] } = {};

        const angles: { [key: string]: number } = { red: 1, green: 2.5, blue: 5, lum: 4 };

        for (const channel of channels) {
            const angle = angles[channel];
            const channelParticlesArray = getParticlesMethod(channel, angle);
            channelParticles[channel] = channelParticlesArray;
            particles = particles.concat(channelParticlesArray);
        }
    };

    const animate = () => {
        update();
        render();
        requestAnimationFrame(animate);
    };

    const update = () => {
        console.log('Updating particles...');
        for (const particle of particles) {
            for (const identifier in cursors) {
                const cursor = cursors[identifier];
                const cursorState = cursor.isDown ? 'active' : 'hover';
                const forceScale = optionsMerged[cursorState + 'Force'];
                const diameter = optionsMerged[cursorState + 'Diameter'];
                const radius = diameter / 2 * diagonal;
                const force = Vector.subtract(particle.position, cursor.position);
                let distanceScale = Math.max(0, radius - force.magnitude) / radius;
                distanceScale = Math.cos(distanceScale * Math.PI) * -0.5 + 0.5;
                force.scale(distanceScale * forceScale);
                particle.applyForce(force);
            }
            particle.update();
        }
    };

    const render = () => {
        console.log('Rendering particles...');
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = optionsMerged.isAdditive ? 'black' : 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = optionsMerged.isAdditive ? 'lighter' : 'darker';

        for (const channel of channels) {
            renderGrid(channel);
        }
    };

    const renderGrid = (channel: string) => {
        console.log('Rendering grid for channel:', channel);
        const proxy = proxyCanvases[channel];
        proxy.ctx.fillStyle = optionsMerged.isAdditive ? 'black' : 'white';
        proxy.ctx.fillRect(0, 0, canvas.width, canvas.height);

        const blend = optionsMerged.isAdditive ? 'additive' : 'subtractive';
        proxy.ctx.fillStyle = channelFillStyles[blend][channel];

        const particles = channelParticles[channel];
        for (const particle of particles) {
            particle.render(proxy.ctx);
        }

        ctx.drawImage(proxy.canvas, 0, 0);
    };

    const getCartesianGridParticles = (channel: string, angle: number) => {
        console.log('Generating Cartesian grid particles...');
        const particles: Particle[] = [];
        const w = canvas.width;
        const h = canvas.height;
        const diag = Math.max(w, h) * ROOT_2;

        const gridSize = optionsMerged.dotSize * diag;
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

                const particle = initParticle(channel, x2, y2);
                if (particle) {
                    particles.push(particle);
                }
            }
        }
        return particles;
    };

    const getRadialGridParticles = (channel: string, angle: number) => {
        const particles: Particle[] = [];
        const w = canvas.width;
        const h = canvas.height;
        const diag = Math.max(w, h) * ROOT_2;

        const gridSize = optionsMerged.dotSize;
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
                const particle = initParticle(channel, x, y);
                if (particle) {
                    particles.push(particle);
                }
            }
        }
        return particles;
    };

    const initParticle = (channel: string, x: number, y: number) => {
        const pixelChannelValue = getPixelChannelValue(x, y, channel);
        if (pixelChannelValue < optionsMerged.dotSizeThreshold) {
            return;
        }

        return new Particle({
            channel,
            parent: this,
            origin: new Vector(x, y),
            naturalSize: gridSize * ROOT_2 / 2,
            friction: optionsMerged.friction,
        });
    };

    const getPixelChannelValue = (x: number, y: number, channel: string) => {
        x = Math.round(x / imgScale);
        y = Math.round(y / imgScale);
        const w = imgWidth;
        const h = imgHeight;

        if (x < 0 || x > w || y < 0 || y > h) {
            return 0;
        }

        const pixelIndex = (x + y * w) * 4;
        let value;
        if (channel === 'lum') {
            value = getPixelLum(pixelIndex);
        } else {
            const index = pixelIndex + channelOffset[channel];
            value = imgData[index] / 255;
        }

        value = value || 0;
        if (!optionsMerged.isAdditive) {
            value = 1 - value;
        }

        return value;
    };

    const getPixelLum = (pixelIndex: number) => {
        const r = imgData[pixelIndex + 0] / 255;
        const g = imgData[pixelIndex + 1] / 255;
        const b = imgData[pixelIndex + 2] / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        return (max + min) / 2;
    };

    loadImage();
}

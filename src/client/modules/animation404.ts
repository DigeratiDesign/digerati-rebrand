import * as THREE from 'three';

type Axis = 'x' | 'y';
type Bounds = Record<Axis, number[]>;

const selector = '[dd-animation="404"]';
const mountedHosts = new WeakSet<HTMLElement>();
const styleId = 'dd-404-animation-style';
const animationStyles = `
  .dd-404-animation-container { isolation: isolate; }
  [dd-animation="404"] {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    animation: dd-404-animation-hue 12s linear infinite paused;
  }
  [dd-animation="404"].dd-404-animation-playing { animation-play-state: running; }
  [dd-animation="404"] > canvas { display: block; width: 100%; height: 100%; }
  @keyframes dd-404-animation-hue {
    from { filter: hue-rotate(0deg); }
    to { filter: hue-rotate(360deg); }
  }
`;

const TRIANGLE_PATH =
  'M75.0347 71L70.1372 66.7991C68.5397 65.4288 66.5009 64.675 64.3919 64.675H3.66905L9.78491 62.544C11.7729 61.8513 13.4453 60.472 14.4984 58.6566L44.7876 6.44199L43.638 12.7097C43.2632 14.7533 43.6304 16.863 44.674 18.662L75.0347 71ZM41.1864 0L0 71H82.3729L41.1864 0Z';
const EYE_PATH =
  'M41.1864 58.2798C30.0578 58.2798 23.6153 48.9754 23.3464 48.5795L24.2635 46.8092L23.3464 45.039C23.6153 44.6431 30.0578 35.3387 41.1864 35.3387C52.3151 35.3387 58.7576 44.6431 59.0264 45.039L58.1094 46.8092L59.0264 48.5795C58.7576 48.9754 52.3151 58.2798 41.1864 58.2798ZM24.2635 46.8097C26.2639 48.8589 36.0107 51.9549 41.1864 51.9549C46.3594 51.9549 56.1057 48.8618 58.1094 46.8092C56.1057 44.7567 46.3594 41.6636 41.1864 41.6636C36.0131 41.6636 26.2669 44.7571 24.2635 46.8097Z';
const PUPIL_PATH =
  'M41.1864 50.5709C43.1753 50.5709 44.7876 48.9662 44.7876 46.9868C44.7876 45.0073 43.1753 43.4026 41.1864 43.4026C39.1976 43.4026 37.5853 45.0073 37.5853 46.9868C37.5853 48.9662 39.1976 50.5709 41.1864 50.5709Z';
const spot = '#00ff00';
function mountPyramid(host: HTMLElement) {
  const section = host.parentElement;
  if (!section) return;
  const canvas = host.ownerDocument.createElement('canvas');
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearAlpha(0);
  } catch {
    return;
  }
  if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
  section.classList.add('dd-404-animation-container');
  host.setAttribute('aria-hidden', 'true');
  host.append(canvas);
  mountedHosts.add(host);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 10;

  // A regular tetrahedron centred at its centroid.
  const baseZ = 1 / Math.sqrt(3);
  const height = Math.sqrt(8 / 3);
  const baseY = -height / 4;
  const corners = [
    [-1, baseY, baseZ],
    [1, baseY, baseZ],
    [0, baseY, -2 * baseZ],
    [0, baseY + height, 0],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const faces = [
    [0, 1, 3],
    [1, 2, 3],
    [2, 0, 3],
    [0, 2, 1],
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      faces.flatMap((face) => face.flatMap((index) => corners[index].toArray())),
      3
    )
  );
  geometry.setAttribute(
    'uv',
    new THREE.Float32BufferAttribute(
      faces.flatMap(() => [0, 0, 1, 0, 0.5, 1]),
      2
    )
  );
  faces.forEach((_, index) => geometry.addGroup(index * 3, 3, index === 0 ? 0 : 1));
  geometry.computeVertexNormals();
  scene.add(new THREE.AmbientLight(0xffffff, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 1.8);
  key.position.set(-4, 6, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.95);
  rim.position.set(4, -1, -5);
  scene.add(rim);

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motionPreference.matches;
  const speed = 1;
  const axes: Axis[] = ['x', 'y'];
  const limits = { x: 0, y: 0 };
  const pointer = { active: false, x: 0, y: 0, radius: 0 };
  const edgePairs = corners.flatMap((_, a) =>
    corners.slice(a + 1).map((_, offset) => [a, a + offset + 1])
  );
  const fullSize = 0.88;
  const plainMaterial = new THREE.MeshStandardMaterial({ color: spot, roughness: 0.58 });
  let previousTime = 0;
  let frame = 0;

  function createPyramid() {
    const art = document.createElement('canvas');
    art.width = art.height = 512;
    const context = art.getContext('2d');
    if (!context) throw new Error('404 animation requires a 2D canvas context');
    const ink = context;
    const trianglePath = new Path2D(TRIANGLE_PATH);
    const eyePath = new Path2D(EYE_PATH);
    const pupilPath = new Path2D(PUPIL_PATH);
    const texture = new THREE.CanvasTexture(art);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    let lastLogo: { openness: number; pupilX: number; pupilY: number } | undefined;
    function drawLogo(openness: number, pupilX = 0, pupilY = 0) {
      if (
        lastLogo?.openness === openness &&
        lastLogo.pupilX === pupilX &&
        lastLogo.pupilY === pupilY
      )
        return;
      lastLogo = { openness, pupilX, pupilY };
      ink.fillStyle = spot;
      ink.fillRect(0, 0, art.width, art.height);
      ink.save();
      // Keep the apex and side insets, with the base 52 texture pixels from the edge.
      ink.translate(256, 104);
      ink.scale(404 / 82.3729, 356 / 71);
      ink.translate(-41.1864, 0);
      ink.fillStyle = '#2a2722';
      ink.fill(trianglePath, 'evenodd');
      const surprise = Math.max(0, openness - 1);
      const eyeCentreY = 46.8092;
      ink.save();
      ink.translate(41.1864, eyeCentreY);
      ink.scale(1 - 0.12 * surprise, openness);
      ink.translate(-41.1864, -46.8092);
      ink.fill(eyePath, 'evenodd');
      ink.restore();

      const pupilScale = 1 - 0.32 * surprise;
      ink.translate(41.1864 + pupilX, eyeCentreY + pupilY);
      ink.scale(pupilScale, pupilScale * Math.min(1, openness));
      ink.translate(-41.1864, -46.8092);
      ink.fill(pupilPath);
      ink.restore();
      texture.needsUpdate = true;
    }
    drawLogo(1);

    const pyramid = new THREE.Mesh(geometry, [
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.58 }),
      plainMaterial,
    ]);
    const tumble = new THREE.Group();
    const squash = new THREE.Group();
    tumble.add(pyramid);
    squash.add(tumble);
    scene.add(squash);
    tumble.rotation.set(0.21, -0.29, -0.18);
    pyramid.scale.setScalar(fullSize);
    const velocity = { x: 2.65, y: -1.68 };
    const spin = new THREE.Vector3(0.53, 0.78, 0.29);
    const springs = { x: { depth: 0, rate: 0 }, y: { depth: 0, rate: 0 } };
    const projectedCorners = corners.map(() => new THREE.Vector3());
    const cursorGlance = new THREE.Vector3();
    let cursorGlanceTime = 0;
    let touchingPointer = false;
    const travelSpeed = Math.hypot(velocity.x, velocity.y);
    let angularKick = 0;

    function measureBounds() {
      const bounds: Bounds = { x: [Infinity, -Infinity], y: [Infinity, -Infinity] };
      for (const [index, corner] of corners.entries()) {
        const local = projectedCorners[index]
          .copy(corner)
          .multiplyScalar(pyramid.scale.x)
          .applyQuaternion(tumble.quaternion)
          .multiply(squash.scale);
        for (const axis of axes) {
          bounds[axis][0] = Math.min(bounds[axis][0], local[axis]);
          bounds[axis][1] = Math.max(bounds[axis][1], local[axis]);
        }
      }
      return bounds;
    }

    function applySquash() {
      const x = springs.x.depth;
      const y = springs.y.depth;
      squash.scale.set(1 - x + y * 0.29, 1 - y + x * 0.29, 1 + (x + y) * 0.24);
    }

    function fit(bounds: Bounds) {
      for (const axis of axes) {
        squash.position[axis] = THREE.MathUtils.clamp(
          squash.position[axis],
          -limits[axis] - bounds[axis][0],
          limits[axis] - bounds[axis][1]
        );
      }
    }

    function bumpFromPointer() {
      if (!pointer.active) {
        touchingPointer = false;
        return;
      }

      const x = pointer.x - squash.position.x;
      const y = pointer.y - squash.position.y;
      let gap = Infinity;
      let normalX = 0;
      let normalY = 0;
      for (const [a, b] of edgePairs) {
        const start = projectedCorners[a];
        const end = projectedCorners[b];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const lengthSquared = dx * dx + dy * dy;
        if (lengthSquared < 1e-9) continue;
        const along = THREE.MathUtils.clamp(
          ((x - start.x) * dx + (y - start.y) * dy) / lengthSquared,
          0,
          1
        );
        const nx = start.x + along * dx - x;
        const ny = start.y + along * dy - y;
        const distance = Math.hypot(nx, ny);
        if (distance >= gap) continue;
        gap = distance;
        normalX = nx;
        normalY = ny;
      }
      const inside = faces.some(([a, b, c]) => {
        const points = [projectedCorners[a], projectedCorners[b], projectedCorners[c]];
        const [first, second, third] = points;
        const area =
          (second.x - first.x) * (third.y - first.y) - (second.y - first.y) * (third.x - first.x);
        if (Math.abs(area) < 1e-9) return false;
        const sides = points.map((start, i) => {
          const end = points[(i + 1) % 3];
          return (end.x - start.x) * (y - start.y) - (end.y - start.y) * (x - start.x);
        });
        return sides.every((value) => value >= 0) || sides.every((value) => value <= 0);
      });

      const inContact = inside || gap <= pointer.radius;
      const entering = inContact && !touchingPointer;
      if (!inContact && gap > pointer.radius * 1.6) touchingPointer = false;
      if (!entering) return;
      touchingPointer = true;

      if (inside || gap < 1e-6) {
        normalX = -x;
        normalY = -y;
        if (Math.hypot(normalX, normalY) < 1e-6) {
          normalX = -velocity.x;
          normalY = -velocity.y;
        }
      }
      const length = Math.hypot(normalX, normalY);
      normalX /= length;
      normalY /= length;

      const approach = velocity.x * normalX + velocity.y * normalY;
      const impulse = Math.max(0.9, -1.45 * approach);
      const turn = velocity.x * normalY - velocity.y * normalX;
      velocity.x += impulse * normalX;
      velocity.y += impulse * normalY;
      const newSpeed = Math.hypot(velocity.x, velocity.y);
      velocity.x *= travelSpeed / newSpeed;
      velocity.y *= travelSpeed / newSpeed;
      angularKick += THREE.MathUtils.clamp(turn * 0.12, -0.35, 0.35);
      if (faceVisibility(logoFace, tumble.quaternion) > 0.3) {
        cursorGlance.set(-normalX, -normalY, 0);
        cursorGlanceTime = 0.26;
      }
    }

    function advance(dt: number) {
      angularKick *= Math.exp(-dt * 3);
      tumble.rotation.x += spin.x * dt;
      tumble.rotation.y += spin.y * dt;
      tumble.rotation.z += (spin.z + angularKick) * dt;
      for (const axis of axes) {
        const spring = springs[axis];
        spring.rate += (-390 * spring.depth - 24 * spring.rate) * dt;
        spring.depth += spring.rate * dt;
        squash.position[axis] += velocity[axis] * speed * dt;
      }
      applySquash();
      const bounds = measureBounds();
      const contacts: { axis: Axis; outward: number; edge: number }[] = [];
      for (const axis of axes) {
        const outward = Math.sign(velocity[axis]);
        const edge = outward > 0 ? 1 : 0;
        if (outward * (squash.position[axis] + bounds[axis][edge]) < limits[axis]) continue;
        const impact = Math.abs(velocity[axis]) * speed;
        const spring = springs[axis];
        spring.depth = Math.min(0.33, 0.075 * impact);
        spring.rate = 0.22 * impact;
        reactToImpact(impact);
        velocity[axis] *= -1;
        angularKick += outward * impact * (axis === 'x' ? 0.14 : -0.14);
        contacts.push({ axis, outward, edge });
      }
      applySquash();
      const deformedBounds = measureBounds();
      for (const { axis, outward, edge } of contacts) {
        squash.position[axis] = outward * limits[axis] - deformedBounds[axis][edge];
      }
      fit(deformedBounds);
      bumpFromPointer();
      return deformedBounds;
    }

    const facing = new THREE.Vector3();
    const faceBases = faces.map(([a, b, c], index) => ({
      normal: new THREE.Vector3().fromBufferAttribute(geometry.getAttribute('normal'), index * 3),
      right: corners[b].clone().sub(corners[a]).normalize(),
      up: corners[c].clone().sub(corners[a].clone().lerp(corners[b], 0.5)).normalize(),
    }));
    let logoFace = 0;
    const futureRotation = tumble.rotation.clone();
    const futureOrientation = tumble.quaternion.clone();

    function faceVisibility(index: number, orientation: THREE.Quaternion) {
      return facing.copy(faceBases[index].normal).applyQuaternion(orientation).z;
    }

    function handOffEye() {
      const hiddenMargin = -0.015;
      if (faceVisibility(logoFace, tumble.quaternion) >= hiddenMargin) return;
      const hidden = faceBases.map(
        (_, index) => faceVisibility(index, tumble.quaternion) < hiddenMargin
      );
      const rotation = tumble.rotation;

      // Find the first currently hidden face due to enter view.
      for (let step = 1; step <= 12; step++) {
        const ahead = step * 0.05;
        futureRotation.set(
          rotation.x + spin.x * ahead,
          rotation.y + spin.y * ahead,
          rotation.z + spin.z * ahead - (angularKick * Math.expm1(-3 * ahead)) / 3,
          rotation.order
        );
        futureOrientation.setFromEuler(futureRotation);
        let nextFace = -1;
        let bestVisibility = 0;
        for (let index = 0; index < faces.length; index++) {
          if (!hidden[index]) continue;
          const visibility = faceVisibility(index, futureOrientation);
          if (visibility <= bestVisibility) continue;
          nextFace = index;
          bestVisibility = visibility;
        }
        if (nextFace === -1) continue;
        if (nextFace !== logoFace) {
          geometry.groups[logoFace].materialIndex = 1;
          geometry.groups[nextFace].materialIndex = 0;
          logoFace = nextFace;
        }
        return;
      }
    }

    const glanceDirection = new THREE.Vector3();
    const inverseTumble = tumble.quaternion.clone();
    const glanceLead = 0.55;

    function glanceAtEdge(bounds: Bounds) {
      let nextAxis: Axis | undefined;
      let arrival = glanceLead;
      for (const axis of axes) {
        const outward = Math.sign(velocity[axis]);
        const edge = outward > 0 ? 1 : 0;
        const gap = limits[axis] - outward * (squash.position[axis] + bounds[axis][edge]);
        const timeToEdge = Math.max(0, gap) / (Math.abs(velocity[axis]) * speed);
        if (timeToEdge >= arrival) continue;
        arrival = timeToEdge;
        nextAxis = axis;
      }
      if (!nextAxis) {
        drawLogo(1);
        return;
      }

      glanceDirection.set(0, 0, 0);
      glanceDirection[nextAxis] = Math.sign(velocity[nextAxis]);
      glanceDirection.applyQuaternion(inverseTumble.copy(tumble.quaternion).invert());
      const approach = 1 - arrival / glanceLead;
      const strength = approach * approach * (3 - 2 * approach);
      const { right, up } = faceBases[logoFace];
      drawLogo(
        1,
        5 * strength * glanceDirection.dot(right),
        -0.85 * strength * glanceDirection.dot(up)
      );
    }

    const blinkDuration = 0.19;
    let untilBlink = 3 + Math.random() * 3;
    let blinkElapsed: number | null = null;
    const flinchDuration = 0.65;
    const flinchHold = 0.12;
    let flinchRemaining = 0;
    let flinchPeak = 0;

    function flinchOpenness() {
      const release = Math.min(1, flinchRemaining / (flinchDuration - flinchHold));
      return flinchPeak * release ** 2;
    }

    function reactToImpact(impact: number) {
      flinchPeak = Math.max(flinchOpenness(), Math.min(0.5, 0.22 * impact));
      flinchRemaining = flinchDuration;
      if (blinkElapsed !== null) {
        blinkElapsed = null;
        untilBlink = 4 + Math.random() * 5;
      }
    }

    function advanceEye(dt: number, bounds: Bounds) {
      handOffEye();
      cursorGlanceTime = Math.max(0, cursorGlanceTime - dt);
      if (flinchRemaining > 0) {
        drawLogo(1 + flinchOpenness());
        flinchRemaining = Math.max(0, flinchRemaining - dt);
        if (flinchRemaining === 0) drawLogo(1);
        return;
      }
      if (
        cursorGlanceTime > 0 &&
        blinkElapsed === null &&
        faceVisibility(logoFace, tumble.quaternion) > 0.3
      ) {
        glanceDirection
          .copy(cursorGlance)
          .applyQuaternion(inverseTumble.copy(tumble.quaternion).invert());
        const strength = Math.min(1, cursorGlanceTime / 0.14);
        const { right, up } = faceBases[logoFace];
        drawLogo(
          1,
          5 * strength * glanceDirection.dot(right),
          -0.85 * strength * glanceDirection.dot(up)
        );
        return;
      }
      advanceBlink(dt);
      if (blinkElapsed === null) glanceAtEdge(bounds);
    }

    function advanceBlink(dt: number) {
      if (blinkElapsed === null) {
        untilBlink -= dt;
        if (untilBlink > 0 || faceVisibility(logoFace, tumble.quaternion) < 0.45) return;
        blinkElapsed = 0;
      }
      blinkElapsed += dt;
      if (blinkElapsed >= blinkDuration) {
        drawLogo(1);
        blinkElapsed = null;
        untilBlink = 4 + Math.random() * 5;
        return;
      }

      const progress = blinkElapsed / blinkDuration;
      const phase = progress < 0.4 ? progress / 0.4 : (1 - progress) / 0.6;
      drawLogo(1 - 0.94 * Math.sin((phase * Math.PI) / 2));
    }

    return {
      position: squash.position,
      clampToViewport() {
        fit(measureBounds());
      },
      advance,
      advanceEye,
    };
  }

  const body = createPyramid();

  function trackPointer(event: PointerEvent) {
    pointer.active = false;
    if (
      paused ||
      event.pointerType !== 'mouse' ||
      (event.target instanceof Element &&
        event.target.closest('a, button, input, select, textarea, [role="button"]'))
    )
      return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = (((event.clientX - rect.left) / rect.width) * 2 - 1) * limits.x;
    pointer.y = (1 - ((event.clientY - rect.top) / rect.height) * 2) * limits.y;
    pointer.radius = (12 * 2 * limits.x) / rect.width;
    pointer.active = true;
  }

  function clearPointer() {
    pointer.active = false;
  }

  function resize() {
    clearPointer();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const shortSide = Math.max(1, Math.min(width, height));
    const previousX = limits.x;
    const previousY = limits.y;
    limits.x = (4.5 * width) / shortSide;
    limits.y = (4.5 * height) / shortSide;
    const { position } = body;
    if (previousX && previousY) {
      position.x *= limits.x / previousX;
      position.y *= limits.y / previousY;
    } else {
      position.set(-limits.x * 0.33, limits.y * 0.23, 0);
    }
    body.clampToViewport();
    camera.left = -limits.x;
    camera.right = limits.x;
    camera.top = limits.y;
    camera.bottom = -limits.y;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
  }

  function render(time: number) {
    const dt = Math.min((time - (previousTime || time)) / 1000, 0.05);
    previousTime = time;
    const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
    let bounds = body.advance(dt / steps);
    for (let step = 1; step < steps; step++) bounds = body.advance(dt / steps);
    body.advanceEye(dt, bounds);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  function setPaused(value: boolean) {
    paused = value;
    clearPointer();
    host.classList.toggle('dd-404-animation-playing', !paused);
    cancelAnimationFrame(frame);
    previousTime = 0;
    if (!paused) frame = requestAnimationFrame(render);
  }

  section.addEventListener('pointermove', trackPointer);
  section.addEventListener('pointerleave', clearPointer);
  section.addEventListener('pointercancel', clearPointer);
  window.addEventListener('blur', clearPointer);
  window.addEventListener('scroll', clearPointer, { passive: true });
  new ResizeObserver(resize).observe(canvas);
  motionPreference.addEventListener('change', (event) => setPaused(event.matches));
  resize();
  setPaused(paused);
}

// The 404 is static. This entry point also accepts a root for pages that add the host later.
export function init404Animation(root: Document | HTMLElement = document) {
  const hosts =
    root instanceof HTMLElement && root.matches(selector)
      ? [root]
      : root.querySelectorAll<HTMLElement>(selector);
  for (const host of hosts) {
    if (!host.parentElement || mountedHosts.has(host)) continue;
    const doc = host.ownerDocument;
    if (!doc.getElementById(styleId)) {
      const style = doc.createElement('style');
      style.id = styleId;
      style.textContent = animationStyles;
      doc.head.append(style);
    }
    mountPyramid(host);
  }
}

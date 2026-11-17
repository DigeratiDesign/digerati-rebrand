import { pageTransitionCleared } from '$client/utils/pageTransition';
import * as THREE from 'three';

type Axis = 'x' | 'y';
type Bounds = Record<Axis, number[]>;
type Point = { x: number; y: number };

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
  [dd-animation="404"].dd-404-animation-pending { visibility: hidden; }
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
  // Prepared while hidden; revealed once the page transition clears.
  host.classList.add('dd-404-animation-pending');
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
  // Each pyramid clones this so its eye can occupy its own material group.
  const baseGeometry = new THREE.BufferGeometry();
  baseGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      faces.flatMap((face) => face.flatMap((index) => corners[index].toArray())),
      3
    )
  );
  baseGeometry.setAttribute(
    'uv',
    new THREE.Float32BufferAttribute(
      faces.flatMap(() => [0, 0, 1, 0, 0.5, 1]),
      2
    )
  );
  faces.forEach((_, index) => baseGeometry.addGroup(index * 3, 3, index === 0 ? 0 : 1));
  baseGeometry.computeVertexNormals();
  scene.add(new THREE.AmbientLight(0xffffff, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 1.8);
  key.position.set(-4, 6, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.95);
  rim.position.set(4, -1, -5);
  scene.add(rim);

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let motionReduced = motionPreference.matches;
  let revealed = false;
  const speed = 1;
  // Entrance: each pyramid drops from just above the viewport onto a temporary
  // floor at its resting height, ~150ms apart, then rebounds into normal motion.
  const entranceStagger = 0.15;
  const dropDuration = 0.42;
  const axes: Axis[] = ['x', 'y'];
  const limits = { x: 0, y: 0 };
  // Three pyramids at 70% of the original single pyramid's size.
  const fullSize = 0.88 * 0.7;
  const plainMaterial = new THREE.MeshStandardMaterial({ color: spot, roughness: 0.58 });
  let previousTime = 0;
  let frame = 0;

  function createPyramid(start: Point, initialVelocity: Point, spinY: number) {
    const geometry = baseGeometry.clone();
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
    tumble.rotation.set(0.21, start.x, start.y);
    pyramid.scale.setScalar(fullSize);
    const velocity = { ...initialVelocity };
    const spin = new THREE.Vector3(0.53, spinY, start.x);
    const springs = { x: { depth: 0, rate: 0 }, y: { depth: 0, rate: 0 } };
    // Corner offsets from the pyramid centre after tumble and squash; shared with collisions.
    const projectedCorners = corners.map(() => new THREE.Vector3());
    let angularKick = 0;
    // 'hidden' until the page transition clears; 'active' runs the normal simulation.
    let phase: 'hidden' | 'entering' | 'active' = 'hidden';
    let entranceTime = 0;
    let entranceDelay = 0;
    squash.visible = false;
    // Just above the viewport, clear of the largest projected extent.
    const dropStartY = () => limits.y + fullSize * 1.4;
    const restingPosition = () => ({ x: start.x * limits.x, y: start.y * limits.y });

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
      return deformedBounds;
    }

    function beginEntrance(delay: number) {
      if (phase !== 'hidden') return;
      phase = 'entering';
      entranceTime = 0;
      entranceDelay = delay;
      squash.position.set(restingPosition().x, dropStartY(), 0);
    }

    function dropProgress() {
      return THREE.MathUtils.clamp((entranceTime - entranceDelay) / dropDuration, 0, 1);
    }

    /** Scripted fall; returns true while the pyramid is still dropping. */
    function advanceEntrance(dt: number) {
      if (phase !== 'entering') return false;
      entranceTime += dt;
      if (entranceTime < entranceDelay) return true;
      squash.visible = true;
      // Tumble harder while falling; it settles to the normal spin after landing.
      tumble.rotation.x += spin.x * 2.4 * dt;
      tumble.rotation.y += spin.y * 2.4 * dt;
      tumble.rotation.z += spin.z * 2.4 * dt;
      const progress = dropProgress();
      const { x, y: floorY } = restingPosition();
      // Accelerating fall, as under gravity.
      squash.position.set(x, dropStartY() + (floorY - dropStartY()) * progress * progress, 0);
      measureBounds();
      if (progress < 1) return true;
      land();
      return false;
    }

    function land() {
      phase = 'active';
      // Squash on the implied floor (widening sideways), widen the eye, rebound upwards.
      springs.y.depth = 0.3;
      springs.y.rate = 0.6;
      reactToImpact(2.3);
      velocity.x = initialVelocity.x;
      velocity.y = Math.abs(initialVelocity.y);
      angularKick += Math.sign(initialVelocity.x) * 0.35;
    }

    /** Places the pyramid at rest without the drop (reduced motion). */
    function settle() {
      if (phase === 'active') return;
      phase = 'active';
      squash.visible = true;
      const { x, y } = restingPosition();
      squash.position.set(x, y, 0);
      fit(measureBounds());
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
      const approach = 1 - arrival / glanceLead;
      lookAlong(approach * approach * (3 - 2 * approach));
    }

    /** Moves the pupil towards `glanceDirection` (world space) on the eye's face. */
    function lookAlong(strength: number) {
      glanceDirection.applyQuaternion(inverseTumble.copy(tumble.quaternion).invert());
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

    function advanceEye(dt: number, bounds: Bounds | null) {
      if (phase === 'hidden' || !squash.visible) return;
      handOffEye();
      if (phase === 'entering') {
        // Watch the floor coming up.
        glanceDirection.set(0, -1, 0);
        lookAlong(Math.min(1, dropProgress() * 1.6));
        return;
      }
      if (flinchRemaining > 0) {
        drawLogo(1 + flinchOpenness());
        flinchRemaining = Math.max(0, flinchRemaining - dt);
        if (flinchRemaining === 0) drawLogo(1);
        return;
      }
      advanceBlink(dt);
      if (blinkElapsed === null && bounds) glanceAtEdge(bounds);
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
      start,
      velocity,
      projectedCorners,
      reactToCollision(impact: number, spinKick: number) {
        reactToImpact(impact);
        angularKick += spinKick;
      },
      isActive: () => phase === 'active',
      clampToViewport() {
        if (phase === 'active') fit(measureBounds());
      },
      beginEntrance,
      advanceEntrance,
      settle,
      advance,
      advanceEye,
    };
  }

  const bodies = [
    createPyramid({ x: -0.45, y: 0.24 }, { x: 2.6, y: -1.5 }, 0.78),
    createPyramid({ x: 0.46, y: -0.26 }, { x: -2.1, y: 1.8 }, -0.72),
    createPyramid({ x: 0.26, y: 0.58 }, { x: -1.5, y: -2.3 }, -0.72),
  ];
  type Body = (typeof bodies)[number];

  function cross(a: Point, b: Point, c: Point) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  }

  // Convex hull of the projected corners: the pyramid's visible outline.
  function silhouette(body: Body) {
    const points = [...body.projectedCorners].sort((a, b) => a.x - b.x || a.y - b.y);
    function half(ordered: THREE.Vector3[]) {
      const hull: THREE.Vector3[] = [];
      for (const point of ordered) {
        while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], point) <= 0)
          hull.pop();
        hull.push(point);
      }
      hull.pop();
      return hull;
    }
    return [...half(points), ...half(points.reverse())];
  }

  function collide(a: Body, b: Body) {
    const hullA = silhouette(a);
    const hullB = silhouette(b);
    const dx = b.position.x - a.position.x;
    const dy = b.position.y - a.position.y;
    let separation = Infinity;
    let normalX = 0;
    let normalY = 0;

    // The separating axes of the two projected silhouettes locate visible contact.
    for (const hull of [hullA, hullB]) {
      for (let i = 0; i < hull.length; i++) {
        const first = hull[i];
        const second = hull[(i + 1) % hull.length];
        const length = Math.hypot(second.x - first.x, second.y - first.y);
        if (length < 1e-9) continue;
        const nx = (first.y - second.y) / length;
        const ny = (second.x - first.x) / length;
        const offset = dx * nx + dy * ny;
        const rangeA = hullA.map((point) => point.x * nx + point.y * ny);
        const rangeB = hullB.map((point) => point.x * nx + point.y * ny + offset);
        const forward = Math.max(...rangeA) - Math.min(...rangeB);
        const backward = Math.max(...rangeB) - Math.min(...rangeA);
        const overlap = Math.min(forward, backward);
        if (overlap <= 0) return;
        if (overlap >= separation) continue;
        separation = overlap;
        const direction = forward <= backward ? 1 : -1;
        normalX = nx * direction;
        normalY = ny * direction;
      }
    }
    if (!Number.isFinite(separation)) return;

    const correction = (separation + 0.0001) / 2;
    a.position.x -= normalX * correction;
    a.position.y -= normalY * correction;
    b.position.x += normalX * correction;
    b.position.y += normalY * correction;
    const relativeX = b.velocity.x - a.velocity.x;
    const relativeY = b.velocity.y - a.velocity.y;
    const approach = relativeX * normalX + relativeY * normalY;
    if (approach >= 0) return;

    const impulse = -approach * 0.96;
    a.velocity.x -= impulse * normalX;
    a.velocity.y -= impulse * normalY;
    b.velocity.x += impulse * normalX;
    b.velocity.y += impulse * normalY;
    const kick = THREE.MathUtils.clamp(
      (relativeX * normalY - relativeY * normalX) * 0.13,
      -0.5,
      0.5
    );
    a.reactToCollision(-approach, kick);
    b.reactToCollision(-approach, -kick);
  }

  function stepBodies(dt: number) {
    // Dropping pyramids follow their scripted fall; only landed ones collide.
    const bounds = bodies.map((body) =>
      !body.advanceEntrance(dt) && body.isActive() ? body.advance(dt) : null
    );
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        if (bodies[i].isActive() && bodies[j].isActive()) collide(bodies[i], bodies[j]);
      }
    }
    for (const body of bodies) body.clampToViewport();
    return bounds;
  }

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const shortSide = Math.max(1, Math.min(width, height));
    const previousX = limits.x;
    const previousY = limits.y;
    limits.x = (4.5 * width) / shortSide;
    limits.y = (4.5 * height) / shortSide;
    for (const { position, start, clampToViewport } of bodies) {
      if (previousX && previousY) {
        position.x *= limits.x / previousX;
        position.y *= limits.y / previousY;
      } else {
        position.set(start.x * limits.x, start.y * limits.y, 0);
      }
      clampToViewport();
    }
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
    let bounds = stepBodies(dt / steps);
    for (let step = 1; step < steps; step++) bounds = stepBodies(dt / steps);
    bodies.forEach((body, i) => body.advanceEye(dt, bounds[i]));
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  // The simulation and hue cycle run only once revealed, and never with reduced motion.
  function syncPlayback() {
    const running = revealed && !motionReduced;
    host.classList.toggle('dd-404-animation-playing', running);
    cancelAnimationFrame(frame);
    previousTime = 0;
    if (running) frame = requestAnimationFrame(render);
    else renderer.render(scene, camera);
  }

  // Runs once per mount, so once per page visit.
  function reveal() {
    if (revealed || !host.isConnected) return;
    revealed = true;
    host.classList.remove('dd-404-animation-pending');
    if (motionReduced) bodies.forEach((body) => body.settle());
    else bodies.forEach((body, i) => body.beginEntrance(i * entranceStagger));
    syncPlayback();
  }

  new ResizeObserver(resize).observe(canvas);
  motionPreference.addEventListener('change', (event) => {
    motionReduced = event.matches;
    // Switching to reduced motion mid-drop places the remaining pyramids at rest.
    if (motionReduced && revealed) bodies.forEach((body) => body.settle());
    syncPlayback();
  });
  resize();
  // Upload textures and compile shaders now, so the entrance starts without a stall.
  renderer.compile(scene, camera);
  syncPlayback();
  void pageTransitionCleared(host.ownerDocument).then(reveal);
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

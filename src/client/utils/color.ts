// src/client/utils/color.ts

/** Normalize a hex color string to the form #rrggbb. */
export const normalizeHexColor = (value?: string | null): string | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withoutHash = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (/^[0-9a-fA-F]{6}$/.test(withoutHash)) {
    return `#${withoutHash.toLowerCase()}`;
  }
  if (/^[0-9a-fA-F]{3}$/.test(withoutHash)) {
    const expanded = withoutHash
      .toLowerCase()
      .split("")
      .map((ch) => ch + ch)
      .join("");
    return `#${expanded}`;
  }
  return null;
};

/** Convert a normalized #rrggbb colour to RGB components. */
export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;
  const value = normalized.slice(1);
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
};

/**
 * Convert RGB components (0-255) to a hue angle in degrees.
 * Returns null for grayscale/achromatic colours where hue is undefined.
 */
export const rgbToHue = (r: number, g: number, b: number): number | null => {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const delta = max - min;
  if (delta === 0) return null;
  let hue: number;
  if (max === nr) {
    hue = ((ng - nb) / delta) % 6;
  } else if (max === ng) {
    hue = (nb - nr) / delta + 2;
  } else {
    hue = (nr - ng) / delta + 4;
  }
  hue *= 60;
  if (hue < 0) hue += 360;
  return hue;
};

/** Convert a hex colour to its hue angle in degrees (0-360). */
export const hexToHue = (hex: string): number | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const hue = rgbToHue(rgb.r, rgb.g, rgb.b);
  return hue ?? 0; // grayscale -> treat as 0deg
};

/** Smallest absolute distance between two hue angles. */
export const hueDistance = (a: number, b: number): number => {
  const diff = Math.abs(((a - b) % 360) + 360) % 360;
  return diff > 180 ? 360 - diff : diff;
};

/** Wrap a hue angle into the [0, 360) range. */
export const normalizeHue = (hue: number): number => {
  const wrapped = ((hue % 360) + 360) % 360;
  return wrapped === 360 ? 0 : wrapped;
};

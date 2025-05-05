class Vector {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.set(x, y);
    }

    set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    add(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v: Vector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    scale(s: number): void {
        this.x *= s;
        this.y *= s;
    }

    multiply(v: Vector): void {
        this.x *= v.x;
        this.y *= v.y;
    }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static subtract(a: Vector, b: Vector): Vector {
        return new Vector(a.x - b.x, a.y - b.y);
    }

    static add(a: Vector, b: Vector): Vector {
        return new Vector(a.x + b.x, a.y + b.y);
    }

    static copy(v: Vector): Vector {
        return new Vector(v.x, v.y);
    }

    clone(): Vector {
        return new Vector(this.x, this.y);
    }
}

export default Vector;

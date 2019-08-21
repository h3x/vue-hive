// RedBlob algorithms for hexes, found here: https://www.redblobgames.com/grids/hexagons/
export function calcHexPoints(x: number, y: number, size: number) {
    const sides: Array<[number, number]> = [];
    for (let side = 0; side < 7; side++) {
        const lx = x + size * Math.cos(side * 2 * Math.PI / 6);
        const ly = y + size * Math.sin(side * 2 * Math.PI / 6);
        sides.push([lx, ly]);
    }
    return sides;
}

export function cube_to_coord(cube: {x: number, y: number, z: number}): {x: number, y: number} {
    const cx = cube.x;
    const cy = cube.z + (cube.x - (cube.x & 1)) / 2;
    return {x: cx, y: cy};
}

export function coord_to_cube(hex: {x: number, y: number}): {x: number, y: number, z: number} {
    const cx = hex.x;
    const cz = hex.y - (hex.x - (hex.x & 1)) / 2;
    const cy = -cx - cz;
    return {x: cx, y: cy, z: cz};
}

export function cube_round(cube: {x: number, y: number, z: number}): {x: number, y: number, z: number} {
    let rx = Math.round(cube.x);
    let ry = Math.round(cube.y);
    let rz = Math.round(cube.z);

    const x_diff = Math.abs(rx - cube.x);
    const y_diff = Math.abs(ry - cube.y);
    const z_diff = Math.abs(rz - cube.z);

    if (x_diff > y_diff && x_diff > z_diff) {
        rx = -ry - rz;
    } else if (y_diff > z_diff) {
        ry = -rx - rz;
    } else {
        rz = -rx - ry;
    }

    return {x: rx, y: ry, z: rz};
}

export function hex_to_pixel(x: number, y: number, size: number): [number, number] {
    const tx = size * 3 / 2 * x;
    const ty = size * Math.sqrt(3) * (y + 0.5 * (x & 1));
    return [tx, ty];
}

export function pixel_to_hex(x: number, y: number, size: number): [number, number] {
    const q = ( 2. / 3 * x) / size;
    const r = (-1. / 3 * x  +  Math.sqrt(3) / 3 * y) / size;
    const cube = axial_to_cube(Math.floor(q), Math.floor(r));
    const r_cube = cube_round(cube);
    const h =  cube_to_coord(r_cube);
    return [Math.max(0, h.x), Math.max(0, h.y)]; // dirty bounds hack
}

export function axial_to_cube(ax: number, ay: number) {
const x = ax;
const z = ay;
const y = -x - z;
return {x, y, z};
}

export const directions = [
    [[ 0, -1], [+1, -1], [+1,  0],
     [ 0, +1], [-1,  0], [-1, -1]],

     [[ 0, -1], [+1,  0], [+1, +1],
      [ 0, +1], [-1, +1], [-1,  0]],
];

export function neighbor(x: number, y: number, direction: number): [number, number] {
    const parity = x & 1;
    const dir = directions[parity][direction];
    return [x + dir[0], y + dir[1]];
}

// end of RedBlob algorithms

export type point3d = [number, number, number]


export function hash(point: point3d) {
    return JSON.stringify(point)
}

export function minp(p1: point3d, p2: point3d) {
    return [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1]), Math.min(p1[2], p2[2])] as point3d
}

export function maxp(p1: point3d, p2: point3d) {
    return [Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1]), Math.max(p1[2], p2[2])] as point3d
}

export function add(a: point3d, b: point3d) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] as point3d
}
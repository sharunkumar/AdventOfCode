import { inclusive_between as ibw } from "."

export type point3d = [number, number, number]

export function hash(point: point3d) {
  return JSON.stringify(point)
}

export function minp(p1: point3d, p2: point3d) {
  return p3d(Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1]), Math.min(p1[2], p2[2]))
}

export function maxp(p1: point3d, p2: point3d) {
  return p3d(Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1]), Math.max(p1[2], p2[2]))
}

export function add(a: point3d, b: point3d) {
  return p3d(a[0] + b[0], a[1] + b[1], a[2] + b[2])
}

export function mul(a: point3d, b: number) {
  return p3d(a[0] * b, a[1] * b, a[2] * b)
}

export function p3d(x: number, y: number, z: number) {
  return [x, y, z] as point3d
}

export function point_between(p: point3d, minp: point3d, maxp: point3d) {
  return ibw(p[0], minp[0], maxp[0]) && ibw(p[1], minp[1], maxp[1]) && ibw(p[2], minp[2], maxp[2])
}

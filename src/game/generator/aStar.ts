import { FaceType, type GM } from "../gm";

/**
 * Calculates the distance between two lands on the map.
 */
export function aStar(gm: GM, from: number, to: number) {
  const vis = new Set<number>();

  const q: [number, number][] = [[from, 0]];

  vis.add(from);

  while (true) {
    const front = q.shift();
    if (!front) {
      break;
    }

    const [cur, len] = front;

    for (const nxt of gm.edges[cur]) {
      if (vis.has(nxt) || gm.faces[nxt].type === FaceType.City) {
        continue;
      }

      vis.add(nxt);
      q.push([nxt, len + 1]);

      if (nxt.toString() === to.toString()) {
        return len + 1;
      }
    }
  }

  return null;
}

import { generateRandomGM } from "./random";

/**
 * Currently-supported native maps.
 */
export enum NativeMapVariant {
  Random = "random"
}

export enum GMMode {
  Hexagon = 0,
  Square = 1,
  Triangle = 2
}

/**
 * GM config used by generators.
 */
export interface GMConfig {
  /**
   * `@` for native maps, the others being usernames of custom map creators.
   */
  namespace: string;

  title: string;
  players: number;
  mode: GMMode;
}

export function generateGM(config: GMConfig) {
  if (config.namespace !== "@") {
    throw "unimplemented";
  }

  switch (config.title) {
    case NativeMapVariant.Random: {
      return generateRandomGM(config);
    }
  }

  throw "unimplemented";
}

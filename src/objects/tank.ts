import {
  Box3,
  Object3D,
  Vector3
} from 'three';
import {
  GLTF,
} from 'three/addons'
import { MonoBehaviour } from '~/types';

/**
 *
 */
export interface TankParameters {
  name?: string;
  gltf: GLTF;
}

export default class Tank extends Object3D implements MonoBehaviour {
  public boundingBox: Box3;

  constructor(params: TankParameters) {
    super();

    this.add(params.gltf.scene);

    this.name = params.name ?? 'Tank';
    this.scale.set(3.5, 3.5, 3.5);
    this.boundingBox = new Box3(
      new Vector3(-2.101, 1.102, -4.3),
      new Vector3(2.109, 4.389, 4.3));
  }

  public start(): void {
    this.position.set(0, 0, 0);
  }

  public update(_: number): void {
  }
}

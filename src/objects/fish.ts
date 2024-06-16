import {
  AnimationMixer,
  Group,
  Object3D,
  Vector3,
} from 'three';
import { MonoBehaviour } from '~/types';

/**
 *
 */
export interface FishParameters {
  name?: string;
  velocity?: number;
  fbx: Group;
}

export default class Fish extends Object3D implements MonoBehaviour {
  private readonly mixer: AnimationMixer;
  private readonly velocity: number;

  constructor(params: FishParameters) {
    super();

    this.add(params.fbx);

    this.mixer = new AnimationMixer(this.children[0]);
    this.name = params.name ?? 'Fish';
    this.scale.setScalar(0.0003);
    this.velocity = params.velocity ?? 0.04;
  }

  public start(): void {
    this.position.set(0, 1.3, 0);
    let vec = new Vector3();
    console.log(this.getWorldDirection(vec))
    this.children[0].animations.forEach(c => {
      this.mixer.clipAction(c).play();
    });
  }

  public update(deltaTime: number): void {
    let direction = new Vector3();

    if (this.submarinePosition != undefined) {
      direction = direction.subVectors(this.submarinePosition, this.position).normalize();
      this.lookAt(this.submarinePosition);
    }
    else {
      this.getWorldDirection(direction);
    }

    this.position.add(direction.multiplyScalar(this.velocity * deltaTime));
    this.mixer.update(deltaTime);
  }

  public submarinePosition?: Vector3;
}

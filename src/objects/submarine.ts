import { Object3D, Box3, Vector3 } from 'three';
import { GLTF, } from 'three/addons';
import { NavigationControls } from '../controls';
import { MonoBehaviour, } from '~/types';

/**
 *
 */
export interface SubmarineParameters {
  name?: string;
  gltf: GLTF;
}

/**
 *
 */
export default class Submarine extends Object3D implements MonoBehaviour {
  private controls: NavigationControls;
  public boundingBox: Box3;

  constructor(params: SubmarineParameters) {
    super();

    this.add(params.gltf.scene);

    this.scale.setScalar(0.0011);

    this.name = params.name ?? 'Submarine';
    this.controls = new NavigationControls(this);
    this.boundingBox = new Box3();
    this.boundingBox.setFromObject(this);
  }

  public start(): void {
    this.position.set(0, 3, 0);
    this.rotation.setFromVector3(new Vector3());
  }

  public update(deltaTime: number): void {
    this.controls.update(deltaTime);
    this.boundingBox.setFromObject(this);
  }
}

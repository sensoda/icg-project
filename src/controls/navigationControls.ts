import { EventDispatcher, Object3D, Vector3 } from 'three';
import { clamp, degToRad } from 'three/src/math/MathUtils.js';

export interface NavigationControlsEventMap {

}

interface DirectionMap {
  forward: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export default class NavigationControls extends EventDispatcher<NavigationControlsEventMap> {
  private map: DirectionMap;
  private readonly object: Object3D;
  private readonly factor: number;
  private readonly maxVelocity: number;

  public velocity: number;

  constructor(object: Object3D, factor?: number, maxVelocity?: number) {
    super();

    this.map = {
      forward: false,
      up: false,
      down: false,
      left: false,
      right: false,
    };

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));

    this.object = object;
    this.velocity = 0;
    this.factor = factor ?? 0.005;
    this.maxVelocity = maxVelocity ?? 0.3;

  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.map['up'] = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.map['down'] = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.map['left'] = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.map['right'] = true;
        break;
      case 'Space':
        this.map['forward'] = true;
        break;
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.map['up'] = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.map['down'] = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.map['left'] = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.map['right'] = false;
        break;
      case 'Space':
        this.map['forward'] = false;
        break;
    }
  }

  update(deltaTime: number) {
    let direction = new Vector3();
    this.object.getWorldDirection(direction);

    if (this.map['forward']) {
      this.velocity = clamp(this.velocity+this.factor, 0, this.maxVelocity);
    }
    else if (!this.map['forward'] && this.velocity > 0) {
      this.velocity = clamp(this.velocity-this.factor, 0, this.maxVelocity);
    }

    const rad = degToRad(clamp(1.2 * this.velocity, 0, 90));

    if (this.map['up']) {
      this.object.rotateX(-rad);
    }
    if (this.map['down']) {
      this.object.rotateX(rad);
    }
    if (this.map['left']) {
      this.object.rotateY(rad);
    }
    if (this.map['right']) {
      this.object.rotateY(-rad);
    }

    if (this.velocity > 0) {
      this.object.position.add(direction.multiplyScalar(this.velocity * deltaTime));
    }
  }
}

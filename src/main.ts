import * as Three from 'three';
import { OrbitControls,} from 'three/addons';
import { render, Application } from './lib';
import { Fish, Submarine, Tank } from './objects';

/**
 *
 */
class UnderwaterExploration extends Application {

  public name: string = 'UnderwaterExploration';

  private _controls!: OrbitControls;
  private submarine!: Submarine;
  private tank!: Tank;
  private fish!: Fish;

  public async initialize(): Promise<void> {
    this.scene.background = new Three.Color(0xbbbbb);
    this.startControls();

    this.submarine = new Submarine({
      gltf: await this.gltf.loadAsync('submarine.glb'),
    });

    this.tank = new Tank({
      gltf: await this.gltf.loadAsync('tank.glb'),
    });

    this.fish = new Fish({
      fbx: await this.fbx.loadAsync('fish.fbx'),
    });

    const light = new Three.DirectionalLight(0xffffff, 1);
    light.position.set(-5.1922463970798525, 4.621429497183749, -4.168992351971242);

    this.scene.add(
      this.submarine,
      this.tank,
      light,
      this.fish,
      new Three.AmbientLight(0xffffff, 0.5),
    );
  }

  public override start(): void {
    super.start();

    this.camera.lookAt(this.submarine.position);
    this.camera.position.set(-5.1922463970798525, 4.621429497183749, -4.168992351971242)
  }

  public override update(deltaTime: number): void {
    super.update(deltaTime);
    this._controls.update(deltaTime);
    this.fish.submarinePosition = this.submarine.position;
    if (!this.tank.boundingBox.containsBox(this.submarine.boundingBox)) {
      this.submarine.start();
    }

    this.camera.lookAt(this.submarine.position);
  }

  private startControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.maxDistance = 9;
    controls.minDistance = 3.2;
    controls.maxPolarAngle = 1.5708;
    this._controls = controls;
  }
}

await render(
  new UnderwaterExploration(),
  document.getElementById('app'),
);

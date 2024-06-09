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

  public async initialize(): Promise<void> {
    this.scene.background = new Three.Color(0xbbbbb);
    this.startControls();

    this.submarine = new Submarine({
      gltf: await this.gltf.loadAsync('submarine.glb'),
    });

    this.tank = new Tank({
      gltf: await this.gltf.loadAsync('tank.glb'),
    });

    const light = new Three.DirectionalLight(0xffffff, 1);
    light.position.set(-5.1922463970798525, 4.621429497183749, -4.168992351971242);

    this.scene.add(
      this.submarine,
      this.tank,
      light,
      new Fish({
        fbx: await this.fbx.loadAsync('fish.fbx'),
      }),
      new Three.AmbientLight(),
    );
  }

  public override start(): void {
    super.start();

    this.camera.lookAt(this.scene.getObjectByName('Submarine')!.position);
    this.camera.position.set(-5.1922463970798525, 4.621429497183749, -4.168992351971242)
  }

  public override update(deltaTime: number): void {
    super.update(deltaTime);
    this._controls.update(deltaTime);

    if (!this.tank.boundingBox.containsBox(this.submarine.boundingBox)) {
      this.submarine.start();
    }

    this.camera.lookAt(this.scene.getObjectByName('Submarine')!.position);
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

// import * as Three from 'three';
// import { FBXLoader, GLTFLoader, OrbitControls, Water, } from 'three/addons';
// import { Submarine, Tank, Fish } from './objects';
// import type { MonoBehaviour } from './types';

// const PI_RAD = 1.571;

// const domElement = document.body;
// const renderer = new Three.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true, alpha: true });
// renderer.setSize(domElement.clientWidth, domElement.clientHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// domElement.appendChild(renderer.domElement);

// const scene = new Three.Scene();

// scene.background = new Three.Color(0xbbbbbb);
// scene.position.set(0, 0, 0);

// const camera = new Three.PerspectiveCamera(75, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.1, 100);
// camera.position.set(7.6511447840147175, 4.127983103515704, 4.941633231142641);
// camera.lookAt(scene.position);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.maxDistance = 10;
// controls.minDistance = 0.1;
// controls.maxPolarAngle = 1.5708;

// const gltfLoader = new GLTFLoader();
// const fbxLoader = new FBXLoader();

// const light = new Three.AmbientLight();

// let school: Three.InstancedMesh;

// scene.add(light);

// // gltfLoader.load('fish.glb', (data) => {
// //   const fish = data.scene.children[0] as Three.Mesh<Three.BufferGeometry, Three.MeshStandardMaterial>;
// //   fish.geometry.scale(0.001, 0.001, 0.001);
// //   fish.geometry.rotateX(-1.571);

// //   scene.add(fish);
// // });

// scene.add(new Three.AxesHelper(10));
// scene.add(new Tank({
//   loader: gltfLoader
// }));

// scene.add(new Submarine({
//   loader: gltfLoader,
// }));

// fbxLoader.load('fish.fbx', (data) => {

//   const scaleFactor = 0.0005;
//   data.scale.set(scaleFactor, scaleFactor, scaleFactor);
//   data.position.set(0, 1.5, 0);
//   const object = new Three.Object3D();
//   object.add(data);
//   object.name = 'Fish';
//   scene.add(object);
// });

// console.log(scene.children)

// const fish = scene.getObjectByName('Fish');
// let mixer: Three.AnimationMixer;

// if (fish != undefined) {
//   mixer = new Three.AnimationMixer(fish);
//   fish.animations.forEach(c => {
//     mixer.clipAction(c).play();
//   })
// }

// controls.addEventListener('change', () => {
//   console.log(camera.position);
// });

// scene.children.forEach((c) => {
//   if ('start' in c) {
//     (c as unknown as MonoBehaviour).start()
//   }
// });

// const timer = new Three.Clock(true);
// timer.start();

// console.log(mixer)

// const animate = () => {
//   controls.update();

//   scene.children.forEach((c) => {
//     if ('update' in c) {
//       //(c as unknown as MonoBehaviour).update(timer.getDelta());
//     }
//   });

//   if (mixer != undefined) {
//     mixer.update(timer.getDelta());
//   }

//   renderer.render(scene, camera);

//   requestAnimationFrame(animate);
// };

// window.addEventListener('resize', (_: UIEvent) => {
//   if (camera instanceof Three.PerspectiveCamera) {
//     camera.aspect = domElement.clientWidth / domElement.clientHeight;
//     camera.updateProjectionMatrix();
//   }

//   renderer.setSize(domElement.clientWidth, domElement.clientHeight);
// });

// animate();

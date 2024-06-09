import * as Three from 'three';
import {
  GLTFLoader,
  FBXLoader,
} from 'three/addons';
import { RenderOptions } from '~/types';
import Application from './application';

/**
 *
 * @param app
 * @param domElement
 */
export default async function render<T extends Application>(
  app: T,
  domElement?: HTMLElement | null,
  options: Partial<RenderOptions> = {}
): Promise<void> {
  domElement ??= document.body;

  window.application = await init(app, domElement, {
    camera: options.camera ?? {
      mode: 'perspective',
      fov: 45,
    },
  });

  window.addEventListener('resize', (_) => {
    if (window.application instanceof Application) {
      if (window.application.camera instanceof Three.PerspectiveCamera) {
        window.application.camera.aspect = domElement.clientWidth / domElement.clientHeight;
        window.application.camera.updateProjectionMatrix();
      }

      window.application.renderer.setSize(domElement.clientWidth, domElement.clientHeight);
    }
  });

  window.application.start();

  const clock = new Three.Clock(true);

  const animate = () => {
    window.requestAnimationFrame(animate);

    if (window.application instanceof Application) {
      window.application.update(clock.getDelta());
      window.application.renderer.render(window.application.scene, window.application.camera);
    }
  };

  animate();
}

/**
 *
 * @param app
 * @param domElement
 * @param options
 * @returns
 */
async function init<T extends Application>(
  app: T,
  domElement: HTMLElement,
  options: RenderOptions
): Promise<T> {
  const renderer = new Three.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.setSize(domElement.clientWidth, domElement.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  domElement.appendChild(renderer.domElement);

  let camera: Three.Camera;

  switch (options.camera.mode) {
    case 'perspective':
      camera = new Three.PerspectiveCamera(
        options.camera.fov,
        domElement.clientWidth / domElement.clientHeight,
        options.camera.near ?? 0.1,
        options.camera.far ?? 1000,
      );
      break;
    case 'orthographic':
      camera = new Three.OrthographicCamera(
        domElement.clientWidth / -2,
        domElement.clientWidth / 2,
        domElement.clientHeight / 2,
        domElement.clientHeight / -2,
        options.camera.near ?? 0.1,
        options.camera.far ?? 1000,
      );
      break;
  }

  app.renderer = renderer;
  app.camera = camera;
  app.fbx = new FBXLoader();
  app.gltf = new GLTFLoader();
  app.scene = new Three.Scene();

  await app.initialize();

  return app;
}

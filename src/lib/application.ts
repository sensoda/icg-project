import { Camera, Renderer, Scene } from 'three';
import { GLTFLoader, FBXLoader } from 'three/addons';
import type { MonoBehaviour } from '~/types';

/**
 *
 */
export default abstract class Application implements MonoBehaviour {

  public abstract name: string;

  /**
   *
   */
  public scene!: Scene;

  /**
   *
   */
  public camera!: Camera;

  /**
   *
   */
  public renderer!: Renderer;

  /**
   *
   */
  public gltf!: GLTFLoader;

  /**
   *
   */
  public fbx!: FBXLoader;

  /**
   *
   */
  public abstract initialize(): Promise<void>;

  public start(): void {
    this.scene.children.forEach(o => {
      if ('start' in o) {
        (o as any as MonoBehaviour).start();
      }
    });
  }

  public update(deltaTime: number): void {
    this.scene.children.forEach(o => {
      if ('update' in o) {
        (o as any as MonoBehaviour).update(deltaTime);
      }
    });
  }
}

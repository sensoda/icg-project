import * as Three from 'three';

/**
 *
 */
export interface MonoBehaviour {
  /**
   *
   */
  public name: string;

  /**
   *
   */
  public start(): void;

  /**
   *
   */
  public update(deltaTime: number): void;
}

/**
 *
 */
export interface RenderOptions {
  readonly camera: CameraConfiguration;
}

/**
 *
 */
type CameraConfiguration = OrthographicCameraConfiguration | PerspectiveCameraConfiguration;

/**
 *
 */
type OrthographicCameraConfiguration = {
  mode: 'orthographic',
} & Partial<GenericCameraConfiguration>;

/**
 *
 */
type PerspectiveCameraConfiguration = {
  mode: 'perspective',
  fov: number,
} & Partial<GenericCameraConfiguration>;

/**
 *
 */
type GenericCameraConfiguration = {
  near: number,
  far: number,
};

declare global {
  interface Window {

    /**
     *
     */
    public application: MonoBehaviour;
  }
}

import "./App.css";
//
import { Suspense, useEffect } from "react";
import { CanvasGPU } from "./CanvasGPU/CanvasGPU.tsx";
import {
  Center,
  Environment,
  Float,
  Gltf,
  OrbitControls,
  Sphere,
} from "@react-three/drei";
import { BloomPipeline } from "./CanvasGPU/BloomPipeline.tsx";
import { useThree } from "@react-three/fiber";
import { Color, Matrix4 } from "three";
import { color, fog, rangeFogFactor } from "three/tsl";
import { ObjectWater } from "./Objects/ObjectWater.tsx";
import { AvatarLobsterAI } from "./CanvasGPU/Lobster.tsx";

function App() {
  return (
    <>
      <CanvasGPU webgpu>
        <BloomPipeline />
        <Fog></Fog>
        <CamRig></CamRig>
        <ObjectWater></ObjectWater>

        <Suspense fallback={null}>
          <Environment environmentIntensity={0.5} files={[`/hdr/sky.hdr`]} />
          <group scale={70}>
            <group position={[0.3, 0.9 + 0.2, 3]}>
              <AvatarLobsterAI
                lobsterURL={`/avatar/lobsters/cowboy/mixamo-cowbody-rigged-transformed.glb`}
              ></AvatarLobsterAI>
            </group>
          </group>
          <Suspense
            fallback={
              <group>
                <Float floatIntensity={500}>
                  <Sphere position={[0, 0, 0]} args={[1, 128, 128]} scale={300}>
                    <meshPhysicalMaterial
                      transmission={1}
                      roughness={0}
                      metalness={0}
                      thickness={1}
                    ></meshPhysicalMaterial>
                  </Sphere>
                </Float>
              </group>
            }
          >
            <Gltf
              castShadow
              receiveShadow
              scale={1}
              src={`/config/hongkong-transformed.glb`}
            ></Gltf>

            <OrbitControls
              //
              enableZoom={true}
              enablePan={false}
              makeDefault
            ></OrbitControls>
          </Suspense>
        </Suspense>
      </CanvasGPU>
    </>
  );
}

function Fog() {
  const scene: any = useThree((r) => r.scene);
  useEffect(() => {
    if (!scene) {
      return;
    }
    if (scene) {
      //
      const skyColor = "#6df3ff";
      scene.fogNode = fog(
        color(new Color(skyColor)),
        rangeFogFactor(750, 1500),
      );
      scene.backgroundNode = color(new Color(skyColor));
    }
  }, [scene]);

  return null;
}

function CamRig() {
  const camera: any = useThree((r) => r.camera);

  useEffect(() => {
    if (!camera) {
      return;
    }

    const m4 = new Matrix4().fromArray([
      0.9840423933287578, 1.0408340855860843e-17, 0.1779341679717821, 0,
      0.05954104347474225, 0.9423517267593705, -0.3292842043213908, 0,
      -0.16767657043770076, 0.33462400253662705, 0.9273140485577785, 0,
      -136.6004999600759, 272.606995275635, 755.4517743435046, 1,
    ]);

    m4.decompose(camera.position, camera.quaternion, camera.scale);

    camera.fov = 50;
    camera.far = 15000;
    camera.near = 5;
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}
//

export default App;

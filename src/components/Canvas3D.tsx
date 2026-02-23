import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function WaterObject() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial
        color="#0077be"
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 1, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <WaterObject />
      <OrbitControls />
    </>
  );
}

export default function Canvas3D() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}

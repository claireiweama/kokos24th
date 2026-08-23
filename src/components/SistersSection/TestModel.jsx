import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/sisters2.0.glb");
  const { viewport } = useThree();

  const scale = Math.min(viewport.width / 2.3, 2.5);

  useFrame(() => {
    scene.rotation.y += 0.005;
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={[0, 0.5, 0]}
    />
  );
}

export default function TestModel() {
  return (
    <div className="w-full h-[450px] sm:h-[500px] md:h-[600px] lg:h-[650px]">
      <Canvas
        camera={{
          position: [0, 1, 5],
          fov: 45,
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <Model />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
}
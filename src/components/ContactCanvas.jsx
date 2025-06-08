import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const DeskModel = () => {
  const { scene } = useGLTF('/models/freedesktop.glb'); 
  return (
    <primitive
      object={scene}
      scale={3.75}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const ContactCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ height: '400px', width: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <DeskModel />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ContactCanvas;

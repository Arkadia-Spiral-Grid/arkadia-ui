// Example: client/src/components/CosmicCrystal3D.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

function RotatingCrystal() {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });
  return (
    <Box args={[2, 2, 2]} ref={meshRef}>
      <meshStandardMaterial attach="material" color="cyan" transparent opacity={0.6} roughness={0.1} metalness={0.9} />
    </Box>
  );
}

export function CosmicCrystal3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCrystal />
      <OrbitControls />
    </Canvas>
  );
}

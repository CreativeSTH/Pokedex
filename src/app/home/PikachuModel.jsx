import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

const PikachuModel = () => {
  const [error, setError] = useState(null);
  const geometry = useLoader(STLLoader, '/pikachu3d.stl', (loader) => {
    loader.load(
      '/pikachu3d.stl',
      (geometry) => {
        // Carga exitosa
      },
      undefined,
      (err) => {
        setError(err);
      }
    );
  });

  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const center = box.getCenter(new THREE.Vector3());
      meshRef.current.position.set(-center.x, -center.y, -center.z); // Centrar el modelo
      meshRef.current.scale.set(0.1, 0.1, 0.1); // Ajustar la escala si es necesario
    }
  }, [geometry]);

  if (error) {
    return <mesh><textGeometry args={['Error loading model', { font: 'helvetiker', size: 1, height: 0.1 }]} /></mesh>;
  }

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

const PikachuCanvas = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 20, 20]} />
      <PikachuModel />
    </Canvas>
  );
};

export default PikachuCanvas;
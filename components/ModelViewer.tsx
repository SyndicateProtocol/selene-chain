"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

export default function ModelViewer() {
	useEffect(() => {
		// preload on the client side
		useGLTF.preload("/moon20.glb");
	}, []);

	const { scene } = useGLTF("/moon20.glb");

	return (
		<div className="h-screen w-full">
			<Canvas
				shadows
				camera={{ position: [0, 0, 0], fov: 50 }}
				className="bg-black"
			>
				<ambientLight intensity={0.5} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					intensity={1}
					castShadow
				/>
				<pointLight position={[-10, -10, -10]} intensity={0.5} />
				<primitive object={scene} scale={1.5} position={[0, -1, 0]} />
				<OrbitControls
					enablePan={false}
					enableDamping
					dampingFactor={0.05}
					rotateSpeed={0.5}
					minDistance={3}
					maxDistance={10}
					autoRotate
					autoRotateSpeed={0.5}
				/>
			</Canvas>
		</div>
	);
}

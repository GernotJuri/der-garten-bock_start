"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState } from "react";

function Model({ url }: { url: string }) {
    const gltf = useGLTF(url);
    return <primitive object={gltf.scene} />;
}

export default function ThreeDViewer({ modelUrl }: { modelUrl: string }) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full aspect-video border-2 border-border organic-border garden-shadow">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
                    <span className="ml-3 text-black">Modell wird geladen...</span>
                </div>
            )}

            <Canvas
                camera={{ position: [0, 0, 2.5], fov: 50 }}
                onCreated={() => setLoading(false)}
            >
                <ambientLight intensity={0.75} />
                <directionalLight position={[3, 3, 3]} intensity={1} />
                <Suspense fallback={null}>
                    <Model url={modelUrl} />
                </Suspense>
                <OrbitControls
                    enableZoom
                    enablePan
                    minDistance={1.5}
                    maxDistance={4.5}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                    rotateSpeed={0.35}
                    zoomSpeed={0.35}
                    panSpeed={0.35}
                    dampingFactor={0.1}
                    enableDamping
                />
            </Canvas>
        </div>
    );
}

"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { RGBELoader } from "three/examples/jsm/Addons.js";
import Layout from "./components/Layout";

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && mountRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0.2, 4);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;  // Pour des couleurs plus réalistes
      // renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;  // Activer les ombres
      mountRef.current.appendChild(renderer.domElement);

      // Chargement de l'environnement HDRI
      const rgbeLoader = new RGBELoader().setPath('/hdri/');
      rgbeLoader.load('kiara_1_dawn_2k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;  // Utiliser HDRI comme environnement
        // scene.background = texture;  // Utiliser HDRI comme arrière-plan
      });

      // Charger le modèle GLB
      const loader = new GLTFLoader().setPath('/3dmodel/olympus_film_camera_pbr_scan_project3/');
      loader.load('scene.gltf', (gltf) => {
        const mesh = gltf.scene;
        mesh.position.set(0.05, -0.8, 0);
        mesh.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        scene.add(mesh);
      });

      // Ajout de contrôle de caméra
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 0.5;
      controls.maxDistance = 3;
      controls.maxPolarAngle = Math.PI / 2;

      // Lumière ambiante
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      scene.background = new THREE.Color(0x504644);

      // Lumière directionnelle
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 50;
      scene.add(directionalLight);

      // SpotLight pour des reflets spectaculaires
      const spotLight = new THREE.SpotLight(0xffffff, 0.5);
      spotLight.position.set(0, 5, 5);
      spotLight.angle = Math.PI / 8;
      spotLight.penumbra = 0.1;
      spotLight.castShadow = true;
      scene.add(spotLight);

      // Gestion du redimensionnement de la fenêtre
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Nettoyage
      return () => {
        mountRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }
  }, [isClient]);

  return (
    <Layout>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
    </Layout>
  );
}


"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from "three/examples/jsm/Addons.js";
// import Layout from "./Layout";

export default function ModelMoove() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && mountRef.current) {

      // Création de la scène et de la caméra
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
      35, // angles de vision
      window.innerWidth / window.innerHeight,
      0.1,
      1000
      );

      // Position de base de la caméra
      camera.position.set(0, 0.05, 3.5);

      // Création du rendu
      const renderer = new THREE.WebGLRenderer({ antialias: true });  // Activer l'antialiasing
      renderer.setSize(window.innerWidth, window.innerHeight);  // Taille de la fenêtre
      renderer.shadowMap.enabled = true;  // Activer les ombres
      mountRef.current.appendChild(renderer.domElement);  // Ajouter le rendu au DOM

      // Chargement de l'environnement HDRI (environment mapping)
      const rgbeLoader = new RGBELoader().setPath('/hdri/');
      rgbeLoader.load('kiara_1_dawn_2k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping; 
        scene.environment = texture;  // Utiliser HDRI comme environnement
        // scene.background = texture;  // Utiliser HDRI comme arrière-plan
      });

      scene.background = new THREE.Color(0x504644); // Couleur de l'arriere-plan
    //   scene.background = new THREE.Color(0x000000); // Couleur de l'arriere-plan transparante

      // Charger le modèle GLTF
      const loader = new GLTFLoader().setPath('/3dmodel/olympus_film_camera_pbr_scan_project3/');
      loader.load('scene.gltf', (gltf) => {
        const mesh = gltf.scene; // Utiliser la scène du modèle GLTF
        mesh.position.set(0.05, -0.8, 0); // Position de base du modèle
        scene.add(mesh); // Ajouter le modèle à la scène
      });



      // Lumière ambiante
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);      

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



      // OrbitControls
      // Ajout de contrôle de caméra
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 0.5;
      controls.maxDistance = 13;
      controls.maxPolarAngle = Math.PI / 2;

      // Gestion du redimensionnement de la fenêtre
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Mise à jour des contrôle
        renderer.render(scene, camera); // Affichage
      };
      animate();

      // Nettoyage
      return () => {
        mountRef.current?.removeChild(renderer.domElement); // Supprimer le rendu du DOM
        renderer.dispose(); // Nettoyer le rendu
      };
    }
  }, [isClient]); 

  return (
    // <Layout>
      <div ref={mountRef} style={{
        width: '100vw',
        height: '100vh',
        zIndex: 10, // Met en arrière-plan
      }} />
    //</Layout>
  );
}

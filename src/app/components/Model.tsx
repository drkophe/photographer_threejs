'use client'; 

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { HoverProvider, useHover } from "./HoverContext";

export default function Model() {
  // -- Déclaration des variables
  const mountRef = useRef<HTMLDivElement>(null); // Référence au div contenant le rendu

  // -- Définir les constantes neccessaires pour l'animation d'aimentation
  const mouse = new THREE.Vector2(0, 0); // Position de la souris normalisée pour Three.js
  const targetPosition = new THREE.Vector3(); // Position cible vers laquelle le modèle sera attiré

  const { isHovered, hoveredColor } = useHover();

  useEffect(() => {
    console.log("isHovered:", isHovered);
  }, [isHovered]);

  useEffect(() => {
            // Log pour tester l'état de isHovered
            // console.log("isHovered:", isHovered);
    /////////////////////////////// CREATE ///////////////////////////////
    // -- Création la scène et la caméra
    const scene = new THREE.Scene(); // Nouvelle scène
    const camera = new THREE.PerspectiveCamera( // Caméra perspectif
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0.05, 3.5); // Position de base de la caméra

    // -- Création du rendu
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.domElement.id = "canvas_fixed";
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0); // Transparence de la scène
    mountRef.current!.appendChild(renderer.domElement); // Ajouter le rendu au DOM

    // -- Création de l'environnement
    const rgbeLoader = new RGBELoader().setPath('/hdri/');
    rgbeLoader.load('kiara_1_dawn_2k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // -- Création du modèle
    const loader = new GLTFLoader().setPath('/3dmodel/olympus_film_camera_pbr_scan_project3/');
    let model: THREE.Object3D<THREE.Object3DEventMap>;
    loader.load('scene.gltf', (gltf) => {
      model = gltf.scene;
      model.position.set(0.13, -0.7, 0);
      // model.position.lerp(new THREE.Vector3(0.13, -0.7, 0), 0.2);
      scene.add(model);
    });

    //////////////////////////////// ANIMATION ///////////////////////////////

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let isBottomScroll = false; // Pour activer l'aimantation une fois en bas
    const radius = 3.5;
    const finalRadius = 5;
    const initialAngle = 0;
    const finalAngle = Math.PI;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / maxScroll;

      isBottomScroll = scrollProgress >= 1;

      if (scrollProgress < 0.8) {
        const adjustedProgress = scrollProgress / 0.8;
        const angle = initialAngle + adjustedProgress * (finalAngle - initialAngle);
        const currentRadius = adjustedProgress < 0.75
          ? radius
          : radius + (finalRadius - radius) * (adjustedProgress - 0.75) / 0.05;

        camera.position.x = currentRadius * Math.sin(angle);
        camera.position.z = currentRadius * Math.cos(angle);
        camera.position.y = 0.05;
        camera.lookAt(scene.position);
      } else {
        const progressInFinalStage = (scrollProgress - 0.8) / 0.2;
        camera.position.y = 0.05 + progressInFinalStage * -0.5;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    const onMouseMove = (event: { clientX: number; clientY: number; }) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      if (isBottomScroll && model) {
        const distance = 1.05; // Ajuste la force d'attraction vers la souris
        targetPosition.set(mouse.x * distance, mouse.y * (distance - 0.7), 0);
        model.position.lerp(targetPosition, 0.1); // La valeur 0.1 contrôle la vitesse d'aimantation
      }

      // Remettre le modele à sa position initiale si on est en haut de la page avec une animation
      if (!isBottomScroll && model) {
        model.position.lerp(new THREE.Vector3(0.13, -0.7, 0), 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose(); // 
    };
  }, [ isHovered, hoveredColor ]);

  return (
    <HoverProvider>
      <div
        ref={mountRef}
        className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
      />
    </HoverProvider>
  );
}

"use client";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from "three/examples/jsm/Addons.js";

export default function PhotographerFinal({ polaroid, camerax, cameray, cameraz, posx, posy, posz, rotx, roty, rotz }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculer la position horizontale pour la zone de détection
  const getHorizontalPosition = () => {
    if (camerax < -1) return "left-0";
    if (camerax > 1) return "right-0";
    return "left-1/2 -translate-x-1/2";
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && mountRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.set(camerax, cameray, cameraz);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 0);
      renderer.shadowMap.enabled = true;
      mountRef.current.appendChild(renderer.domElement);

      const rgbeLoader = new RGBELoader().setPath('/hdri/');
      rgbeLoader.load('brown_photostudio_02_2k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      });

      const loader = new GLTFLoader().setPath('/3dmodel/photographers/'+ polaroid +'/');
      loader.load('scene.gltf', (gltf) => {
        const mesh = gltf.scene;
        mesh.scale.set(0.1, 0.1, 0.1);
        mesh.position.set(posx, posy, posz);
        mesh.rotation.set(rotx, roty, rotz);
        scene.add(mesh);
      });

      // ... (reste des lumières inchangé)

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        mountRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }
  }, [isClient, camerax, cameray, cameraz, posx, posy, posz, rotx, roty, rotz, polaroid]);

  return (
    <div className="absolute w-full h-full">
      <div 
        ref={mountRef} 
        className={`w-screen h-screen absolute bottom-0 transition-transform duration-300 ease-out ${
          isHovered ? 'transform translate-y-[-20px]' : ''
        }`}
      />
      <div
        className={`absolute ${getHorizontalPosition()} bottom-0 w-1/3 h-1/2 cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// "use client";
// import * as THREE from "three";
// import { useEffect, useRef, useState } from "react";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { RGBELoader } from "three/examples/jsm/Addons.js";

// export default function PhotographerFinal({ polaroid, camerax, cameray, cameraz, posx, posy, posz, rotx, roty, rotz }) {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const modelRef = useRef<THREE.Group | null>(null);
//   const initialYPosition = posy;
//   const [isClient, setIsClient] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   // Calculer la position horizontale pour la zone de détection
//   const getHorizontalPosition = () => {
//     if (camerax < -1) return "left-0";
//     if (camerax > 1) return "right-0";
//     return "left-1/2 -translate-x-1/2";
//   };

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (isClient && mountRef.current) {
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000);
//       camera.position.set(camerax, cameray, cameraz);

//       const renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setClearColor(0xffffff, 0);
//       renderer.shadowMap.enabled = true;
//       mountRef.current.appendChild(renderer.domElement);

//       // Gestionnaires d'événements pour le survol
//       const handleMouseEnter = () => setIsHovered(true);
//       const handleMouseLeave = () => setIsHovered(false);

//       mountRef.current.addEventListener('mouseenter', handleMouseEnter);
//       mountRef.current.addEventListener('mouseleave', handleMouseLeave);

//       const rgbeLoader = new RGBELoader().setPath('/hdri/');
//       rgbeLoader.load('brown_photostudio_02_2k.hdr', (texture) => {
//         texture.mapping = THREE.EquirectangularReflectionMapping;
//         scene.environment = texture;
//       });

//       // ... (reste du code Three.js inchangé)

//       const loader = new GLTFLoader().setPath('/3dmodel/photographers/'+ polaroid +'/');
//       loader.load('scene.gltf', (gltf) => {
//         const mesh = gltf.scene;
//         mesh.scale.set(0.1, 0.1, 0.1);
//         mesh.position.set(posx, posy, posz);
//         mesh.rotation.set(rotx, roty, rotz);
//         modelRef.current = mesh;
//         scene.add(mesh);
//       });

//       const animate = () => {
//         requestAnimationFrame(animate);
//         if (modelRef.current) {
//           const targetY = isHovered ? initialYPosition + 0.2 : initialYPosition;
//           modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.1;
//         }
//         renderer.render(scene, camera);
//       };
//       animate();

//       return () => {
//         mountRef.current?.removeEventListener('mouseenter', handleMouseEnter);
//         mountRef.current?.removeEventListener('mouseleave', handleMouseLeave);
//         mountRef.current?.removeChild(renderer.domElement);
//         renderer.dispose();
//       };

//       // ... (reste du code de nettoyage inchangé)
//     }
//   }, [isClient, isHovered, camerax, cameray, cameraz, posx, posy, posz, rotx, roty, rotz, polaroid, initialYPosition]);

//   return (
//     <div className="absolute w-full h-full">
//       <div 
//         ref={mountRef} 
//         className="w-screen h-screen absolute bottom-0"
//       />
//       {/* Zone de détection de survol séparée */}
//       <div
//         className={`absolute ${getHorizontalPosition()} bottom-0 w-1/3 h-1/2 cursor-pointer z-50`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       />
//     </div>
//   );
// }




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// "use client";

// import * as THREE from "three";
// import { useEffect, useRef, useState } from "react";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { RGBELoader } from "three/examples/jsm/Addons.js";

// export default function PhotographerFinal({ polaroid, camerax, cameray, cameraz, posx, posy, posz, rotx, roty, rotz }) {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const modelRef = useRef<THREE.Group | null>(null); // Référence pour le modèle
//   const initialYPosition = posy; // Garder la position Y initiale
//   const [isClient, setIsClient] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (isClient && mountRef.current) {
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(
//         35,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         2000
//       );

//       camera.position.set(camerax, cameray, cameraz);

//       const renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setClearColor(0xffffff, 0);
//       renderer.shadowMap.enabled = true;
//       mountRef.current.appendChild(renderer.domElement);

//       // Gestionnaires d'événements pour le survol
//       const handleMouseEnter = () => setIsHovered(true);
//       const handleMouseLeave = () => setIsHovered(false);

//       mountRef.current.addEventListener('mouseenter', handleMouseEnter);
//       mountRef.current.addEventListener('mouseleave', handleMouseLeave);

//       const rgbeLoader = new RGBELoader().setPath('/hdri/');
//       rgbeLoader.load('brown_photostudio_02_2k.hdr', (texture) => {
//         texture.mapping = THREE.EquirectangularReflectionMapping;
//         scene.environment = texture;
//       });

//       const loader = new GLTFLoader().setPath('/3dmodel/photographers/'+ polaroid +'/');
//       loader.load('scene.gltf', (gltf) => {
//         const mesh = gltf.scene;
//         mesh.scale.set(0.1, 0.1, 0.1);
//         mesh.position.set(posx, posy, posz);
//         mesh.rotation.set(rotx, roty, rotz);
//         modelRef.current = mesh; // Sauvegarder la référence du modèle
//         scene.add(mesh);
//       });

//       // ... (reste des lumières inchangé)

//       // Gestion du redimensionnement de la fenêtre
//       window.addEventListener('resize', () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//       });

//       // Animation modifiée
//       const animate = () => {
//         requestAnimationFrame(animate);
        
//         // Animation au survol
//         if (modelRef.current) {
//           const targetY = isHovered ? initialYPosition + 0.2 : initialYPosition; // Remonte de 0.2 unités
//           modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.1; // Animation fluide
//         }

//         renderer.render(scene, camera);
//       };
//       animate();

//       return () => {
//         mountRef.current?.removeEventListener('mouseenter', handleMouseEnter);
//         mountRef.current?.removeEventListener('mouseleave', handleMouseLeave);
//         mountRef.current?.removeChild(renderer.domElement);
//         renderer.dispose();
//       };
//     }
//   }, [isClient, isHovered]); // Ajout de isHovered aux dépendances

//   return (
//     <div 
//       ref={mountRef} 
//       className="z-10 w-screen h-screen absolute bottom-0 cursor-pointer"
//     />
//   );
// }




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// "use client";

// import * as THREE from "three";
// import { useEffect, useRef, useState } from "react";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { RGBELoader } from "three/examples/jsm/Addons.js";

// export default function PhotographerFinal({ polaroid, camerax, cameray, cameraz, posx, posy, posz, rotx, roty, rotz }) {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (isClient && mountRef.current) {

//       // Création de la scène et de la caméra
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(
//       35, // angles de vision
//       window.innerWidth / window.innerHeight,
//       0.1,
//       2000
//       );

//       // Position de base de la caméra
//       camera.position.set(camerax, cameray, cameraz);
//       // camera.position.set(0, 0.05, 7);
//     //   camera.position.set(0, 0.05, 3.5);

//       // Création du rendu
//       const renderer = new THREE.WebGLRenderer({ antialias: true });  // Activer l'antialiasing
      
//       renderer.setSize(window.innerWidth, window.innerHeight);  // Taille de la fenêtre
//       renderer.setClearColor(0xffffff, 0);
//       renderer.shadowMap.enabled = true;  // Activer les ombres
//       mountRef.current.appendChild(renderer.domElement);  // Ajouter le rendu au DOM

//       // Chargement de l'environnement HDRI (environment mapping)
//       const rgbeLoader = new RGBELoader().setPath('/hdri/');
//       rgbeLoader.load('brown_photostudio_02_2k.hdr', (texture) => {
//         texture.mapping = THREE.EquirectangularReflectionMapping; 
//         scene.environment = texture;  // Utiliser HDRI comme environnement
//       });

//       // Charger le modèle GLTF
//       const loader = new GLTFLoader().setPath('/3dmodel/photographers/'+ polaroid +'/');
//       loader.load('scene.gltf', (gltf) => {
//         const mesh = gltf.scene; // Utiliser la scène du modèle GLTF
//         mesh.scale.set(0.1, 0.1, 0.1); // Ajuste les valeurs pour réduire la taille
//         mesh.position.set(posx, posy, posz); // Position de base du modèle
//         mesh.rotation.set(rotx, roty, rotz); // Rotation de base du modèle
//         // mesh.position.set(0, -1.2, 0); // Position de base du modèle

//         scene.add(mesh); // Ajouter le modèle à la scène
//       });

//       // Lumière ambiante
//       const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//       scene.add(ambientLight);      

//       // Lumière directionnelle
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(5, 10, 7.5);
//       directionalLight.castShadow = true;
//       directionalLight.shadow.mapSize.width = 1024;
//       directionalLight.shadow.mapSize.height = 1024;
//       directionalLight.shadow.camera.near = 0.1;
//       directionalLight.shadow.camera.far = 50;
//       scene.add(directionalLight);

//       // SpotLight pour des reflets spectaculaires
//       const spotLight = new THREE.SpotLight(0xffffff, 0.5);
//       spotLight.position.set(0, 5, 5);
//       spotLight.angle = Math.PI / 8;
//       spotLight.penumbra = 0.1;
//       spotLight.castShadow = true;
//       scene.add(spotLight);

//       // Ombres
//       spotLight.shadow.mapSize.width = 1024;
//       spotLight.shadow.mapSize.height = 1024;
//       spotLight.shadow.camera.near = 0.1;
//       spotLight.shadow.camera.far = 50;

//       // Gestion du redimensionnement de la fenêtre
//       window.addEventListener('resize', () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//       });

//       // Animation
//       const animate = () => {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera); // Affichage
//       };
//       animate();

//       // Nettoyage
//       return () => {
//         mountRef.current?.removeChild(renderer.domElement); // Supprimer le rendu du DOM
//         renderer.dispose(); // Nettoyer le rendu
//       };
//     }
//   }, [isClient]); 

//   return (
//       <div ref={mountRef} className="z-10 w-screen h-screen absolute bottom-0"/>
//   );
// }

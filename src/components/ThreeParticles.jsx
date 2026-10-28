import { useEffect, useRef } from "react";
import * as THREE from "three";

// Réseau de particules interactif (constellation + répulsion au curseur),
// avec une nébuleuse de fond pour la profondeur. Décoratif, en fond du hero.
function ThreeParticles() {
   const mountRef = useRef(null);

   useEffect(() => {
      const mount = mountRef.current;
      if (!mount) return;

      const reduce = window.matchMedia?.(
         "(prefers-reduced-motion: reduce)"
      ).matches;

      let width = mount.clientWidth || window.innerWidth;
      let height = mount.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 200);
      camera.position.z = 34;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // ── Nébuleuse de fond (starfield lointain) ──────────────
      const bgCount = 650;
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount; i++) {
         bgPos[i * 3] = (Math.random() - 0.5) * 120;
         bgPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
         bgPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20;
      }
      const bgGeo = new THREE.BufferGeometry();
      bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
      const bgMat = new THREE.PointsMaterial({
         color: 0xffffff,
         size: 0.14,
         transparent: true,
         opacity: 0.35,
         depthWrite: false,
         blending: THREE.AdditiveBlending,
      });
      const bgPoints = new THREE.Points(bgGeo, bgMat);
      scene.add(bgPoints);

      // ── Réseau interactif ───────────────────────────────────
      const N = 110;
      const BOUND = { x: 30, y: 19, z: 10 };
      const LINK = 6.4; // distance max de connexion
      const nodes = [];
      for (let i = 0; i < N; i++) {
         nodes.push({
            x: (Math.random() - 0.5) * BOUND.x * 2,
            y: (Math.random() - 0.5) * BOUND.y * 2,
            z: (Math.random() - 0.5) * BOUND.z * 2,
            vx: (Math.random() - 0.5) * 0.05,
            vy: (Math.random() - 0.5) * 0.05,
            vz: (Math.random() - 0.5) * 0.03,
         });
      }

      // Points (couleurs : blanc + accents orange)
      const nodePos = new Float32Array(N * 3);
      const nodeCol = new Float32Array(N * 3);
      const white = new THREE.Color(0xffffff);
      const orange = new THREE.Color(0xe69112);
      for (let i = 0; i < N; i++) {
         const c = Math.random() < 0.22 ? orange : white;
         nodeCol[i * 3] = c.r;
         nodeCol[i * 3 + 1] = c.g;
         nodeCol[i * 3 + 2] = c.b;
      }
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
      nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeCol, 3));
      const nodeMat = new THREE.PointsMaterial({
         size: 0.34,
         vertexColors: true,
         transparent: true,
         opacity: 0.95,
         depthWrite: false,
         blending: THREE.AdditiveBlending,
      });
      const nodePoints = new THREE.Points(nodeGeo, nodeMat);
      scene.add(nodePoints);

      // Lignes de connexion (capacité max préallouée)
      const maxLines = (N * (N - 1)) / 2;
      const linePos = new Float32Array(maxLines * 2 * 3);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({
         color: 0x9ac2ff,
         transparent: true,
         opacity: 0.16,
         depthWrite: false,
         blending: THREE.AdditiveBlending,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      // ── Souris ──────────────────────────────────────────────
      const ndc = new THREE.Vector2(0, 0);
      let hasMouse = false;
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const mouseWorld = new THREE.Vector3(9999, 9999, 9999);
      let px = 0,
         py = 0; // parallax lissé

      const onMove = (e) => {
         hasMouse = true;
         ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
         ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", onMove);

      const REPEL = 5.5;
      const clock = new THREE.Clock();
      let raf;

      const frame = () => {
         const dt = Math.min(clock.getDelta(), 0.05);

         // Position monde du curseur (plan z = 0)
         if (hasMouse) {
            raycaster.setFromCamera(ndc, camera);
            raycaster.ray.intersectPlane(plane, mouseWorld);
         }

         // Mise à jour des nœuds
         const posAttr = nodeGeo.attributes.position;
         for (let i = 0; i < N; i++) {
            const n = nodes[i];
            n.x += n.vx;
            n.y += n.vy;
            n.z += n.vz;

            // rebond dans la boîte
            if (n.x < -BOUND.x || n.x > BOUND.x) n.vx *= -1;
            if (n.y < -BOUND.y || n.y > BOUND.y) n.vy *= -1;
            if (n.z < -BOUND.z || n.z > BOUND.z) n.vz *= -1;

            // répulsion par le curseur
            if (hasMouse) {
               const dx = n.x - mouseWorld.x;
               const dy = n.y - mouseWorld.y;
               const d2 = dx * dx + dy * dy;
               if (d2 < REPEL * REPEL && d2 > 0.001) {
                  const d = Math.sqrt(d2);
                  const f = ((REPEL - d) / REPEL) * 0.6;
                  n.x += (dx / d) * f;
                  n.y += (dy / d) * f;
               }
            }

            nodePos[i * 3] = n.x;
            nodePos[i * 3 + 1] = n.y;
            nodePos[i * 3 + 2] = n.z;
         }
         posAttr.needsUpdate = true;

         // Connexions
         let ptr = 0;
         const link2 = LINK * LINK;
         for (let i = 0; i < N; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < N; j++) {
               const b = nodes[j];
               const dx = a.x - b.x;
               const dy = a.y - b.y;
               const dz = a.z - b.z;
               const d2 = dx * dx + dy * dy + dz * dz;
               if (d2 < link2) {
                  linePos[ptr++] = a.x;
                  linePos[ptr++] = a.y;
                  linePos[ptr++] = a.z;
                  linePos[ptr++] = b.x;
                  linePos[ptr++] = b.y;
                  linePos[ptr++] = b.z;
               }
            }
         }
         lineGeo.setDrawRange(0, ptr / 3);
         lineGeo.attributes.position.needsUpdate = true;

         // Rotation douce + parallax caméra
         bgPoints.rotation.y += dt * 0.02;
         nodePoints.rotation.y += dt * 0.006;
         lines.rotation.y = nodePoints.rotation.y;

         px += (ndc.x - px) * 0.04;
         py += (ndc.y - py) * 0.04;
         camera.position.x = px * 6;
         camera.position.y = py * 4;
         camera.lookAt(scene.position);

         renderer.render(scene, camera);
         raf = requestAnimationFrame(frame);
      };

      if (reduce) {
         // rendu statique
         for (let i = 0; i < N; i++) {
            nodePos[i * 3] = nodes[i].x;
            nodePos[i * 3 + 1] = nodes[i].y;
            nodePos[i * 3 + 2] = nodes[i].z;
         }
         nodeGeo.attributes.position.needsUpdate = true;
         lineGeo.setDrawRange(0, 0);
         renderer.render(scene, camera);
      } else {
         frame();
      }

      const onResize = () => {
         width = mount.clientWidth || window.innerWidth;
         height = mount.clientHeight || window.innerHeight;
         camera.aspect = width / height;
         camera.updateProjectionMatrix();
         renderer.setSize(width, height);
      };
      window.addEventListener("resize", onResize);

      return () => {
         cancelAnimationFrame(raf);
         window.removeEventListener("mousemove", onMove);
         window.removeEventListener("resize", onResize);
         bgGeo.dispose();
         bgMat.dispose();
         nodeGeo.dispose();
         nodeMat.dispose();
         lineGeo.dispose();
         lineMat.dispose();
         renderer.dispose();
         if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
         }
      };
   }, []);

   return (
      <div
         ref={mountRef}
         aria-hidden="true"
         className="absolute inset-0 z-[5] pointer-events-none"
      />
   );
}

export default ThreeParticles;

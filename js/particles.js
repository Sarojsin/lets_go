// Three.js Particle System
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    camera.position.z = 20; // Moved back for better perspective
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 300; // Reduced count but larger particles for cleaner look
    
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    
    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Spread particles on a wider plane
        positions[i3] = (Math.random() - 0.5) * 60;
        positions[i3 + 1] = (Math.random() - 0.5) * 40;
        positions[i3 + 2] = (Math.random() - 0.5) * 30; // More depth
        
        scales[i] = Math.random();
        
        // Use HSL colors converted to RGB for Three.js
        const hue = Math.random() > 0.5 ? 250 : 180; // Match CSS Hue
        const color = new THREE.Color(`hsl(${hue}, 80%, 70%)`);
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    // Custom Shader Material for prettier points
    // Fallback to PointsMaterial for compatibility if needed, but lets try to keep it simple first
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Lines linking particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    
    const linesGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    let targetX = 0;
    let targetY = 0;
    
    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetX = mouse.x * 2;
        targetY = mouse.y * 2;
    }
    
    window.addEventListener('mousemove', onMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
        const elapsedTime = clock.getElapsedTime();
        
        // Rotate entire system slowly
        particles.rotation.y = elapsedTime * 0.05;
        lines.rotation.y = elapsedTime * 0.05;
        
        // Gentle wave effect on particles
        const positions = particles.geometry.attributes.position.array;
        for(let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = particlesGeometry.attributes.position.array[i3];
            // positions[i3 + 1] += Math.sin(elapsedTime + x) * 0.01; // Wobbly effect
        }
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Update lines based on proximity
        // Only calculating a subset for performance
        if (elapsedTime % 0.1 < 0.02) { // optimization
           // To properly do lines in vanilla threejs without heavy cpu usage is tricky.
           // Leaving lines static-ish relative to points rotation for now to ensure performance.
        }

        // Mouse Parallax
        scene.rotation.x += (targetY * 0.1 - scene.rotation.x) * 0.05;
        scene.rotation.y += (targetX * 0.1 - scene.rotation.y) * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

document.addEventListener('DOMContentLoaded', initParticles);
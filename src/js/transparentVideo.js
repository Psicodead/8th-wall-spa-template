const transparentVideo = () => {
    var resolution = 1;
    var scale = 1.8;
    var lastUpdate;
    var container;
    var camera, scene, renderer;
    var uniforms;
    var videoTexture;

    function init(showStats) {
        // stats
        // if (showStats) {
        //     var stats = new Stats();
        //     stats.domElement.style.zIndex = '200';
        //     stats.domElement.style.position = 'absolute';
        //     stats.domElement.style.left = '0';
        //     stats.domElement.style.top = '0';
        //     document.body.appendChild(stats.domElement);
        //     requestAnimationFrame(function updateStats() {
        //         stats.update();
        //         requestAnimationFrame(updateStats);
        //     });
        // }

        // basic setup
        container = document.getElementById('animation-container');
        camera = new THREE.Camera();
        camera.position.z = 1;
        scene = new THREE.Scene();
        console.log(THREE);
        // load video
        var video = document.getElementById('player');
        videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;

        // shader stuff
        uniforms = {
            time: { type: "f", value: 1.0 },
            texture: { type: "sampler2D", value: videoTexture }
        };
        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            transparent: true
        });
        lastUpdate = new Date().getTime();

        // put it together for rendering
        var geometry = new THREE.PlaneBufferGeometry(0.9*scale, 1.6*scale);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(0.8);
        scene.add(mesh);
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio / resolution);
        container.appendChild(renderer.domElement);

        // event listeners
        document.getElementById('ally-logo').addEventListener('click', e => {
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }
        });
        //document.getElementById('stop-button').addEventListener('click', e => { video.pause(); });
        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);
        //document.getElementById('resolution').addEventListener('change', onResolutionChange, false);
    }

    // events
    function onWindowResize(evt) {
        renderer.setSize(window.innerHeight, window.innerHeight);
    }
    function onResolutionChange(evt) {
        var newResolutionScale = parseFloat(evt.target.value);
        renderer.setPixelRatio(window.devicePixelRatio / newResolutionScale);
    }
    function animate() {
        var currentTime = new Date().getTime()
        var timeSinceLastUpdate = currentTime - lastUpdate;
        lastUpdate = currentTime;

        requestAnimationFrame(animate);
        render(timeSinceLastUpdate);
    }
    function render(timeDelta) {
        uniforms.time.value += (timeDelta ? timeDelta / 1000 : 0.05);
        renderer.render(scene, camera);
    }

    // boot
    init(true);
    animate();


}

export { transparentVideo }
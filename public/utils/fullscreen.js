class GridToFullscreenEffect {
    constructor(e, n, t = {}) {
        this.container = e, this.itemsWrapper = n, this.itemsWrapperChildren = n.querySelectorAll(".trigger-item"), this.initialised = !1, this.camera = null, this.scene = null, this.renderer = null, t.scrollContainer = t.scrollContainer || null, t.timing = t.timing || {}, t.timing.type = t.timing.type || "sameEnd", t.timing.sections = t.timing.sections || 1, t.timing.latestStart = t.timing.latestStart || .5, t.timing.duration = t.timing.duration || 1, t.transformation = t.transformation || {}, t.transformation.type = t.transformation.type || "none", t.transformation.props = t.transformation.props || {}, t.activation.type = t.activation.type || "none", t.seed = t.seed || 0, t.easings = t.easings || {}, t.easings.toFullscreen = t.easings.toFullscreen || Power0.easeNone, t.easings.toGrid = t.easings.toGrid || Power0.easeNone, t.flipBeizerControls = t.flipBeizerControls || {}, t.flipBeizerControls.c0 = t.flipBeizerControls.c0 || {}, t.flipBeizerControls.c0.x = t.flipBeizerControls.c0.x || .5, t.flipBeizerControls.c0.y = t.flipBeizerControls.c0.y || .5, t.flipBeizerControls.c1 = t.flipBeizerControls.c1 || {}, t.flipBeizerControls.c1.x = t.flipBeizerControls.c1.x || .5, t.flipBeizerControls.c1.y = t.flipBeizerControls.c1.y || .5, this.options = t, this.uniforms = {
            uImage: new THREE.Uniform(null),
            uImageRes: new THREE.Uniform(new THREE.Vector2(1, 1)),
            uImageLarge: new THREE.Uniform(null),
            uImageLargeRes: new THREE.Uniform(new THREE.Vector2(1, 1)),
            uProgress: new THREE.Uniform(0),
            uMeshScale: new THREE.Uniform(new THREE.Vector2(1, 1)),
            uPlaneCenter: new THREE.Uniform(new THREE.Vector2(0, 0)),
            uViewSize: new THREE.Uniform(new THREE.Vector2(1, 1)),
            uScaleToViewSize: new THREE.Uniform(new THREE.Vector2(1, 1)),
            uClosestCorner: new THREE.Uniform(0),
            uMouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
            uSeed: new THREE.Uniform(t.seed),
            uProgressByParts: new THREE.Uniform("sections" === t.timing.type),
            uActivationParts: new THREE.Uniform(t.timing.sections),
            uSyncLatestStart: new THREE.Uniform(t.timing.latestStart),
            uBeizerControls: new THREE.Uniform(new THREE.Vector4(t.flipBeizerControls.c0.x, t.flipBeizerControls.c0.y, t.flipBeizerControls.c1.x, t.flipBeizerControls.c1.y))
        }, this.textures = [], this.currentImageIndex = -1, this.isFullscreen = !1, this.isAnimating = !1, this.onResize = this.onResize = this.onResize.bind(this)
    }
    resetUniforms() {
        this.uniforms.uMeshScale.value = new THREE.Vector2(1, 1), this.uniforms.uPlaneCenter.value = new THREE.Vector2(0, 0), this.uniforms.uScaleToViewSize.value = new THREE.Vector2(1, 1), this.uniforms.uClosestCorner.value = 0, this.uniforms.uMouse.value = new THREE.Vector2(0, 0), this.uniforms.uImage.value = null, this.uniforms.uImageRes.value = new THREE.Vector2(1, 1), this.uniforms.uImageLarge.value = null, this.uniforms.uImageLargeRes.value = new THREE.Vector2(1, 1);
        const e = this.mesh;
        e.scale.x = 1e-5, e.scale.y = 1e-5, e.position.x = 0, e.position.y = 0
    }
    createTextures(e) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
            const r = e[t],
                i = new THREE.Texture(r.large.image);
            i.generateMipmaps = !1, i.wrapS = i.wrapT = THREE.ClampToEdgeWrapping, i.minFilter = THREE.LinearFilter, i.needsUpdate = !0;
            const o = new THREE.Texture(r.small.image);
            o.generateMipmaps = !1, o.wrapS = o.wrapT = THREE.ClampToEdgeWrapping, o.minFilter = THREE.LinearFilter, o.needsUpdate = !0;
            const s = {
                large: {
                    element: r.large.element,
                    texture: i
                },
                small: {
                    element: r.small.element,
                    texture: o
                }
            };
            n.push(s)
        }
        this.textures = n, this.setCurrentTextures()
    }
    setCurrentTextures() {
        if (-1 === this.currentImageIndex) return;
        const e = this.textures[this.currentImageIndex];
        this.uniforms.uImage.value = e.small.texture, this.uniforms.uImageRes.value.x = e.small.texture.image.naturalWidth, this.uniforms.uImageRes.value.y = e.small.texture.image.naturalHeight, this.uniforms.uImageLarge.value = e.large.texture, this.uniforms.uImageLargeRes.value.x = e.large.texture.image.naturalWidth, this.uniforms.uImageLargeRes.value.y = e.large.texture.image.naturalHeight, this.isAnimating || this.render()
    }
    init() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: !0,
            antialias: !0
        }), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(window.innerWidth, window.innerHeight), this.container.appendChild(this.renderer.domElement), this.scene = new THREE.Scene, this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1e4), this.camera.position.z = 50, this.camera.lookAt = this.scene.position;
        const e = this.getViewSize();
        this.uniforms.uViewSize.value = new THREE.Vector2(e.width, e.height);
        var n = new THREE.PlaneBufferGeometry(1, 1, 128, 128);
        const t = (r = this.options.transformation.type) && "[object Function]" === {}.toString.call(r) ? this.options.transformation.type(this.options.transformation.props) : transformations[this.options.transformation.type](this.options.transformation.props);
        var r;
        const i = generateShaders(activations[this.options.activation.type], t);
        var o = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: i.vertex,
            fragmentShader: i.fragment,
            side: THREE.DoubleSide
        });
        this.mesh = new THREE.Mesh(n, o), this.scene.add(this.mesh), window.addEventListener("resize", this.onResize), this.options.scrollContainer && this.options.scrollContainer.addEventListener("scroll", (e => {
            this.recalculateUniforms(e)
        }));
        for (let e = 0; e < this.itemsWrapperChildren.length; e++) {
            this.itemsWrapperChildren[e].children[0].addEventListener("click", this.createOnMouseDown(e))
        }
    }
    createOnMouseDown(e) {
        return n => {
            this.toFullscreen(e, n)
        }
    }
    toGrid() {
        this.isFullscreen && !this.isAnimating && (this.isAnimating = !0, this.options.onToGridStart && this.options.onToGridStart({
            index: this.currentImageIndex
        }), this.tween = TweenLite.to(this.uniforms.uProgress, this.options.timing.duration, {
            value: 0,
            ease: this.options.easings.toGrid,
            onUpdate: () => {
                this.render()
            },
            onComplete: () => {
                this.isAnimating = !1, this.isFullscreen = !1, this.itemsWrapper.style.zIndex = 1, this.container.style.zIndex = 0, this.resetUniforms(), this.render(), this.options.onToGridFinish && this.options.onToGridFinish({
                    index: -1,
                    lastIndex: this.currentImageIndex
                }), this.currentImageIndex = -1
            }
        }))
    }
    recalculateUniforms(e) {
        if (-1 === this.currentImageIndex) return;
        const n = this.itemsWrapperChildren[this.currentImageIndex].children[0].getBoundingClientRect(),
            t = {
                x: (e.clientX - n.left) / n.width,
                y: 1 - (e.clientY - n.top) / n.height
            },
            r = 2 * (n.left > window.innerWidth - (n.left + n.width)) + (n.top > window.innerHeight - (n.top + n.height));
        this.uniforms.uClosestCorner.value = r, this.uniforms.uMouse.value = new THREE.Vector2(t.x, t.y);
        const i = this.getViewSize(),
            o = n.width * i.width / window.innerWidth,
            s = n.height * i.height / window.innerHeight,
            a = n.left * i.width / window.innerWidth - i.width / 2,
            l = n.top * i.height / window.innerHeight - i.height / 2,
            u = (this.mesh.geometry, this.mesh);
        u.scale.x = o, u.scale.y = s;
        let c = a + o / 2,
            m = -l - s / 2;
        u.position.x = c, u.position.y = m, this.uniforms.uPlaneCenter.value.x = c / o, this.uniforms.uPlaneCenter.value.y = m / s, this.uniforms.uMeshScale.value.x = o, this.uniforms.uMeshScale.value.y = s, this.uniforms.uScaleToViewSize.value.x = i.width / o - 1, this.uniforms.uScaleToViewSize.value.y = i.height / s - 1
    }
    toFullscreen(e, n) {
        if (!this.isFullscreen && !this.isAnimating) {
            if (this.isAnimating = !0, this.currentImageIndex = e, this.recalculateUniforms(n), this.textures[e]) {
                const n = this.textures[e];
                this.uniforms.uImage.value = n.small.texture, this.uniforms.uImageRes.value.x = n.small.texture.image.naturalWidth, this.uniforms.uImageRes.value.y = n.small.texture.image.naturalHeight, this.uniforms.uImageLarge.value = n.large.texture, this.uniforms.uImageLargeRes.value.x = n.large.texture.image.naturalWidth, this.uniforms.uImageLargeRes.value.y = n.large.texture.image.naturalHeight
            }
            this.itemsWrapper.style.zIndex = 0, this.container.style.zIndex = 2, this.options.onToFullscreenStart && this.options.onToFullscreenStart({
                index: this.currentImageIndex
            }), this.tween = TweenLite.to(this.uniforms.uProgress, this.options.timing.duration, {
                value: 1,
                ease: this.options.easings.toFullscreen,
                onUpdate: () => {
                    this.render()
                },
                onComplete: () => {
                    this.isAnimating = !1, this.isFullscreen = !0, this.options.onToFullscreenFinish && this.options.onToFullscreenFinish({
                        index: this.currentImageIndex
                    })
                }
            })
        }
    }
    getViewSize() {
        const e = this.camera.fov * Math.PI / 180,
            n = Math.abs(this.camera.position.z * Math.tan(e / 2) * 2);
        return {
            width: n * this.camera.aspect,
            height: n
        }
    }
    render() {
        this.renderer.render(this.scene, this.camera)
    }
    onResize(e) {
        this.camera.aspect = window.innerWidth / window.innerHeight, this.camera.updateProjectionMatrix(), this.renderer.setSize(window.innerWidth, window.innerHeight), this.currentImageIndex > -1 && (this.recalculateUniforms(e), this.render())
    }
}
var activations = {
    none: "float getActivation(vec2 uv){return 0.;}",
    corners: "\n    float getActivation(vec2 uv){\n      float top = (1.-uv.y);\n      float right = uv.x;\n      float bottom = uv.y;\n      float left = 1.- uv.x;\n\n      return top *0.333333 + (right * 0.333333 + (right * bottom)*0.666666 );\n  }\n  ",
    topLeft: "\n    float getActivation(vec2 uv){\n        return (+uv.x-uv.y+1.)/2.;\n    }\n  ",
    sides: "\n      float getActivation(vec2 uv){\n        return min(uv.x, 1.-uv.x) * 2.;\n      }\n  ",
    left: "\n    float getActivation(vec2 uv){\n        return uv.x;\n    }\n    ",
    top: "\n    float getActivation(vec2 uv){\n        return 1. - uv.y;\n    }\n    ",
    bottom: "\n    float getActivation(vec2 uv){\n        return uv.y;\n    }\n    ",
    bottomStep: "\n    float getActivation(vec2 uv){\n        \n        \n        return uv.y;\n    }\n    ",
    sinX: "\n      float getActivation(vec2 uv){\n        return sin(uv.x * 3.14);\n      }\n    ",
    center: "\n      float getActivation(vec2 uv){\n        float maxDistance = distance(vec2(0.),vec2(0.5));\n        float dist = distance(vec2(0.), uv-0.5);\n        return smoothstep(0.,maxDistance,dist);\n      }\n    ",
    mouse: "\n      float getActivation(vec2 uv){\n        float maxDistance = distance(uMouse, 1.-floor(uMouse+0.5));\n        float dist = smoothstep(0.,maxDistance,distance(uMouse,uv));\n        return dist;\n      }\n    ",
    closestCorner: "\n      float getActivation(vec2 uv){\n\n\n        float y = mod(uClosestCorner,2.) *2. -1.;\n        float x = (floor(uClosestCorner /2.)*2.-1.)*-1.;\n\n        float xAct = abs(min(0.,x)) + uv.x * x;\n        float yAct = abs(min(0.,y)) + uv.y * y;\n\n        return (xAct+yAct)/2.;\n      }\n    ",
    closestSide: "\n      float getActivation(vec2 uv){\n\n        float y = mod(uClosestCorner,2.) *2. -1.;\n        float x = (floor(uClosestCorner /2.)*2.-1.)*-1.;\n\n        float xAct = abs(min(0.,x)) + uv.x * x;\n        float yAct = abs(min(0.,y)) + uv.y * y;\n\n        return (xAct+yAct)/2.;\n      }\n    "
};

function ensureFloat(e) {
    let n = e.toString();
    return -1 === n.indexOf(".") && (n += "."), n
}
const transformations = {
    none: () => "",
    flipX: () => "\n    \n        float beizerProgress = cubicBezier(vertexProgress,\n        uBeizerControls.x,uBeizerControls.y,\n        uBeizerControls.z,uBeizerControls.w);\n\n        float flippedX = -transformedPos.x;\n        transformedPos.x = mix (transformedPos.x, flippedX,beizerProgress );\n          \n         \n          float syncDifference =  uSyncLatestStart;\n            \n           \n          float aspectRatio = (uMeshScale.x / uMeshScale.y);\n          float stepFormula = 0.5 - (syncDifference * uSyncLatestStart * uSyncLatestStart) * aspectRatio;\n\n          transformedUV.x = mix(transformedUV.x,1.-transformedUV.x,\n              step(stepFormula,beizerProgress));\n      ",
    simplex: e => {
        ensureFloat(e.seed || 0);
        let n = ensureFloat(e.amplitudeX || .5),
            t = ensureFloat(e.amplitudeY || .5),
            r = ensureFloat(e.frequencyX || 1),
            i = ensureFloat(e.frequencyY || .75),
            o = ensureFloat(e.progressLimit || .5);
        return `\n      float simplexProgress = min(clamp((vertexProgress) / ${o},0.,1.),clamp((1.-vertexProgress) / (1.-${o}),0.,1.));\n      simplexProgress = smoothstep(0.,1.,simplexProgress);\n      float noiseX = snoise(vec2(transformedPos.x +uSeed, transformedPos.y + uSeed + simplexProgress * 1.) * ${r} ) ;\n      float noiseY = snoise(vec2(transformedPos.y +uSeed, transformedPos.x + uSeed + simplexProgress * 1.) * ${i}) ;\n      transformedPos.x += ${n} * noiseX * simplexProgress;\n      transformedPos.y += ${t} * noiseY * simplexProgress;\n  `
    },
    fluid: e => {
        const n = ensureFloat(e.frequency || 1),
            t = ensureFloat(e.amplitude || .3);
        let r = ensureFloat((e.x || .5) - .5),
            i = ensureFloat((e.y || .5) - .5);
        e.onMouse && (r = "uMouse.x - 0.5", i = "uMouse.y - 0.5");
        const o = ensureFloat(e.progressLimit || .5);
        return `\n      float velvetProgress = min(clamp((vertexProgress) / ${o},0.,1.),clamp((1.-vertexProgress) / (1.-${o}),0.,1.));\n      velvetProgress = sin(velvetProgress * (3.14 / 2.) * ${n});\n      vec2 velvetPoint   = vec2(${r},${i}); \n      vec2 velvetToPoint =  transformedPos.xy;\n      transformedPos.xy = mix(transformedPos.xy, velvetPoint + velvetToPoint*${t}, velvetProgress);\n     \n    `
    },
    wavy: e => {
        const n = ensureFloat(e.seed || 0);
        return `\n      float limit = 0.5;\n      float wavyProgress = min(clamp((vertexProgress) / limit,0.,1.),clamp((1.-vertexProgress) / (1.-limit),0.,1.));\n\n      float dist = length(transformedPos.xy);\n      \n      float angle = atan(transformedPos.x,transformedPos.y);\n\n      float nextDist = dist * (${ensureFloat(e.amplitude||.5)} * (sin(angle * ${ensureFloat(e.frequency||4)} + ${n}) /2.+0.5)+ 1.);\n\n      transformedPos.x = mix(transformedPos.x,sin(angle) * nextDist ,  wavyProgress);\n      transformedPos.y = mix(transformedPos.y,cos(angle) * nextDist,  wavyProgress);\n    `
    },
    circle: e => "\n      float limit = 0.5;\n      float circleProgress = min(clamp((vertexProgress) / limit,0.,1.),clamp((1.-vertexProgress) / (1.-limit),0.,1.));\n\n      float maxDistance = 0.5;\n      float dist = length(transformedPos.xy);\n      \n      float nextDist = min(maxDistance,dist);\n      float overload = step(maxDistance,dist);\n      float angle = atan(transformedPos.x,transformedPos.y);\n      \n      transformedPos.x = mix(transformedPos.x,sin(angle) * nextDist ,  circleProgress );\n      transformedPos.y = mix(transformedPos.y,cos(angle) * nextDist,  circleProgress);\n      transformedPos.z += -0.5 * overload * circleProgress;\n    \n  "
};
var vertexUniforms = "\n    uniform float uProgress;\n    uniform vec2 uScaleToViewSize;\n    uniform vec2 uPlaneCenter;\n    uniform vec2 uMeshScale;\n    uniform vec2 uMouse;\n    uniform vec2 uViewSize;\n\n    uniform float uClosestCorner;\n\n   \n    uniform float uSeed;\n    uniform vec4 uBeizerControls;\n    uniform float uSyncLatestStart;\n    uniform float uActivationParts;\n    uniform bool uProgressByParts;\n    varying vec2 vUv;\n    varying vec2 scale; \n    varying float vProgress;\n";

function generateShaders(e, n) {
    return {
        fragment: "\n    uniform float uProgress;\n    uniform sampler2D uImage;\n    uniform vec2 uImageRes;\n    uniform sampler2D uImageLarge;\n    uniform vec2 uImageLargeRes;\n    uniform vec2 uMeshScale;\n    \n    varying vec2 vUv;\n    varying float vProgress;\n    varying vec2 scale;\n\n\n    vec2 preserveAspectRatioSlice(vec2 uv, vec2 planeSize, vec2 imageSize ){\n      \n        vec2 ratio = vec2(\n            min((planeSize.x / planeSize.y) / (imageSize.x / imageSize.y), 1.0),\n            min((planeSize.y / planeSize.x) / (imageSize.y / imageSize.x), 1.0)\n        );\n        \n        \n        vec2 sliceUvs = vec2(\n            uv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n            uv.y * ratio.y + (1.0 - ratio.y) * 0.5\n        );\n\n        return sliceUvs;\n    }\n\n    void main(){\n \n        vec2 uv = vUv;\n\n        vec2 scaledPlane = uMeshScale * scale;\n\n        \n        vec2 smallImageUV = preserveAspectRatioSlice(uv, scaledPlane, uImageRes);\n\n        vec3 color = texture2D(uImage,smallImageUV).xyz;\n\n        if(vProgress > 0.){\n          vec2 largeImageUV = preserveAspectRatioSlice(uv, scaledPlane, uImageLargeRes);\n          color = mix(color,texture2D(uImageLarge,largeImageUV).xyz, vProgress );\n        }\n\n        gl_FragColor = vec4(color,1.);\n    }\n",
        vertex: `\n    ${vertexUniforms}\n    ${cubicBeizer}\n    ${simplex}\n\n    ${quadraticBezier}\n    \n\n    ${e}\nfloat linearStep(float edge0, float edge1, float val) {\n\tfloat x = clamp( (val  - edge0) / (edge1 - edge0),0.,1.);\n\t\treturn x;\n}\n    void main(){\n\n      vec3 pos = position.xyz;\n      vec2 newUV = uv;\n\n      float activation = getActivation(uv);\n\n\n\n      \n      float startAt = activation * uSyncLatestStart;\n      float vertexProgress = smoothstep(startAt,1.,uProgress);\n\n\n      if(uProgressByParts){\n        \n        float activationPart = 1./uActivationParts;\n        float activationPartDuration = 1./(uActivationParts+1.);\n\n        float progressStart = (activation / activationPart) * activationPartDuration;\n        float progressEnd = min(progressStart + activationPartDuration,1.);\n        vertexProgress = linearStep(progressStart,progressEnd,uProgress);\n      }\n        vec3 transformedPos = pos;\n        vec2 transformedUV = uv;\n        ${n||""}\n        pos = transformedPos;\n        newUV = transformedUV; \n\n        \n        scale = vec2(\n          1. + uScaleToViewSize * vertexProgress\n        );\n        \n        \n        vec2 flippedPos = vec2(\n          (- pos.x) ,\n          (- pos.y ) \n        );\n\n\n        \n        pos.xy *= scale;\n\n\n        \n        pos.y += -uPlaneCenter.y * vertexProgress;\n        pos.x += -uPlaneCenter.x * vertexProgress;\n\n        // Move slightly to the front\n        pos.z += vertexProgress;\n\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);\n        vProgress = vertexProgress;\n      vUv = newUV;\n    }\n`
    }
}
var cubicBeizer = "\n\nfloat slopeFromT (float t, float A, float B, float C){\n  float dtdx = 1.0/(3.0*A*t*t + 2.0*B*t + C); \n  return dtdx;\n}\n\nfloat xFromT (float t, float A, float B, float C, float D){\n  float x = A*(t*t*t) + B*(t*t) + C*t + D;\n  return x;\n}\n\nfloat yFromT (float t, float E, float F, float G, float H){\n  float y = E*(t*t*t) + F*(t*t) + G*t + H;\n  return y;\n}\nfloat cubicBezier (float x, float a, float b, float c, float d){\n\n  float y0a = 0.00; \n  float x0a = 0.00; \n  float y1a = b;    \n  float x1a = a;    \n  float y2a = d;   \n  float x2a = c;    \n  float y3a = 1.00; \n  float x3a = 1.00; \n\n  float A =   x3a - 3.*x2a + 3.*x1a - x0a;\n  float B = 3.*x2a - 6.*x1a + 3.*x0a;\n  float C = 3.*x1a - 3.*x0a;   \n  float D =   x0a;\n\n  float E =   y3a - 3.*y2a + 3.*y1a - y0a;    \n  float F = 3.*y2a - 6.*y1a + 3.*y0a;             \n  float G = 3.*y1a - 3.*y0a;             \n  float H =   y0a;\n\n \n  float currentt = x;\n  const int nRefinementIterations = 5;\n  for (int i=0; i < nRefinementIterations; i++){\n    float currentx = xFromT (currentt, A,B,C,D); \n    float currentslope = slopeFromT (currentt, A,B,C);\n    currentt -= (currentx - x)*(currentslope);\n    currentt = clamp(currentt, 0.,1.);\n  } \n\n  float y = yFromT (currentt,  E,F,G,H);\n  return y;\n}\n",
    simplex = "\nvec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }\n\nfloat snoise(vec2 v){\n  const vec4 C = vec4(0.211324865405187, 0.366025403784439,\n           -0.577350269189626, 0.024390243902439);\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n  vec2 i1;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod(i, 289.0);\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n  + i.x + vec3(0.0, i1.x, 1.0 ));\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),\n    dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n",
    quadraticBezier = "\nfloat quadraticBezier (float x, float a, float b){\n \n\n  float epsilon = 0.00001;\n  a = max(0., min(1., a)); \n  b = max(0., min(1., b)); \n  if (a == 0.5){\n    a += epsilon;\n  }\n  \n \n  float om2a = 1. - 2.*a;\n  float t = (sqrt(a*a + om2a*x) - a)/om2a;\n  float y = (1.-2.*b)*(t*t) + (2.*b)*t;\n  return y;\n}\n";
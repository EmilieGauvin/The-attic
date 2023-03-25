import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from "../Experience";
import fakeGodRayVertexShader from './shaders/fakeGodRay/vertex.glsl'
import fakeGodRayFragmentShader from './shaders/fakeGodRay/fragment.glsl'

export default class Attic
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.trianglePosition = this.experience.trianglePosition

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('attic')
        }

        //setup
        this.resources = this.experience.resources
        this.resource = this.resources.items.atticModel
        this.atticTexture = this.resources.items.atticTexture

        // Base
        this.baseScale = 0.714
        this.setModel()
    }

    setModel()
    {
        //Import model
        this.model = this.resource.scene
        this.model.position.set( 0, 0, 0)
        this.model.scale.set(this.baseScale, this.baseScale, this.baseScale)
        this.scene.add(this.model)

        // Baked texture
        this.atticTexture.flipY = false
        this.bakedMesh = this.model.children.find((child) => child.name === 'baked_attic')
        this.atticMaterial = new THREE.MeshBasicMaterial({ map: this.atticTexture })
        this.bakedMesh.material = this.atticMaterial

        // lightMaterial
        this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.lightMesh = this.model.children.find((child) => child.name === 'light')
        this.lightMesh.material = this.lightMaterial

        // glassMaterial
        this.glassMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffe5,
            transparent: true,
            opacity: 0.2
        })
        this.glassMesh = this.model.children.find((child) => child.name === 'glass')
        this.glassMesh.material = this.glassMaterial

        //fakeGodRay Materials
        this.fakeGodRayMaterial = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color('#fff4cc') },
                uBlurOffset: { value: 0.93 },
                uAlphaBase: { value: 0.25 },
                uAlphaRays: { value: 0.05 },
                uFrequency: { value: 0.5 }
            }
        })
        this.fakeGodRayMesh = this.model.children.find((child) => child.name === 'godRay')
        this.fakeGodRayMesh.material = this.fakeGodRayMaterial
    }
}

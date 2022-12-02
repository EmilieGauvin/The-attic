import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import {OrbitControls} from 'https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js';
import Experience from "./Experience";



export default class Camera
{
    constructor()
    {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.pointerEvents = this.experience.pointerEvents
        this.pointer = this.experience.pointer
        this.time = this.experience.time
        
        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            80, 
            this.sizes.width / this.sizes.height, 
            0.1, 
            1000)
        this.instance.position.set(0, -0.2, 0)
        // this.instance.rotation.x = Math.PI
        this.instance.lookAt(new THREE.Vector3( 0, -2, -20))
        this.scene.add(this.instance)
        this.parallaxEnabled = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if (this.parallaxEnabled === true)
        {   
            this.parallaxAmplitude = this.parallaxAmplitude < 0.25 ? this.parallaxAmplitude + 0.001 : 0.25
            const parallaxX = this.pointer.x * this.parallaxAmplitude // to lower the amplitude of effect
            const parallaxY = this.pointer.y * this.parallaxAmplitude // to lower the amplitude of effect   
            this.instance.position.x = (parallaxX)
            this.instance.rotation.y = (parallaxX) / (this.sizes.width/this.sizes.height)
            this.instance.position.y = (parallaxY) -0.2
        }
    }
}


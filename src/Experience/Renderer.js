import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import {EffectComposer} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import {SMAAPass} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/SMAAPass.js';

import Experience from "./Experience";

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('renderer')
        }

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
                canvas : this.canvas,
                antialias : true
            }
        )
        this.scene.background = new THREE.Color('#4742b1')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

        ///Debug
        if (this.debug.active)
        {
            this.debugFolder.addColor(this.scene, 'background')
        }
        
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}

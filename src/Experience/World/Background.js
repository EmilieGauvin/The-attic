import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../Experience";

export default class Background
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.camera = this.experience.camera.instance
        
        //setup
        this.resources = this.experience.resources
        this.backgroundTexture = this.resources.items.backgroundTexture

        // Base

        this.setBackground()
    }

    setBackground()
    {
        const backgroundGeometry = new THREE.PlaneGeometry(1, 1)
        const backgroundMaterial = new THREE.MeshBasicMaterial({map: this.backgroundTexture})
        this.background = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
        this.scene.add(this.background)

        this.background.scale.set(35 , 35 , 1)
        this.background.position.x = -7
        this.background.position.y = 0
        this.background.position.z = - 8
    }
}

import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import PointerEvents from './Utils/PointerEvents'
import World from './World/World.js'
import Resources from './Utils/Resources'
import sources from './World/sources.js'
import Debug from './Utils/Debug'
import Stats from 'stats.js'

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance
        }
        instance = this

        //Global acces
        window.experience = this

        //Stats, run 'npm install --save stats.js'
        this.statsActive = window.location.hash === '#stats'
        if (this.statsActive) {
            this.stats = new Stats()
            this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(this.stats.dom)
        }

        //Options
        this.canvas = canvas

        //Set up
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.pointerEvents = new PointerEvents()
        this.pointer = this.pointerEvents.pointer
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)

        this.world = new World()

        //Sizes resize events
        this.sizes.on('resize', () => {
            this.resize()
        })

        //Time tick event
        this.time.on('tick', () => {
            this.update()
        })

    }


    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        if (this.statsActive) this.stats.begin()

        this.camera.update()
        this.renderer.update()

        if (this.statsActive) this.stats.end()
    }
}

import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Mouse from './Mouse.js';

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.floor = new Floor();
			this.mouse = new Mouse();
			this.environment = new Environment();
		});
	}

	update() {
		if (this.mouse) this.mouse.update();
	}
}

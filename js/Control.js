/*
 *
 * Управление Orbit Controls
 *
 */

import * as THREE from './three.module.min.js';
import {OrbitControls} from './OrbitControls.js';

export default class Control
{
	constructor(root)
	{
		this.root = root;
		this.controls = new OrbitControls(this.root.get_camera(), this.root.get_renderer().domElement);
		this.controls.target = new THREE.Vector3(0, 1.5, 0);
		this.controls.minPolarAngle = 0;
		this.controls.maxPolarAngle = Math.PI / 2;
	}

	enable()
	{
		this.controls.enabled = true;
	}

	disable()
	{
		this.controls.enabled = false;
	}

	render()
	{
		this.controls.update();
	}
}

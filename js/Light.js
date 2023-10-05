/*
 *
 * Свет
 *
 */

import * as THREE from './three.module.min.js';

export default class Light
{
	constructor(root)
	{
		this.root = root;
		this.init();
	}

	init()
	{
		const r = 5;
		const y = 3;
		const count = 5;

		const step = 2 * Math.PI / count;
		for (let i = 0; i < count; i++)
		{
			let point = new THREE.PointLight(0xFAF9DE, 30);
			point.position.set(r * Math.sin(step * i), y, r * Math.cos(step * i));
			this.root.scene.add(point);
		}

		let ambient_light = new THREE.AmbientLight(0xFFFFFF, 1); // soft white light
		this.root.scene.add( ambient_light );
	}
}

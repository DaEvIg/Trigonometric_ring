/*
 *
 * Low-level stick class
 *
 */

import * as THREE from './three.module.min.js';

export default class Stick
{
	constructor(root, color)
	{
		this.root = root;
		this.base = new THREE.Object3D();
		const t = 0.02; 
		const line_geometry = new THREE.CylinderGeometry(t, t, 1, 8); // 1 meter
		let material = new THREE.MeshStandardMaterial({
				color: color,
				metalness: .9,
				roughness: .1});
		this.line = new THREE.Mesh(line_geometry, material);

		this.line.position.y = .5;
		this.base.add(this.line);
		this.root.scene.add(this.base);
		//~ this.set_rotation();
	}

	set_length(length)
	{
		this.base.scale.y = length;
	}

	set_position(position)
	{
		this.base.position.set(position[0], position[1], position[2]);
	}

	set_rotation(angle) // 2D, only along the Z
	{
		this.base.rotation.set(0, 0, angle);
		//~ this.base.rotation.set(0, 0, angle - (Math.PI / 2));
	}
}

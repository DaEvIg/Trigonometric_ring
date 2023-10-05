/*
 *
 * Стрелки
 *
 */

import * as THREE from './three.module.min.js';

export default class Arrow
{
	constructor(root, origin, angle = 0)
	{
		this.root = root;
		this.create(origin, angle);
	}

	create(origin, angle)
	{
		const l = 3;
		const t = 0.01
		const line_geometry = new THREE.CylinderGeometry(t, t, l, 8); 
		const tip_geometry = new THREE.CylinderGeometry(t / 8, t * 2, t * 8, 8); 
		const material = new THREE.MeshStandardMaterial({
				color: 0xc0c0c0,
				metalness: .99,
				roughness: .01});
		const line = new THREE.Mesh(line_geometry, material);
		const tip = new THREE.Mesh(tip_geometry, material);
		tip.position.y = l / 2;
		line.add(tip);
		this.root.scene.add(line);
		
		line.rotation.z = angle;
		
		line.position.set(origin[0], origin[1], origin[2]);
		//~ this.root.scene.add(tip);
	}
}

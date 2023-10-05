/*
 *
 * Объекты
 *
 */

import * as THREE from './three.module.min.js';

import Arrow from './Arrow.js';
import Triangle from './Triangle.js';
import Interaction  from './Interaction.js';

export default class Items
{
	constructor(root)
	{
		this.root = root;
		this.init();
	}

	init()
	{
		this.ground();

		const origin = [0, 1.5, 0];
		this.ring(origin);
		this.arrows(origin);
		this.triangle = new Triangle(this.root, origin);

		this.interaction = new Interaction(this.root, origin);
	}

	arrows(origin)
	{
		let one = new Arrow(this.root, origin);
		let two = new Arrow(this.root, origin, -Math.PI / 2);
	}

	ground()
	{
		const plane_geo = new THREE.PlaneGeometry(20, 20);
		let ground_material = new THREE.MeshStandardMaterial({
				color: 0x446E16,
				side: THREE.DoubleSide,
				roughness: .8,
				metalness: .1});
		const plane = new THREE.Mesh(plane_geo, ground_material);
		plane.rotation.x = Math.PI /2;
		this.root.scene.add(plane);
	}

	ring(origin)
	{
		const geometry = new THREE.TorusGeometry(1, 0.015, 8, 64); 
		let material = new THREE.MeshStandardMaterial({
				color: 0xc0c0c0,
				metalness: .99,
				roughness: .01,
				envMap: this.root.env.get_env()});
		material.needsUpdate = true;
		const torus = new THREE.Mesh(geometry, material);
		torus.position.set(origin[0], origin[1], origin[2]);
		this.root.scene.add(torus);
	}

	render()
	{
		if (undefined != this.interaction.render) this.interaction.render();
	}
}

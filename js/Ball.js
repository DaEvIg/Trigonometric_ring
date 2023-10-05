import * as THREE from './three.module.min.js';

export default class Ball
{
	constructor(root)
	{
		this.root = root;
		const geo = new THREE.SphereGeometry(.05, 8, 8); 
		const material = new THREE.MeshStandardMaterial({
				color: 0xe0e0e0,
				metalness: .9,
				roughness: .1});
		this.ball = new THREE.Mesh(geo, material);
		this.root.scene.add(this.ball);
	}

	set_position(position)
	{
		this.ball.position.set(position[0], position[1], position[2]);
	}
}

/*
 *
 * Низкоуровневая табличка
 *
 */

import * as THREE from './three.module.min.js';

export default class Sign
{
	constructor(root, color)
	{
		this.root = root;
		this.color = color;
		this.size = 128;
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.size;
		this.canvas.height = this.size;
		this.ctx = this.canvas.getContext('2d');

		this.texture = new THREE.CanvasTexture(this.canvas);
		this.material = new THREE.SpriteMaterial({map: this.texture, transparent: true});
		this.sprite = new THREE.Sprite(this.material);

		this.draw();
		//~ this.sprite.center.set(0,0)
		this.sprite.scale.set(.3, .3);

		this.root.scene.add(this.sprite);
		//~ this.set_position([.5, 1.5, .1]);
	}

	draw(line1='', line2='')
	{
		this.ctx.clearRect(0, 0, this.size, this.size);
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = 'bottom';
		this.ctx.font = "24px sans";
		this.ctx.fillStyle = this.color;
		this.ctx.fillText(line1, this.size / 2, this.size / 2);
		
		this.ctx.textBaseline = 'top';
		this.ctx.font = "12px sans";
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.fillText(line2, this.size / 2, this.size / 2);
		this.material.needsUpdate = true;
		this.texture.needsUpdate = true;
	}

	set_position(position)
	{
		this.sprite.position.set(position[0], position[1], position[2]);
	}
}

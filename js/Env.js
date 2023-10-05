/*
 *
 * Окружение
 *
 */

import * as THREE from './three.module.min.js';

export default class Env
{
	constructor(root, enable = true, path = false)
	{
		this.root = root;
		if ( ! enable) return;
		path = (path) ? path : './i/bg/Areskutan/';
		this.set_path(path);
		this.enable();
	}

	set_path(path)
	{
		this.path = path;
	}

	get_env()
	{
		return this.envmap;
	}

	enable()
	{
		let loader = new THREE.CubeTextureLoader();
		loader.setPath(this.path);
		this.envmap = loader.load([
			'posx.jpg',
			'negx.jpg',
			'posy.jpg',
			'negy.jpg',
			'posz.jpg',
			'negz.jpg'
		]);
	}

	set_scene_bg()
	{
		this.root.scene.set_background(this.envmap);
	}
}

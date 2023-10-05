/*
 *
 * 3D-сцена
 *
 */

import * as THREE from './three.module.min.js';

export default class Scene 				// объявление класса Сцены и передача экспорт 
{
	constructor(root)				// конструктор класса
	{
		this.root = root;				// проброс рута
		this.init();				// вызов метода инициализации
	}

	add(item)
	{
		this.scene.add(item);
	}

	init()
	{
		this.scene = new THREE.Scene(); // создание сцены
		this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

		this.camera.position.z = 5; // камеру убрали немного назад
		this.camera.position.y = 3; // камеру поднять немного наверх

		this.renderer = new THREE.WebGLRenderer();				// создание нового отрисовщика
		this.renderer.setSize(window.innerWidth, window.innerHeight);				// установка размера отрисовщика под окошко
		this.renderer.setClearColor( 0x4894C1, 1 );				// цвет фона(1 - прозрачность)
		document.body.appendChild(this.renderer.domElement);				// вставка канвас отрисовщика в тело html

		window.addEventListener('resize', () => { this.resize() });				// слушалка на изменение размера окошка
	}

	get_renderer()				// геттер отрисовщика
	{
		return this.renderer;
	}

	get_camera()				// геттер камеры
	{
		return this.camera;
	}

	get_scene() 				// геттер сцены
	{
		return this.scene;
	}

	resize()				// обратный вызов (callback) на изменение размера окошка
	{
		this.camera.aspect = window.innerWidth / window.innerHeight;				// настройка пропорции-проекции камеры
		this.camera.updateProjectionMatrix();				// вызов обновляшки матрицы проекций
		this.renderer.setSize(window.innerWidth, window.innerHeight);				// обновление размера отрисовщика
		this.render();				// вызов отрисовки
	}

	render()				// декларация отрисовки
	{
		this.renderer.render(this.scene, this.camera);				// отрисовка сцены и камеры
	}
}

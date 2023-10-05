/*
 *
 * Управление
 *
 */
import * as THREE from './three.module.min.js';

export default class Interaction
{
	constructor(root, origin) 				// конструктор принимает суперобъект и точку "условного" центра
	{
		this.started = false;				// флаг перетаскивания (прямоугольного треуголька)
		this.root = root;				// суперобъект
		this.origin = origin; 				// центр
		this.name = 'interaction_plane';				// имя интерактивной плоскости

		const geometry = new THREE.PlaneGeometry(2, 2);				// создание плоскости 
		let material = new THREE.MeshStandardMaterial({
				color: 0xffff00,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: .1,
				metalness: .99,
				roughness: .01,
				envMap: this.root.env.get_env()
				});
		material.needsUpdate = true;

		this.plane = new THREE.Mesh(geometry, material);
		this.plane.name = this.name;				// запись имени плоскости 
		this.root.scene.add(this.plane);				// вставка плоскости в сцену(TODO вынести метод в app.js)
		this.plane.position.set(this.origin[0], this.origin[1], this.origin[2]);				// установка позиции плоскости

		this.raycaster = new THREE.Raycaster(); 				// создание рейкастера
		this.pointer = new THREE.Vector2();				// создание вектора для мышки
		this.camera = this.root.scene.get_camera();				// локальный интерфейс
		this.scene = this.root.scene.get_scene();

		window.addEventListener('pointermove', (event) => { this.move(event); });				// слушалки
		window.addEventListener('pointerup', () => { this.stop(); });
		window.addEventListener('pointerdown', () => { this.start(); });
		window.addEventListener('pointerleave', () => { this.stop(); });
	}

	move(event)				// callback на движение 
	{
		this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1; 				// приведение к единичной плоскости
		this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}

	start()				// колбэк на нажатие
	{
		this.started = true;				// поднятие флага на нажатие
	}

	stop()				// колбэк на отпускание и закрытие
	{
		this.started = false;				// отпустить флаг нажатия
		this.root.control.enable();				// включить управление контролем(TODO: вынести метод в root)
	}

	render()				// отрисовка
	{
		if ( ! this.started) return; 				// только при поднятом флаге делать
		this.raycaster.setFromCamera(this.pointer, this.camera);				// обновить рейкастер
		this.intersects = this.raycaster.intersectObjects(this.scene.children);				// получить пересечение
		for (let intersect of this.intersects)
		{
			if (intersect.object.name == this.name)				// реагировать на нужный объект
			{
				this.root.control.disable();				// выключить орбит контроль
				this.uv2angle(intersect.uv.x, intersect.uv.y);				// интерполировать в угол
			}
		}
	}

	uv2angle(x, y)				// интерполяция uv-координат в угол
	{
		this.u = (2 * x) - 1; 				// приведение системы координат для х
		this.v = (2 * y) - 1;				// приведение системы координат для y
		this.angle = Math.atan(this.v / this.u);				// расчет угла
		if (this.u < 0) this.angle += Math.PI;								// поиск нужного корня арктангенса
		if (0 == this.v && this.u < 0) this.angle = Math.PI;				// компенсация gimbal lock
		if (0 == this.v && this.u > 0) this.angle = 0;
		this.root.items.triangle.set_angle(this.angle);				// перенос готового угла в метод класса треугольника
	}
}

import Scene from './Scene.js';
import Light  from './Light.js';
import Items  from './Items.js';
import Control  from './Control.js';
import Env  from './Env.js';

class App // класс приложения
{
	constructor() // конструктор класса
	{
		this.init(); // вызов метода init
	}

	init() // описание метода 
	{
		this.scene = new Scene(this); // создание объекта  сцены класса Scene
		this.light = new Light(this); // создание объекта  освещения класса Light
		this.env = new Env(this); // создание объекта окружения класса Env
		this.control = new Control(this); // управление орбит контрол
		this.items = new Items(this);// штуки
		this.animate(); 				// вход в рекурсию отрисовки по фпс
	}

	get_renderer()				// геттер рендерера сцены
	{
		return this.scene.get_renderer();				// возвращает рендерера сцены 
	}

	get_camera()				// геттер камеры сцены
	{
		return this.scene.get_camera();				// 
	}

	animate()				// рекурсия отрисовки по фпс
	{
		requestAnimationFrame(() => {this.animate();}); 				//  рекурсия перерисовки(анимации)

		if (undefined != this.control.render) 		this.control.render();				// анимация контроля управления
		if (undefined != this.items.render) 		this.items.render();				// анимация штук
		if (undefined != this.scene.render) 		this.scene.render();				// анимация сцены
		//~ if (undefined != this.items.triangle)
		//~ {
			//~ if (undefined == this.angle) this.angle = 0;
			//~ this.angle += 0.01;
			//~ if (this.angle > 2 * Math.PI) this.angle = 0;
			//~ this.items.triangle.set_angle(this.angle);
		//~ }
	}
}


let app = new App();				// создание объекта класса App и вызов конструктора

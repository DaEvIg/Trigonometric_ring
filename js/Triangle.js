import Stick from './Stick.js';
import Sign from './Sign.js';
import Ball from './Ball.js';


export default class Triangle
{
	constructor(root, origin)
	{
		this.root = root;
		this.origin = origin;
		this.sinus = new Stick(this.root, 0xD28117);
		this.cosinus = new Stick(this.root, 0xD22217);
		this.hypotenuse = new Stick(this.root, 0xD21754);

		this.cosinus.set_position(this.origin); 
		this.cosinus.set_rotation(-Math.PI / 2);
		this.hypotenuse.set_position(this.origin);

		this.mk_signs();
		this.mk_balls();
		this.set_angle(Math.PI / 4);
	}

	mk_balls()
	{
		this.center_ball = new Ball(this.root);
		this.center_ball.set_position(this.origin);
		this.radius_ball = new Ball(this.root);
		this.x_ball = new Ball(this.root);
	}

	mk_signs()
	{
		this.sinus_sign = new Sign(this.root, '#D28117');
		this.cosinus_sign = new Sign(this.root, '#D22217');
		this.hypotenuse_sign = new Sign(this.root, '#D21754');
	}

	set_angle(angle = 0)
	{
		this.sin = Math.sin(angle);
		this.cos = Math.cos(angle);
		
		this.sinus.set_position([this.origin[0] + this.cos, this.origin[1], this.origin[2]]); 
		this.cosinus.set_length(this.cos);
		this.sinus.set_length(this.sin);
		this.hypotenuse.set_rotation(angle - Math.PI / 2);

		this.cosinus_sign.set_position([this.cos/ 2, this.origin[1], this.origin[2] + .1])
		this.cosinus_sign.draw('cos', Math.round(this.cos * 100) / 100);

		this.sinus_sign.set_position([this.cos, this.origin[1] + (this.sin /2), this.origin[2] + .1])
		this.sinus_sign.draw('sin', Math.round(this.sin * 100) / 100);

		this.hypotenuse_sign.set_position([this.origin[0] + this.cos, this.origin[1] + this.sin, this.origin[2] + .1]);
		this.hypotenuse_sign.draw('∠', Math.round(angle * 100) / 100);

		this.radius_ball.set_position([this.origin[0] + this.cos, this.origin[1] + this.sin, this.origin[2]]);
		this.x_ball.set_position([this.origin[0] + this.cos, this.origin[1], this.origin[2]]);
		//~ this.cosinus_sign.draw('cos', '√2/2');
	}
}

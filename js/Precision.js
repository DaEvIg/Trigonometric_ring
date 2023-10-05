export default class Precision
{
	constructor(dict, precis)
	{
		this.dict = dict; // словарик с литералами значений
		this.precis = precis; // точность
	}

	get_value(value)
	{
		let sign = (value < 0) ? '-' : '';
		value = Math.abs(value);
		// подобрать ближайшее значение из словарика
		return sign + value;
	}
}

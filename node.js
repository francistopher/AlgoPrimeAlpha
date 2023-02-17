/*
 *	Class used to instantiate and represent a 'node' element,
 *  which would serve as a member of an ensemble to perform
 * 	an algorithm.
 */
class Node 
{

	constructor(value) 
	{
		this.value = value - 1;
		this.label;
		this.x;
		this.y;
		this.#buildLabel();
	}

	// creates label element with id and inner html value
	#buildLabel() 
	{
		this.label = document.createElement("LABEL");
		this.label.id = "node";
		this.label.innerHTML = this.value + 1;
	}

	remove()
	{
		this.label.remove();
	}

	setBackgroundColor(color) 
	{
		this.label.style.backgroundColor = color;
	}

	setBorderColor(color)
	{
		this.label.style.borderColor = color;
	}
	
	/*
	 *  Set position of label given
	 *	{x} x coordinate value
	 * 	{xu} x coordinate units
	 *  {y} y coordinate value
	 *	{yu} : y coordinate units
	 */
	setPosition(x, xu, y, yu) {
		this.x = x;
		this.label.style.left = this.x + xu;
		// only applies y coordinate if it's given
		if (y != "") {
			this.y = y;
			this.label.style.top = this.y + yu;
		}
		document.body.appendChild(this.label); // serves a special purpose
	}
}

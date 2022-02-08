/*
 *	Class used to instantiate and represent a 'node' element,
 *  which would serve as a member of an ensemble to perform
 * 	an algorithm.
 */
class Node {
	constructor(value) {
		this.value = value - 1;
		this.label;
		this.x;
		this.y;
		this.#buildLabel();
	}

	#buildLabel() {
		this.label = document.createElement("LABEL");
		this.label.id = "node";
		this.label.innerHTML = this.value + 1;
	}

	setBackgroundColor(color) {
		this.label.style.backgroundColor = color;
	}
	
	setPosition(x, xType, y, yType) {
		this.x = x;
		this.label.style.left = this.x + xType;
		if (y != "") {
			this.y = y;
			this.label.style.top = this.y + yType;
		}
		document.body.appendChild(this.label);
	}
}

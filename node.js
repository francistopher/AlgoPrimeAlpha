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
		this.label.innerHTML = this.value + 1;
		this.label.style.borderStyle = "solid";
		this.label.style.borderWidth = "0.25vw";
		this.label.style.borderColor = "black";
		this.label.style.width = "3vw";
		this.label.style.height = "3vw";
		this.label.style.textAlign = "center";
		this.label.style.position = "absolute";
		this.label.style.borderRadius = "1.6vw";
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

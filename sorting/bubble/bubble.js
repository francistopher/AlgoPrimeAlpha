/*
 * Class that sorts the node elements
 * via the bubble algorithm
 */
class Bubble extends NodeMaster {
	constructor() {
		super();
		console.log("BUBBLE");
	this.sortButton.addEventListener("click", ()=> {
			this.sortButton.style.display = "none";
			this.#sort(0, 0, "", 0);
		});
	}

// outer loop
#sort(i, j, temp, ticks) {
	if (i < this.stage.length - 1) {
		this.#innerLoop(i, j, temp);
	} else {
		this.shuffleButton.style.display = "inline";
		this.nodeCountSlider.style.display = "inline";
	}
}

// inner loop
#innerLoop(i, j, temp) {
	if (j < this.stage.length - i - 1) {
		this.#innerIf(i, j, temp);
	} else {
		this.#sort(i + 1, 0, temp);
	}
}

// inner if
#innerIf(i, j, temp) {
	// nodes are being compared
	this.stage[j]["node"].setBackgroundColor("yellow");
	this.stage[j + 1]["node"].setBackgroundColor("yellow");
	setTimeout(() => {
		if (this.stage[j]["node"].value > this.stage[j + 1]["node"].value) {
			// nodes are going to be swaped
			this.stage[j]["node"].setBackgroundColor("lightgreen");
			this.stage[j + 1]["node"].setBackgroundColor("lightgreen");
			temp = this.stage[j]["node"];
			this.stage[j]["node"] = this.stage[j + 1]["node"];
			this.stage[j]["node"].setPosition(this.stage[j]["x"], "vw", "", "");
			this.stage[j + 1]["node"] = temp;
			this.stage[j + 1]["node"].setPosition(this.stage[j + 1]["x"], "vw", "", "");
		} else {
			// nodes are not going to be swaped
			this.stage[j]["node"].setBackgroundColor("crimson");
			this.stage[j + 1]["node"].setBackgroundColor("crimson");	
		}
		setTimeout(() => {
			// clear nodes background color
			this.stage[j]["node"].setBackgroundColor("white");
			this.stage[j + 1]["node"].setBackgroundColor("white");
			this.#innerLoop(i, j + 1, temp);
		}, 500);
	}, 500);
}

}

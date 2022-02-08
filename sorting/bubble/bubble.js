class Bubble extends NodeMaster {
	constructor() {
		super();
		console.log("BUBBLE");
	this.sortButton.addEventListener("click", ()=> {
			this.sortButton.style.display = "none";
			this.#sort(0, 0, "", 0);
		});
	}

#sort(i, j, temp, ticks) {
	if (i < 10 - 1) {
		this.#innerLoop(i, j, temp);
	} else {
		this.shuffleButton.style.display = "block";
	}
}

#innerLoop(i, j, temp) {
	if (j < 10 - i - 1) {
		this.#innerIf(i, j, temp);
	} else {
		this.#sort(i + 1, 0, temp);
	}
}

#innerIf(i, j, temp) {
	this.stage[j]["node"].setBackgroundColor("yellow");
	this.stage[j + 1]["node"].setBackgroundColor("yellow");
	setTimeout(() => {
		if (this.stage[j]["node"].value > this.stage[j + 1]["node"].value) {
			this.stage[j]["node"].setBackgroundColor("lightgreen");
			this.stage[j + 1]["node"].setBackgroundColor("lightgreen");
			temp = this.stage[j]["node"];
			this.stage[j]["node"] = this.stage[j + 1]["node"];
			this.stage[j]["node"].setPosition(this.stage[j]["x"], "vw", "", "");
			this.stage[j + 1]["node"] = temp;
			this.stage[j + 1]["node"].setPosition(this.stage[j + 1]["x"], "vw", "", "");
		} else {
			this.stage[j]["node"].setBackgroundColor("crimson");
			this.stage[j + 1]["node"].setBackgroundColor("crimson");	
		}
		setTimeout(() => {
			this.stage[j]["node"].setBackgroundColor("white");
			this.stage[j + 1]["node"].setBackgroundColor("white");
			this.#innerLoop(i, j + 1, temp);
		}, 500);
	}, 500);
}

}

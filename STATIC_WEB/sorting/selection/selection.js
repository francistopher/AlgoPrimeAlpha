class Selection extends NodeMaster {
	constructor() {
		super();
		this.sortButton.addEventListener("click", () => {
			this.sortButton.style.display = "none";
			this.#sort(0, 0, 0);
		});
	}

	#sort(i, j, min) {
		if (i < 9) {
			min = i;
			this.#innerLoop(i, i + 1, min);
		} else {
			this.shuffleButton.style.display = "block";
		}
	}
	
	#innerLoop(i, j, min) {
		if (j < 10) {
			this.stage[j]["node"].setBackgroundColor("yellow");
			this.stage[min]["node"].setBackgroundColor("yellow");
			setTimeout(() => {
				if (this.stage[j]["node"].value < this.stage[min]["node"].value) {
					this.stage[j]["node"].setBackgroundColor("lightgreen");
					this.stage[min]["node"].setBackgroundColor("white");	
					min = j;
				} else {
					this.stage[j]["node"].setBackgroundColor("crimson");
					this.stage[min]["node"].setBackgroundColor("crimson");	
				}
				setTimeout(() => {
					this.stage[j]["node"].setBackgroundColor("white");
					this.stage[min]["node"].setBackgroundColor("white");	
					this.#innerLoop(i, j + 1, min);
				}, 500);
			}, 500);
		} else {	
			this.stage[i]["node"].setBackgroundColor("lightgreen");
			this.stage[min]["node"].setBackgroundColor("lightgreen");		
			setTimeout(() => {
			var temp = this.stage[i]["node"];
			this.stage[i]["node"] = this.stage[min]["node"];
			this.stage[i]["node"].setPosition(this.stage[i]["x"], "vw", "", "");
			this.stage[min]["node"] = temp;
			this.stage[min]["node"].setPosition(this.stage[min]["x"], "vw", "", "");
				setTimeout(() => {	
					this.stage[i]["node"].setBackgroundColor("white");
					this.stage[min]["node"].setBackgroundColor("white");		
					this.#sort(i + 1, j, min);
				}, 500);
			}, 500);
		}
	}
}

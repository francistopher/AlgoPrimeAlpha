class Insertion extends NodeMaster {
	constructor() {
		super();
		this.sortButton.addEventListener("click", () => {
			this.sortButton.style.display = "none";
			this.#sort(1, 0, "");
		});
	}

	#sort(i, j, key) {
		if (i < 10) {
			if (key) {
				this.stage[j + 1]["node"].setBackgroundColor("white");	
			}
			this.stage[i]["node"].setBackgroundColor("lightblue");
			setTimeout(() => {
				key = this.stage[i]["node"];
				j = i - 1;
				this.#innerLoop(i, j, key);
			}, 1000);
		} else {
			key.setBackgroundColor("white");
			this.shuffleButton.style.display = "block";
		}
	}
	
	#innerLoop(i, j, key) {
		if (j >= 0) {
			this.stage[j]["node"].setBackgroundColor("yellow");
			key.setBackgroundColor("yellow");
		}
		setTimeout(() => {
			if (j >= 0 && this.stage[j]["node"].value > key.value) {
				key.setBackgroundColor("white");
				this.stage[j]["node"].setBackgroundColor("lightgreen");
				this.stage[j + 1]["node"].setBackgroundColor("lightgreen");
				setTimeout(() => {	
					this.stage[j]["node"].setBackgroundColor("white");
					this.stage[j + 1]["node"].setBackgroundColor("white");
					this.stage[j + 1]["node"] = this.stage[j]["node"];
					this.stage[j + 1]["node"].setPosition(this.stage[j + 1]["x"], "vw", "", "");
					j = j - 1;
					this.#innerLoop(i, j, key);
				}, 500);
			} else {
				setTimeout(() => {
					if (j >= 0) {
						this.stage[j]["node"].setBackgroundColor("white");
					}
					key.setBackgroundColor("white");
					this.stage[j + 1]["node"].setBackgroundColor("white");
					this.stage[j + 1]["node"] = key;
					this.stage[j + 1]["node"].setBackgroundColor("lightblue");	
					this.stage[j + 1]["node"].setPosition(this.stage[j + 1]["x"], "vw", "", "");
					setTimeout(() => {
						this.#sort(i + 1, j, key);
					}, 500);
				}, 500);
			}
		}, 500);
	}
}

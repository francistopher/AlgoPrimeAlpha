/*
 *	Class that sorts the node elements
 *  via the insertion algorithm
 */

class Insertion extends NodeMaster {
	constructor() {
		super();
		this.sortButton.addEventListener("click", () => {
			this.sortButton.style.display = "none";
			this.#sort(1, 0, "");
		});
	}

	// outer loop
	#sort(i, j, key) {
		if (i < 10) {
			// clears the key node background color
			if (key) {
				this.stage[j + 1]["node"].setBackgroundColor("white");	
			}
			// colors the background color of the new key node
			this.stage[i]["node"].setBackgroundColor("lightblue");
			setTimeout(() => {
				key = this.stage[i]["node"];
				j = i - 1;
				this.#innerLoop(i, j, key);
			}, 1000);
		} else {
			key.setBackgroundColor("white");
			this.nodeCountSlider.style.display = "inline";
			this.shuffleButton.style.display = "inline";
		}
	}
	
	// inner loop
	#innerLoop(i, j, key) {
		if (j >= 0) {
			// colors color of node that is being compared
			this.stage[j]["node"].setBackgroundColor("yellow");
			key.setBackgroundColor("yellow");
		}
		setTimeout(() => {
			if (j >= 0 && this.stage[j]["node"].value > key.value) {
				// key node color is cleared
				key.setBackgroundColor("white");
				// node colors are updated, indicating j will overlay j + 1 node
				this.stage[j]["node"].setBackgroundColor("lightgreen");
				this.stage[j + 1]["node"].setBackgroundColor("lightgreen");
				setTimeout(() => {	
					// node colors are cleared, overlay takes action
					this.stage[j]["node"].setBackgroundColor("white");
					this.stage[j + 1]["node"].setBackgroundColor("white");
					this.stage[j + 1]["node"] = this.stage[j]["node"];
					this.stage[j + 1]["node"].setPosition(this.stage[j + 1]["x"], "vw", "", "");
					j = j - 1;
					this.#innerLoop(i, j, key);
				}, 500);
			} else {
				setTimeout(() => {
					// j node and key node are cleared
					if (j >= 0) {
						this.stage[j]["node"].setBackgroundColor("white");
					}
					key.setBackgroundColor("white");
					// key is brought back to more proper position and noted
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

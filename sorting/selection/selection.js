/*
 *	Class that is viable for sorting the node
 *  elements via the selection algorithm
 */

class Selection extends NodeMaster {
	constructor() {
		super();
		this.sortButton.addEventListener("click", () => {
			this.sortButton.style.display = "none";
			this.#sort(0, 0, 0);
		});
	}
	
	// outer loop
	#sort(i, j, min) {
		if (i < 9) {
			min = i;
			this.#innerLoop(i, i + 1, min);
		} else {
			this.shuffleButton.style.display = "inline";
			this.nodeCountSlider.style.display = "inline";
		}
	}
	
	// inner loop
	#innerLoop(i, j, min) {
		if (j < 10) {
			// colors nodes that are being compared
			this.stage[j]["node"].setBackgroundColor("yellow");
			this.stage[min]["node"].setBackgroundColor("yellow");
			setTimeout(() => {
				if (this.stage[j]["node"].value < this.stage[min]["node"].value) {
					// min node is being set  to j node
					this.stage[j]["node"].setBackgroundColor("lightgreen");
					this.stage[min]["node"].setBackgroundColor("white");	
					min = j;
				} else {
					// assignment is not done
					this.stage[j]["node"].setBackgroundColor("crimson");
					this.stage[min]["node"].setBackgroundColor("crimson");	
				}
				setTimeout(() => {
					// clear node colors
					this.stage[j]["node"].setBackgroundColor("white");
					this.stage[min]["node"].setBackgroundColor("white");	
					this.#innerLoop(i, j + 1, min);
				}, 500);
			}, 500);
		} else {
			// i and min node are going to be swaped color indication
			this.stage[i]["node"].setBackgroundColor("lightgreen");
			this.stage[min]["node"].setBackgroundColor("lightgreen");		
			setTimeout(() => {
			// swap nodes and positions
			var temp = this.stage[i]["node"];
			this.stage[i]["node"] = this.stage[min]["node"];
			this.stage[i]["node"].setPosition(this.stage[i]["x"], "vw", "", "");
			this.stage[min]["node"] = temp;
			this.stage[min]["node"].setPosition(this.stage[min]["x"], "vw", "", "");
				setTimeout(() => {
					// clear color of nodes that were swaped
					this.stage[i]["node"].setBackgroundColor("white");
					this.stage[min]["node"].setBackgroundColor("white");		
					this.#sort(i + 1, j, min);
				}, 500);
			}, 500);
		}
	}
}

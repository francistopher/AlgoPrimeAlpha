/*
 *	Class that houses, builds, and shuffles the node elements
 */
class NodeMaster {
	constructor() {
		this.stage = [];
		this.shuffleButton;
		this.sortButton;
		this.#buildNodes();
		this.#buildShuffleButton();
		this.#buildSortButton();
	}
	
	// builds the sort button
	#buildSortButton() {
		this.sortButton = document.createElement("BUTTON");
		this.sortButton.innerHTML = "SORT";
		document.body.appendChild(this.sortButton);
		this.sortButton.style.display = "none";
	}

	// builds the shuffle button
	#buildShuffleButton() {
		this.shuffleButton = document.createElement("BUTTON");
		this.shuffleButton.innerHTML = "SHUFFLE";
		this.shuffleButton.addEventListener("click", () => this.#shuffleElements());
		document.body.appendChild(this.shuffleButton);
	}

	// shuffles the node elements in the stage array and shuffles their x positions
	#shuffleElements() {
		for (var i = 0, iRandom, tempNode; i < 10; i++) {
			iRandom = Math.floor(Math.random() * 10);
			tempNode = this.stage[iRandom]["node"];
			this.stage[iRandom]["node"] = this.stage[i]["node"];
			this.stage[iRandom]["node"].setPosition(this.stage[iRandom]["x"], "vw", "", "");
			this.stage[i]["node"] = tempNode;
			this.stage[i]["node"].setPosition(this.stage[i]["x"], "vw", "", "");
		}
		this.shuffleButton.style.display = "none";
		this.sortButton.style.display = "block";
	}

	// loads node elements onto the stage array
	#buildNodes() {
		// sp stands for starting position, representing the starting x position
		for (var i = 0, sp = (100 - (3 * 10)) / 11.0, x = sp, y = "calc((100vh - 3vw) * 0.5)"; i < 10; i++) {
			const node = new Node(i + 1);
			this.stage.push({
				"x":x, 
				"node":node
			});
			node.setPosition(x, "vw", y, "");
			x += sp + 3; // adding 3 due to the width of the element
		}
	}
}

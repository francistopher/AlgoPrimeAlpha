class NodeMaster {
	constructor() {
		this.stage = [];
		this.shuffleButton;
		this.sortButton;
		this.#buildNodes();
		this.#buildShuffleButton();
		this.#buildSortButton();
	}

	#buildSortButton() {
		this.sortButton = document.createElement("BUTTON");
		this.sortButton.style.position = "absolute";
		this.sortButton.innerHTML = "SORT";
		document.body.appendChild(this.sortButton);
		this.sortButton.style.display = "none";
	}

	#buildShuffleButton() {
		this.shuffleButton = document.createElement("BUTTON");
		this.shuffleButton.style.position = "absolute";
		this.shuffleButton.innerHTML = "SHUFFLE";
		this.shuffleButton.addEventListener("click", () => this.#shuffleElements());
		document.body.appendChild(this.shuffleButton);
	}

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

	#buildNodes() {
		for (var i = 0, sp = (100 - (3 * 10)) / 11.0, x = sp, y = "calc((100vh - 3vw) * 0.5)"; i < 10; i++) {
			const node = new Node(i + 1);
			this.stage.push({
				"x":x, 
				"node":node
			});
			node.setPosition(x, "vw", y, "");
			x += sp + 3;
		}
	}
}

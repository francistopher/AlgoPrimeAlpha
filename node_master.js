/*
 *	Class that houses, builds, and shuffles the node elements
 */
class NodeMaster {
   constructor() {
      this.stage = [];
      this.nodeCount = 10;
      this.shuffleButton;
      this.sortButton;
      this.nodeCountSlider;
      this.searchField;
      this.#buildNodes();
      this.#buildShuffleButton();
      this.#buildSortButton();
      this.#buildNodeCountSlider();
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
      for (var i = 0, iRandom, tempNode; i < this.nodeCount; i++) {
         iRandom = Math.floor(Math.random() * this.nodeCount);
         tempNode = this.stage[iRandom]["node"];
         this.stage[iRandom]["node"] = this.stage[i]["node"];
         this.stage[iRandom]["node"].setPosition(this.stage[iRandom]["x"], "vw", "", "");
         this.stage[i]["node"] = tempNode;
         this.stage[i]["node"].setPosition(this.stage[i]["x"], "vw", "", "");
      }
      this.shuffleButton.style.display = "none";
      this.nodeCountSlider.style.display = "none";
      this.sortButton.style.display = "block";
   }

   // loads node elements onto the stage array
   #buildNodes() {
      // sp stands for starting position, representing the starting x position
      const sp = (100 - 3 * this.nodeCount) / (this.nodeCount + 1);
      for (var i = 0, x = sp, y = "calc((100vh - 3vw) * 0.5)"; i < this.nodeCount; i++) {
         var node = new Node(i + 1);
         this.stage.push({
            x: x,
            node: node,
         });
         node.setPosition(x, "vw", y, "");
         x += sp + 3; // adding 3 due to the width of the element
      }
   }

   #cleanStage() {
      for (var i = 0; i < this.stage.length; i++) {
         this.stage[i]["node"].remove();
      }
      this.stage.length = 0;
      console.log(this.stage.length);
   }

   #updateNodeCount(newNodeCount) {
      this.nodeCount = parseInt(newNodeCount);
      this.#cleanStage();
      this.#buildNodes();
   }

   #buildNodeCountSlider() {
      this.nodeCountSlider = document.createElement("input");
      this.nodeCountSlider.type = "range";
      this.nodeCountSlider.value = this.nodeCount + "";
      this.nodeCountSlider.min = "5";
      this.nodeCountSlider.max = "20";
      this.nodeCountSlider.style.accentColor = "black";
      this.nodeCountSlider.addEventListener("input", () => {
         this.#updateNodeCount(this.nodeCountSlider.value);
      });
      document.body.appendChild(this.nodeCountSlider);
   }

   createSearchField() {
      if (this.searchField) {
         console.log("showing");
         this.searchField.style.display = "block";
      } else {
         console.log("created");
         this.searchField = document.createElement("input");
         this.searchField.style.borderStyle = "solid";
         this.searchField.style.borderBlockColor = "black";
         this.searchField.placeholder = "Enter value here!";
         document.body.appendChild(this.searchField);
      }
   }

   getSearchFieldValue() {
      console.log(this.searchField.value);
   }

   hideSearchField() {
      this.searchField.style.display = "none";
   }
}

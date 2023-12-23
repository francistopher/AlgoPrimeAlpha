class Graph {
   constructor() {
      console.log("Hello World! This is Graph!");
      this.nodes = [];
      this.values = [];
      this.nodesCountSlider = NaN;
      this.nodesCountLabel = NaN;
      this.#setNodesCountLabel();
      this.#setNodesCountSlider();
      this.#nodesGenerator();
      this.#nodesDegenerator();
   }

   /**
    * Creates the nodes count label
    */
   #setNodesCountLabel() {
      this.nodesCountLabel = document.createElement("label");
      this.nodesCountLabel.innerHTML = "Nodes Count Slider: ";
      this.nodesCountLabel.style.display = "inline";
      document.body.appendChild(this.nodesCountLabel);
   }

   /**
    * Creates the nodes count slider
    */
   #setNodesCountSlider() {
      this.nodesCountSlider = document.createElement("input");
      this.nodesCountSlider.type = "range";
      this.nodesCountSlider.value = 0;
      this.nodesCountSlider.min = "0";
      this.nodesCountSlider.max = "25";
      this.nodesCountSlider.style.accentColor = "black";
      this.nodesCountSlider.style.display = "inline-block";
      document.body.appendChild(this.nodesCountSlider);
   }

   /**
    * Generates a new value, a value not in values
    */
   #addNewValue() {
      var potentiallyNewRandomValue;
      do {
         potentiallyNewRandomValue = Math.ceil(Math.random() * 99 + 1);
      } while (this.values.includes(potentiallyNewRandomValue));
      this.values.push(potentiallyNewRandomValue);
      return potentiallyNewRandomValue;
   }

   /**
    * Generates a new node, based on the nodes count slider value
    */
   #addNewNode() {
      if (this.nodes.length < this.nodesCountSlider.value) {
         var newNode = new MyNode(this.#addNewValue());
         this.#randomlyPlaceNode(newNode);
         this.nodes.push(newNode);
         if (this.nodes.length != this.nodesCountSlider.value) {
            this.#addNewNode();
         }
      }
   }

   /**
    * Randomly plots new node and assures it doesn't intersect with any other node
    */
   #randomlyPlaceNode(newNode) {
      const xPos = Math.floor(Math.random() * 91) + 3;
      const yPos = Math.floor(Math.random() * 81) + 13;
      if (this.#isTooClose(xPos, yPos)) {
         //console.log("too closeee");
         this.#randomlyPlaceNode(newNode);
      } else {
         newNode.reposition(xPos + "vw", yPos + "vh");
      }
   }

   /**
    * Returns boolean whether or not new node is too close from other nodes
    */
   #isTooClose(x, y) {
      for (var i = 0; i < this.nodes.length; i++) {
         const node = this.nodes[i];
         const distance = Math.ceil(Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)));
         if (distance < 7) {
            //console.log("too close");
            return true;
         }
      }
      return false;
   }

   /**
    * Deteriorates a node, based on the nodes count slider value
    */
   #removeNewestNode() {
      if (this.nodes.length > this.nodesCountSlider.value) {
         var removedNode = this.nodes.pop();
         removedNode.removeFromDocument();
         this.values.pop();
         if (this.nodes.length != this.nodesCountSlider.value) {
            this.#removeNewestNode();
         }
      }
   }

   /**
    * Creates an action listener to add a new node based on the slider value
    */
   #nodesGenerator() {
      this.nodesCountSlider.addEventListener("input", () => {
         this.#addNewNode();
      });
   }

   /**
    * Creates an action listener to remove the newest node based on the slider value
    */
   #nodesDegenerator() {
      this.nodesCountSlider.addEventListener("input", () => {
         this.#removeNewestNode();
      });
   }
}

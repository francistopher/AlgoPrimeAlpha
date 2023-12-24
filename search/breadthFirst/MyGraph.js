class Graph {
   constructor() {
      console.log("Hello World! This is Graph!");
      this.nodes = [];
      this.paths = [];
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
    *
    * @param {HTMLElement} nodeA
    * @param {HTMLElement} nodeB
    * generates a path from node A to node B
    */
   #generateNewPath(nodeA, nodeB) {
      // get difference in x and y
      const dx = nodeB.x - nodeA.x;
      const dy = nodeB.y - nodeA.y;
      // calculate distance
      const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      // calculate angle of horizontal to path
      const angleRadians = Math.atan2(dy, dx);
      const angleDegrees = (angleRadians * 180) / Math.PI;
      // create path
      const newPath = document.createElement("label");
      newPath.style.backgroundColor = "black";
      newPath.style.position = "absolute";
      newPath.style.width = distance + "vh";
      newPath.style.height = "1vh";
      newPath.style.left = nodeA.x + "vh";
      newPath.style.top = nodeA.y + "vh";
      newPath.style.transformOrigin = "top left";
      newPath.style.marginLeft = "3vh";
      newPath.style.marginTop = "3vh";
      newPath.style.transform = "rotate(" + angleDegrees + "deg)";
      newPath.style.zIndex = "1";
      document.body.appendChild(newPath);
      this.paths.push(newPath);
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
         const nodesSize = this.nodes.length;
         if (nodesSize > 1) {
            this.#generateNewPath(this.nodes[nodesSize - 2], this.nodes[nodesSize - 1]);
            console.log(this.paths);
         }
         if (this.nodes.length != this.nodesCountSlider.value) {
            this.#addNewNode();
         }
      }
   }

   /**
    * Randomly plots new node and assures it doesn't intersect with any other node
    */
   #randomlyPlaceNode(newNode) {
      const xPos =
         ((Math.floor(Math.random() * 91) + 3) * window.screen.width) / window.screen.height;
      const yPos = Math.floor(Math.random() * 81) + 13;
      if (this.#isTooClose(xPos, yPos)) {
         //console.log("too closeee");
         this.#randomlyPlaceNode(newNode);
      } else {
         newNode.reposition(xPos + "vh", yPos + "vh");
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

class BreadthFirstSearch extends Graph {
   constructor() {
      super();
      console.log("Hello, World! I am Breadth First Search!");
      // create html elements
      this.searchLabel;
      this.searchField;
      this.searchInstructions;
      this.#createSearchLabel();
      this.#createTextField();
      this.#createSearchInstructions();
      // actual material used to search
      this.readyNodes;
      this.#setNodesAsReady();
   }

   #createSearchInstructions() {
      this.searchInstructions = document.createElement("label");
      this.searchInstructions.style.display = "block";
      this.searchInstructions.style.height = "4vh";
      this.searchInstructions.style.width = "65vh";
      this.searchInstructions.style.fontSize = "2vh";
      this.searchInstructions.innerHTML =
         "Enter a number above and double click on node to start search!";
      document.body.appendChild(this.searchInstructions);
   }

   #createSearchLabel() {
      this.searchLabel = document.createElement("label");
      this.searchLabel.style.display = "block-line";
      this.searchLabel.style.height = "4vh";
      this.searchLabel.style.width = "20vh";
      this.searchLabel.style.fontSize = "2vh";
      this.searchLabel.innerHTML = "Number to Search:";
      document.body.appendChild(this.searchLabel);
   }

   #createTextField() {
      this.searchField = document.createElement("input");
      this.searchField.type = "text";
      this.searchField.style.display = "block-line";
      this.searchField.style.height = "2vh";
      this.searchField.style.width = "4vh";
      this.searchField.style.fontSize = "2vh";
      document.body.appendChild(this.searchField);
   }

   #setNodesAsReady() {
      this.readyNodes = [];
      this.nodesCountSlider.addEventListener("mouseup", () => {
         // iterate through the ready nodes to see if it's left the scene
         for (var i = 0; i < this.readyNodes.length; i++) {
            const readyNode = this.readyNodes[i];
            // ready node has left the scene
            if (!this.nodes.includes(readyNode)) {
               this.readyNodes.splice(i, 1);
            }
         }
         // iterate through the nodes to see if they hit up the scene
         for (var j = 0; j < this.nodes.length; j++) {
            const node = this.nodes[j];
            // node has hit up the scene
            if (!this.readyNodes.includes(node)) {
               this.readyNodes.push(node);
               // double click to start the bfs from the node
               node.getElement().addEventListener("dblclick", () => {
                  // is a number
                  let value = this.searchField.value;
                  value = value.replace(/[0-9]/g, "");
                  // assures a number was entered
                  if (value.length == 0 && this.searchField.value.length != 0) {
                     console.log(node.getElement().innerHTML);
                  } else {
                     this.searchInstructions.innerHTML =
                        "ENTER A NUMBER ABOVE and double click on node to start search!";
                  }
               });
            }
         }
      });
   }
}

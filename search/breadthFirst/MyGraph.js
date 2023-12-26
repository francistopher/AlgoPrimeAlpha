class Graph {
   constructor() {
      console.log("Hello World! This is Graph!");
      this.nodes = [];
      this.values = [];
      this.paths = [];
      this.allNodePaths = new Map();
      this.allPathNodes = new Map();
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
      newPath.style.height = "0.5vh";
      newPath.style.left = nodeA.x + "vh";
      newPath.style.top = nodeA.y + "vh";
      newPath.style.transformOrigin = "top left";
      newPath.style.marginLeft = "3vh";
      newPath.style.marginTop = "3vh";
      newPath.style.transform = "rotate(" + angleDegrees + "deg)";
      newPath.style.zIndex = "1";
      document.body.appendChild(newPath);
      this.paths.push(newPath);
      return newPath;
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
            // create path between current and subsequent node
            const nodeA = this.nodes[nodesSize - 2];
            const nodeB = this.nodes[nodesSize - 1];
            const newPath = this.#createNewPath(nodeA, nodeB);
            // store path nodes relationship
            this.#createPathToNodes(newPath, nodeA, nodeB);
         }
         if (nodesSize > 3) {
            // create additional paths
            if (Math.random() > 0.42) {
               this.#createAdditionalPath(newNode);
            }
         }
         this.#addNodeHighlighting(newNode);
         this.#addNodeDraggability(newNode);
         if (this.nodes.length != this.nodesCountSlider.value) {
            this.#addNewNode();
         }
      }
   }

   /**
    * Enables the node to be draggable
    * @param {MyNode} newNode
    */
   #addNodeDraggability(newNode) {
      let isDragging = false;
      let offsetX, offsetY;
      // when element is selected track its offset
      newNode.getElement().addEventListener("mousedown", function (event) {
         isDragging = true;
         offsetX = event.clientX - this.getBoundingClientRect().left;
         offsetY = event.clientY - this.getBoundingClientRect().top;
      });
      // reposition relative to offset
      document.addEventListener("mousemove", (event) => {
         if (isDragging) {
            const x =
               (((event.clientX - offsetX) / window.screen.width) * 120 * window.screen.width) /
               window.screen.height;
            const y = ((event.clientY - offsetY) / window.screen.height) * 120;
            // calculate vh, 120 to recorrect
            newNode.reposition(x, y);
            this.#updateNodePathsPositions(newNode);
         }
      });
      // cuts the repositioning from happening
      document.addEventListener("mouseup", function () {
         // console.log("UP");
         isDragging = false;
      });
   }

   /**
    * Updates the paths of the dragged node
    * @param {MyNode} draggedNode
    */
   #updateNodePathsPositions(draggedNode) {
      // get all paths of node
      const paths = this.allNodePaths.get(draggedNode);
      // update each path of the dragged node
      for (var i = 0; i < paths.length; i++) {
         var path = paths[i];
         this.#updateNodePathPosition(draggedNode, path);
      }
   }

   /**
    *
    * @param {MyNode} draggedNode
    * @param {Label} path
    */
   #updateNodePathPosition(draggedNode, path) {
      const nodes = this.allPathNodes.get(path);
      var nodeA = nodes[0];
      var nodeB = nodes[1];
      // console.log(draggedNode, nodeA, nodeB);
      // get difference in x and y
      const dx = nodeB.x - nodeA.x;
      const dy = nodeB.y - nodeA.y;
      // calculate distance
      const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      // calculate angle of horizontal to path
      const angleRadians = Math.atan2(dy, dx);
      const angleDegrees = (angleRadians * 180) / Math.PI;
      // update length
      path.style.width = distance + "vh";
      // update position relative to nodeA when it's the dragged node
      if (draggedNode === nodeA) {
         path.style.left = draggedNode.x + "vh";
         path.style.top = draggedNode.y + "vh";
      }
      // otherwise maintain position and just rotate
      path.style.transform = "rotate(" + angleDegrees + "deg)";
   }

   /**
    * Stores the relation of path to nodes in a map
    * @param {Button} path
    * @param {MyNode} nodeA
    * @param {MyNode} nodeB
    */
   #createPathToNodes(path, nodeA, nodeB) {
      // store the nodes sharing a path
      const nodes = [];
      nodes.push(nodeA);
      nodes.push(nodeB);
      this.allPathNodes.set(path, nodes);
      this.#addPathHighlighting(path, nodeA, nodeB);
   }

   #addNodeHighlighting(newNode) {
      // move highlighted path on top of other paths
      newNode.getElement().addEventListener("mouseenter", () => {
         const nodePaths = this.allNodePaths.get(newNode);
         // force every path to be at the same level
         for (var j = 0; j < this.paths.length; j++) {
            const path = this.paths[j];
            path.style.zIndex = "1";
         }
         // force the paths of the node to be above all other paths
         for (var i = 0; i < nodePaths.length; i++) {
            const nodePath = nodePaths[i];
            nodePath.style.backgroundColor = "magenta";
            nodePath.style.zIndex = "2";
         }
      });
      // have every path return to the same level
      newNode.getElement().addEventListener("mouseleave", () => {
         const nodePaths = this.allNodePaths.get(newNode);
         // console.log(nodePaths);
         for (var i = 0; i < nodePaths.length; i++) {
            const nodePath = nodePaths[i];
            nodePath.style.backgroundColor = "black";
         }
         for (var j = 0; j < this.paths.length; j++) {
            const path = this.paths[j];
            path.style.zIndex = "1";
         }
      });
   }

   /**
    * Enables the path and nodes associated to be highlighted when mouse hovers over path
    * @param {Label} path
    * @param {MyNode} nodeA
    * @param {MyNode} nodeB
    */
   #addPathHighlighting(path, nodeA, nodeB) {
      // highlight path and nodes when hovered over path
      path.addEventListener("mouseenter", () => {
         path.style.backgroundColor = "magenta";
         nodeA.getElement().style.borderColor = "magenta";
         nodeB.getElement().style.borderColor = "magenta";
      });
      // unhighlight path and nodes when leaving path
      path.addEventListener("mouseleave", () => {
         path.style.backgroundColor = "black";
         nodeA.getElement().style.borderColor = "black";
         nodeB.getElement().style.borderColor = "black";
      });
   }

   /**
    * Generates additional paths exceeding the number of nodes
    */
   #createAdditionalPath() {
      const nodeA = this.#getRandomlySelectedNode();
      var nodeB = this.#getRandomlySelectedNode();
      // continue searching for node if they have a common path or are the same
      while (nodeA === nodeB || this.#haveCommonPath(nodeA, nodeB)) {
         // console.log("SEARCHING");
         nodeB = this.#getRandomlySelectedNode();
      }
      const newPath = this.#createNewPath(nodeA, nodeB);
      this.#createPathToNodes(newPath, nodeA, nodeB);
      // console.log("ADDITIONAL PATH");
   }

   /**
    * Determines if nodes have a common path
    */
   #haveCommonPath(nodeA, nodeB) {
      const paths1 = this.allNodePaths.get(nodeA);
      var paths2 = this.allNodePaths.get(nodeB);
      for (const path1 of paths1) {
         for (const path2 of paths2) {
            if (path1 === path2) {
               return true; // Common path found
            }
         }
      }
      return false; // No common path found
   }

   /**
    * Randomly select node
    */
   #getRandomlySelectedNode() {
      const randomIndex = Math.floor(Math.random() * this.nodes.length);
      return this.nodes[randomIndex];
   }

   /**
    * Generates a new path between the two given nodes
    */

   #createNewPath(nodeA, nodeB) {
      // build new path
      const newPath = this.#generateNewPath(nodeA, nodeB);
      // search for node in allNodePaths to see if node is connected to a path already
      // thus add it to the paths it's connected to
      if (this.allNodePaths.get(nodeA)) {
         this.allNodePaths.get(nodeA).push(newPath);
      } else {
         const nodeAPaths = [];
         nodeAPaths.push(newPath);
         this.allNodePaths.set(nodeA, nodeAPaths);
      }
      if (this.allNodePaths.get(nodeB)) {
         this.allNodePaths.get(nodeB).push(newPath);
      } else {
         const nodeBPaths = [];
         nodeBPaths.push(newPath);
         this.allNodePaths.set(nodeB, nodeBPaths);
      }
      return newPath;
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
         if (distance < 13) {
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
         // remove the node and path(s) relations
         var removedNode = this.nodes.pop();
         this.#removePath(removedNode);
         removedNode.removeFromDocument();
         this.values.pop();
         // rerun if function is lagging behind user
         if (this.nodes.length != this.nodesCountSlider.value) {
            this.#removeNewestNode();
         }
      }
   }

   /**
    * Removes the path associated to the removed node
    * NOTE: the last node remaining will still be associated to its previous path
    */
   #removePath(node) {
      // iterate through paths to remove them
      const nodePaths = this.allNodePaths.get(node);

      // remove paths from document
      for (var i = 0; i < nodePaths.length; i++) {
         const nodePath = nodePaths[i];

         nodePath.remove();
         // remove path from list NOTE: O(n)
         for (var j = 0; j < this.paths.length; j++) {
            const searchedNodePath = this.paths[j];
            if (searchedNodePath === nodePath) {
               searchedNodePath.remove();
               this.paths.splice(j, 1);
            }
         }
      }
      // remove node from correlations
      this.allNodePaths.delete(node);
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

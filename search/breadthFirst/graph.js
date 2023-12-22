class Graph {
   /**
    *
    * @param {boolean} buildAdjacencyMatrix builds an adjacency matrix by default
    * if false build an adjacency list instead
    */
   constructor() {
      console.log("Hello World! This is Graph!");
      this.nodes = [];
      this.nodesCountSlider = NaN;
      this.nodesCountLabel = NaN;
      this.#setNodesCountLabel();
      this.#setNodesCountSlider();
   }

   #setNodesCountLabel() {
      this.nodesCountLabel = document.createElement("label");
      this.nodesCountLabel.innerHTML = "Nodes Count Slider: ";
      this.nodesCountLabel.style.display = "inline";
      document.body.appendChild(this.nodesCountLabel);
   }

   #setNodesCountSlider() {
      this.nodeCountSlider = document.createElement("input");
      this.nodeCountSlider.type = "range";
      this.nodeCountSlider.value = 0;
      this.nodeCountSlider.min = "0";
      this.nodeCountSlider.max = "25";
      this.nodeCountSlider.style.accentColor = "black";
      this.nodeCountSlider.style.display = "inline-block";
      document.body.appendChild(this.nodeCountSlider);
   }

   #setPathsCountLabel() {}

   #setPathsCountSlider() {}

   #addNodesValues() {}

   #removeNodesValues() {}

   #addPathsValues() {}

   #removePathsValues() {}
}

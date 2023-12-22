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
      this.nodesSliderLabel = NaN;
      this.#setNodesCountLabel();
   }

   #setNodesCountLabel() {
      this.nodesSliderLabel = document.createElement("label");
      this.nodesSliderLabel.innerHTML = "Nodes Count Slider: ";
      this.nodesSliderLabel.style.display = "inline";
      document.body.appendChild(this.nodesSliderLabel);
   }

   #setNodesCountSlider() {}

   #setPathsCountLabel() {}

   #setPathsCountSlider() {}

   #addNodesValues() {}

   #removeNodesValues() {}

   #addPathsValues() {}

   #removePathsValues() {}
}

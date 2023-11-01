class Graph {
   /**
    *
    * @param {boolean} buildMatrix builds an adjacency matrix by default
    * if false build an adjacency list instead
    */
   constructor() {
      this.nodesValues = [];
      this.pathsValues = [];
      this.nodeCount = 0;
      this.pathsCount = 0;
      // determine some sort of maxNodeCount limit
      this.maxPathsCount = 0;
      this.nodesCountSlider = NaN;
      this.pathsCountSlider = NaN;
   }

   #setNodesCountLabel() {}

   #setNodesCountSlider() {}

   #setPathsCountLabel() {}

   #setPathsCountSlider() {}

   #addNodesValues() {}

   #removeNodesValues() {}

   #addPathsValues() {}

   #removePathsValues() {}
}

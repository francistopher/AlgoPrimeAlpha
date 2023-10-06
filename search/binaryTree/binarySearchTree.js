class BinarySearchTree extends TreeNodeManager {
   constructor() {
      super(2);
      this.root = NaN;
      // binary tree cant balance
      this.hideBalanceButton();
      this.#listenToAddGeneratedValue();
   }

   /**
    * Shuffles the nodes of the tree by
    * unloading the element values into an array
    * shuffles the array with the element values
    * and rebuilds the tree with the shuffled elements
    */
   #shuffleNodes() {}

   #listenToAddGeneratedValue() {
      this.nodeCountSlider.addEventListener("input", () => {
         this.#addGeneratedValue();
         this.#removeGeneratedValue();
      });
   }

   #addGeneratedValue() {
      if (this.values.length < this.nodeCountSlider.value) {
         const randommm = Math.floor(Math.random() * 50 + 1);
         if (this.values.includes(randommm)) {
            // console.log(randommm, "repeat");
            this.#addGeneratedValue();
         } else {
            this.values.push(randommm);
            this.#addNode(randommm);
            console.log(randommm, this.values, this.values.length, this.nodeCountSlider.value);
         }
         if (this.values.length != this.nodeCountSlider.value) {
            this.#addGeneratedValue();
            this.#removeGeneratedValue();
         }
      }
   }

   #removeGeneratedValue() {
      if (this.values.length > this.nodeCountSlider.value) {
         this.values.pop(this.values.length - 1);
         if (this.values.length != this.nodeCountSlider.value) {
            this.#addGeneratedValue();
            this.#removeGeneratedValue();
         }
      }
   }

   #addNode(value) {
      if (!this.getRoot()) {
         this.root = new TreeNode(value, this.maxChildren);
         this.root.setPosition("calc((100vw - 3vw) * 0.5)", "3vw");
      }
   }

   #removeNode() {}

   #createPath() {}
}

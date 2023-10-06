class BinarySearchTree extends TreeNodeManager {
   constructor() {
      super(2);
      // binary tree cant balance
      this.hideBalanceButton();
      this.root;
      this.#listenToAddGeneratedValue();
   }

   #buildNodes() {}

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
            console.log(randommm, this.values, this.values.length, this.nodeCountSlider.value);
         }
         if (this.values.length != this.nodeCountSlider.value) {
            this.#addGeneratedValue();
         }
      }
   }

   addNode() {
      if (this.root == NaN) {
         this.root = new TreeNode(this.maxChildren);
      }
   }

   #createPath() {}
}

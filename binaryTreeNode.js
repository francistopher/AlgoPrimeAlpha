class BinaryTreeNode {
   constructor(value, maxChildren) {
      // node aspect
      this.value = value;
      this.label;
      this.x;
      this.y;
      this.#buildLabel();
      // tree aspect
      this.maxChildren = maxChildren;
      this.leftChild = NaN;
      this.rightChild = NaN;
   }

   #addChild(binaryTreeNode) {
      if (binaryTreeNode.value < this.value) {
         this.leftChild = binaryTreeNode;
      } else {
         this.rightChild = binaryTreeNode;
      }
   }

   #buildLabel() {
      this.label = document.createElement("LABEL");
      this.label.id = "node";
      this.label.innerHTML = this.value;
   }

   remove() {
      this.label.remove();
   }

   setPosition(left, top) {
      this.label.style.left = left;
      this.label.style.top = top;
      document.body.appendChild(this.label);
   }
}

class BinaryTreeNode {
   constructor(value) {
      // node aspect
      this.value = value;
      this.label;
      this.left;
      this.top;
      this.#buildLabel();
      // tree aspect
      this.leftChild = NaN;
      this.rightChild = NaN;
      // rendering aspect
      this.parentNode = NaN;
   }

   addChild(newChild, level, previousBranchDirection) {
      // if new child's value is less
      if (newChild.value < this.value) {
         // and left child doesn't exist
         if (!this.leftChild) {
            if (previousBranchDirection <= 0) {
               newChild.setPosition(
                  "calc(" + this.left + " - " + 6 + "vw)",
                  "calc(" + this.top + " + " + 3 + "vw)"
               );
            } else {
               newChild.setPosition(
                  "calc(" + this.left + " - " + 3 + "vw)",
                  "calc(" + this.top + " + " + 3 + "vw)"
               );
            }
            newChild.parentNode = this;
            this.leftChild = newChild;
         }
         // and left child does exist
         else {
            this.leftChild.addChild(newChild, level * 2, -1);
         }
      }
      // if the new child's value is greater
      if (newChild.value > this.value) {
         // and right child doesn't exist
         if (!this.rightChild) {
            if (previousBranchDirection >= 0) {
               newChild.setPosition(
                  "calc(" + this.left + " + " + 6 + "vw)",
                  "calc(" + this.top + " + " + 3 + "vw)"
               );
            } else {
               newChild.setPosition(
                  "calc(" + this.left + " + " + 3 + "vw)",
                  "calc(" + this.top + " + " + 3 + "vw)"
               );
            }
            newChild.parentNode = this;
            this.rightChild = newChild;
         }
         // and right child does exist
         else {
            this.rightChild.addChild(newChild, level * 2, 1);
         }
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
      console.log(this.value, left, top);
      this.left = left;
      this.top = top;
      this.label.style.left = left;
      this.label.style.top = top;
      document.body.appendChild(this.label);
   }
}

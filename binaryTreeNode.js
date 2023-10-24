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
      this.parentBranch = NaN;
      this.isRightChild = false;
      this.isLeftChild = false;
   }

   stretchSameDirectionAncestorBranches(newNode, stretchDirection) {
      // found root
      if (newNode.parentBranch) {
         // find the root
         this.stretchSameDirectionAncestorBranches(newNode.parentNode, stretchDirection);
         if (stretchDirection == 1 && newNode.isRightChild) {
            newNode.setPosition("calc(" + newNode.left + " + " + 3 + "vw)", newNode.top);
            if (newNode.parentNode) {
               newNode.parentBranch.remove();
               newNode.parentBranch = NaN;
               this.#buildParentBranch(newNode.parentNode, newNode);
            }
            //this.#buildParentBranch(newNode.parentNode, newNode);
         } else if (stretchDirection == -1 && newNode.isLeftChild) {
            console.log("stretch", newNode.value, "to the left");
            newNode.setPosition("calc(" + newNode.left + " - " + 3 + "vw)", newNode.top);
            if (newNode.parentNode) {
               newNode.parentBranch.remove();
               newNode.parentBranch = NaN;
               this.#buildParentBranch(newNode.parentNode, newNode);
            }
            //this.#buildParentBranch(newNode.parentNode, newNode);
         }
      }
   }

   stretchDiffDirectionAncestorBranches(newNode, stretchDirection) {
      if (newNode.parentBranch) {
         this.stretchDiffDirectionAncestorBranches(newNode.parentNode, stretchDirection);
         if (stretchDirection == 1 && newNode.isLeftChild) {
            console.log("stretch", newNode.value, "to the right");
         } else if (stretchDirection == -1 && newNode.isRightChild) {
            console.log("stretch", newNode.value, "to the left");
         }
      }
   }

   thereIsDiffDirectionAncestorBranch(newNode, stretchDirection) {
      if (!newNode) {
         return false;
      } else {
         if (newNode.isLeftChild && stretchDirection == 1) {
            return true;
         } else if (newNode.isRightChild && stretchDirection == -1) {
            return true;
         } else {
            return this.thereIsDiffDirectionAncestorBranch(newNode.parentNode, stretchDirection);
         }
      }
   }

   addChild(newChild, level, previousBranchDirection) {
      // if new child's value is less
      if (newChild.value < this.value) {
         // and left child doesn't exist
         if (!this.leftChild) {
            // console.log(this.thereIsDiffDirectionAncestorBranch(this, -1));
            // this.stretchSameDirectionAncestorBranches(this, -1);
            if (previousBranchDirection <= 0) {
               // parent coming fromt the left
               newChild.setPosition(
                  "calc(" + this.left + " - " + 6 + "vw)",
                  "calc(" + this.top + " + " + 3 + "vw)"
               );
            }
            // parent coming from the right
            else {
               newChild.setPosition(
                  "calc(" + this.left + " - " + 3 + "vw)",
                  "calc(" + this.top + " + " + 3 + "vw)"
               );
            }
            newChild.parentNode = this;
            this.leftChild = newChild;
            newChild.isLeftChild = true;
            newChild.isRightChild = false;
            this.#buildParentBranch(this, newChild);
            this.#updateInnerFamilyZIndexes(level, newChild);
         }
         // and left child does exist
         else {
            this.leftChild.addChild(newChild, level + 1, -1);
         }
      }
      // if the new child's value is greater
      if (newChild.value > this.value) {
         // and right child doesn't exist
         if (!this.rightChild) {
            // keep on going right
            // console.log(this.thereIsDiffDirectionAncestorBranch(this, 1));
            // this.stretchSameDirectionAncestorBranches(this, 1);
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
            newChild.isLeftChild = false;
            newChild.isRightChild = true;
            this.#buildParentBranch(this, newChild);
            this.#updateInnerFamilyZIndexes(level, newChild);
         }
         // and right child does exist
         else {
            this.rightChild.addChild(newChild, level + 1, 1);
         }
      }
   }

   #getRawValue(cssSize) {
      if (cssSize.includes("calc")) {
         return Number(cssSize.substring(5, cssSize.length - 3));
      } else {
         return Number(cssSize.substring(0, cssSize.length - 2));
      }
   }

   #buildParentBranch(parentNode, currentNode) {
      // styling the parent branch
      currentNode.parentBranch = document.createElement("div");
      currentNode.parentBranch.style.backgroundColor = "black";
      currentNode.parentBranch.style.position = "absolute";
      currentNode.parentBranch.style.height = "0.5vw";
      // getting necessary values to calculate the length
      const parentNodeLeft = this.#getRawValue(parentNode.label.style.left) + 0.5;
      const parentNodeTop = this.#getRawValue(parentNode.label.style.top) + 0.5;
      const currentNodeLeft = this.#getRawValue(currentNode.label.style.left) + 0.5;
      const currentNodeTop = this.#getRawValue(currentNode.label.style.top) + 0.5;
      // calculate the length of the branch
      const deltaX = currentNodeLeft - parentNodeLeft;
      const deltaY = currentNodeTop - parentNodeTop;
      const branchLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      currentNode.parentBranch.style.width = branchLength + "vw";

      // alculate the angle of the branch accurately
      const angleInRadians = Math.atan2(deltaY, deltaX);

      // convert the angle to degrees
      var angle = (angleInRadians * 180) / Math.PI;
      // format the angle and apply the positioning of the branch based on which child it is
      // left child
      if (parentNodeLeft > currentNodeLeft) {
         currentNode.parentBranch.style.left = currentNode.label.style.left;
         currentNode.parentBranch.style.top = currentNode.label.style.top;
      }
      // right child
      else {
         currentNode.parentBranch.style.left = parentNode.label.style.left;
         currentNode.parentBranch.style.top = currentNode.label.style.top;
      }
      currentNode.parentBranch.style.marginLeft = "1.25vw";
      //console.log(angle);
      // apply the angle to the branch
      currentNode.parentBranch.style.transform = "rotate(" + angle + "deg)";
      document.body.appendChild(currentNode.parentBranch);
   }

   // updates the z index of the parent, left child, right child, and the branch
   #updateInnerFamilyZIndexes(level, child) {
      child.label.style.zIndex = level;
      child.parentNode.label.style.zIndex = level;
      child.parentBranch.style.zIndex = level - 1;
   }

   #buildLabel() {
      this.label = document.createElement("LABEL");
      this.label.id = "node";
      this.label.innerHTML = this.value;
      this.label.style.backgroundColor = "white";
      //this.label.style.zIndex = "100";
   }

   // remove the label and it's dedicated branch from the the html document
   remove() {
      this.label.remove();
      if (this.parentBranch) {
         this.parentBranch.remove();
      }
      if (this.parentNode.leftChild && this.parentNode.leftChild.value == this.value) {
         this.parentNode.leftChild = NaN;
      }
      if (this.parentNode.rightChild && this.parentNode.rightChild.value == this.value) {
         this.parentNode.rightChild = NaN;
      }
   }

   setPosition(left, top) {
      this.left = left;
      this.top = top;
      this.label.style.setProperty("left", left);
      this.label.style.setProperty("top", top);
      document.body.appendChild(this.label);
   }
}

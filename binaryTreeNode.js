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
            this.#buildParentBranch(this, newChild);
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
            this.#buildParentBranch(this, newChild);
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
      const parentBranch = document.createElement("div");
      parentBranch.style.backgroundColor = "black";
      parentBranch.style.position = "absolute";
      parentBranch.style.height = "0.5vw";
      // getting necessary values to calculate the length
      const parentNodeLeft = this.#getRawValue(parentNode.label.style.left) + 0.5;
      const parentNodeTop = this.#getRawValue(parentNode.label.style.top) + 0.5;
      const currentNodeLeft = this.#getRawValue(currentNode.label.style.left) + 0.5;
      const currentNodeTop = this.#getRawValue(currentNode.label.style.top) + 0.5;
      // calculate the length of the branch
      const branchLength = Math.sqrt(
         Math.pow(currentNodeLeft - parentNodeLeft, 2) + Math.pow(currentNodeTop - parentNodeTop, 2)
      );
      parentBranch.style.width = branchLength + "vw";
      // calculate the angle of the branch
      const numerator = parentNodeLeft * currentNodeLeft + parentNodeTop * currentNodeTop;
      const denominator =
         Math.sqrt(Math.pow(parentNodeLeft, 2) + Math.pow(parentNodeTop, 2)) *
         Math.sqrt(Math.pow(currentNodeTop, 2) + Math.pow(currentNodeLeft, 2));
      const fraction = numerator / denominator;
      parentBranch.style.transformOrigin = "center";
      var angle = (Math.acos(fraction) * 180) / Math.PI;
      // format the angle and apply the positioning of the branch based on which child it is
      // left child
      if (parentNodeLeft > currentNodeLeft) {
         angle += 145;
         parentBranch.style.left = currentNode.label.style.left;
         parentBranch.style.top = currentNode.label.style.top;
      }
      // right child
      else {
         angle += 30;
         parentBranch.style.left = parentNode.label.style.left;
         parentBranch.style.top = currentNode.label.style.top;
      }
      parentBranch.style.marginLeft = "1.25vw";
      //console.log(angle);
      // apply the angle to the branch
      parentBranch.style.transform = "rotate(" + angle + "deg)";
      document.body.appendChild(parentBranch);
   }

   #buildLabel() {
      this.label = document.createElement("LABEL");
      this.label.id = "node";
      this.label.innerHTML = this.value;
      this.label.style.backgroundColor = "white";
      //this.label.style.zIndex = "100";
   }

   remove() {
      this.label.remove();
   }

   setPosition(left, top) {
      this.left = left;
      this.top = top;
      this.label.style.setProperty("left", left);
      this.label.style.setProperty("top", top);
      document.body.appendChild(this.label);
   }
}

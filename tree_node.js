class TreeNode {
   constructor(value, maxChildren) {
      // node aspect
      this.value = value;
      this.label;
      this.x;
      this.y;
      this.#buildLabel();
      // tree aspect
      this.maxChildren = maxChildren;
      this.children = [];
   }

   #addChild(treeNode) {
      if (children.size() < this.maxChildren) {
         children.append(treeNode);
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

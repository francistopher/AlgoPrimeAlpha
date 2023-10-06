class TreeNode extends Node {
   constructor(value, maxChildren) {
      super(value);
      this.maxChildren = maxChildren;
      children = [];
      level = 0;
   }

   #addChild(treeNode) {
      if (children.size() < this.maxChildren) {
         children.append(treeNode);
      }
   }
}

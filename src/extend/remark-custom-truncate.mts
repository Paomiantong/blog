import { visit, SKIP } from "unist-util-visit";

const RemarkCustomTruncate = () => {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (/\$--\s*(truncate)\s*--\$/.test(node.value)) {
        node.value = node.value.replace(/\$--\s*(truncate)\s*--\$/, "");
        if (node.value.trim() === "") {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
      }
    });
    visit(tree, "paragraph", (node, index, parent) => {
      if (node.children.length === 0) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    });
  };
};

export default RemarkCustomTruncate;

import { spacing } from "pangu";
import { visit } from "unist-util-visit";

const RemarkSpacing = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "text") {
        node.value && (node.value = spacing(node.value));
      }
      if (
        node.type === "link" ||
        node.type === "definition" ||
        node.type === "image"
      ) {
        node.title && (node.title = spacing(node.title));
      }
      if (node.type === "image" || node.type === "imageReference") {
        node.alt && (node.alt = spacing(node.alt));
      }
    });
  };
};

export default RemarkSpacing;

import { Extension } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { mergeAttributes } from "@tiptap/core";

const GridComponent = {
  props: ["node"],
  template: `
    <div :class="gridClass">
      <node-view-content></node-view-content>
    </div>
  `,
  computed: {
    gridClass() {
      return {
        grid: true,
        "grid-cols-1": true,
        "lg:grid-cols-2": this.node.attrs.twoColumns,
      };
    },
  },
};

export const GridExtension = Extension.create({
  name: "grid",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      twoColumns: {
        default: false,
        parseHTML: (element) =>
          element.getAttribute("data-two-columns") === "true",
        renderHTML: (attributes) => {
          if (!attributes.twoColumns) {
            return {};
          }
          return {
            "data-two-columns": "true",
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-grid]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-grid": "",
      }),
      0,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(GridComponent);
  },

  addCommands() {
    return {
      toggleTwoColumns:
        () =>
        ({ commands }) => {
          return commands?.toggleAttributes("grid", { twoColumns: true });
        },
    };
  },
});

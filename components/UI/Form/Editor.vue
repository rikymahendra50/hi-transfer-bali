<template>
  <ClientOnly>
    <div
      class="space-y-4 rounded-lg p-1.5 relative max-h-[600px] overflow-y-auto"
    >
      <div class="sticky top-0 z-10 bg-white p-2 border rounded-lg">
        <div v-if="editor" class="flex flex-wrap gap-1.5">
          <button
            @click.prevent="editor?.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('bold') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ooui:bold-b" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('italic') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="tabler:italic" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('strike') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="mi:strikethrough" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('code') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ic:baseline-code" />
          </button>

          <button
            @click.prevent="editor?.chain().focus().setParagraph().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('paragraph') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ph:paragraph" />
          </button>

          <button
            @click.prevent="editor?.chain().focus().toggleCodeBlock().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('codeBlock') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="fluent:code-block-16-regular" />
          </button>

          <button
            @click.prevent="
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            "
            :class="{
              'bg-gray-300/60': editor.isActive('heading', { level: 1 }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            h1
          </button>
          <button
            @click.prevent="
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            "
            :class="{
              'bg-gray-300/60': editor.isActive('heading', { level: 2 }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            h2
          </button>
          <button
            @click.prevent="
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            "
            :class="{
              'bg-gray-300/60': editor.isActive('heading', { level: 3 }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            h3
          </button>
          <button
            @click.prevent="
              editor?.chain().focus().toggleHeading({ level: 4 }).run()
            "
            :class="{
              'bg-gray-300/60': editor.isActive('heading', { level: 4 }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            h4
          </button>
          <button
            @click.prevent="
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            "
            :class="{
              'bg-gray-300/60': editor.isActive('heading', { level: 5 }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            h5
          </button>
          <button
            @click.prevent="
              editor?.chain().focus().toggleHeading({ level: 6 }).run()
            "
            :class="{
              'bg-gray-300/60': editor.isActive('heading', { level: 6 }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            h6
          </button>

          <button
            @click="editor?.chain().focus().setTextAlign('left').run()"
            :class="{
              'bg-gray-300/60': editor.isActive({ textAlign: 'left' }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ic:baseline-format-align-left" />
          </button>
          <button
            @click="editor?.chain().focus().setTextAlign('center').run()"
            :class="{
              'bg-gray-300/60': editor.isActive({ textAlign: 'center' }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ic:baseline-format-align-center" />
          </button>
          <button
            @click="editor?.chain().focus().setTextAlign('right').run()"
            :class="{
              'bg-gray-300/60': editor.isActive({ textAlign: 'right' }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ic:baseline-format-align-right" />
          </button>
          <button
            @click="editor?.chain().focus().setTextAlign('justify').run()"
            :class="{
              'bg-gray-300/60': editor.isActive({ textAlign: 'justify' }),
            }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ic:baseline-format-align-justify" />
          </button>
          <button
            @click="editor?.chain().focus().unsetTextAlign().run()"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ic:baseline-format-clear" />
          </button>

          <button
            @click.prevent="editor?.chain().focus().toggleBulletList().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('bulletList') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="zondicons:list-bullet" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().toggleOrderedList().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('orderedList') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="bx:list-ol" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().setHorizontalRule().run()"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ic:outline-horizontal-rule" />
          </button>

          <button
            @click.prevent="editor?.chain().focus().toggleBlockquote().run()"
            :class="{ 'bg-gray-300/60': editor.isActive('blockquote') }"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="mingcute:blockquote-line" />
          </button>

          <button
            @click.prevent="editor?.chain().focus().unsetAllMarks().run()"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="codicon:clear-all" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().clearNodes().run()"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ant-design:clear-outlined" />
          </button>

          <button
            @click.prevent="editor?.chain().focus().setHardBreak().run()"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="icon-park-outline:paragraph-break" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ant-design:undo-outlined" />
          </button>
          <button
            @click.prevent="editor?.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="ant-design:redo-outlined" />
          </button>
          <button
            @click.prevent="addLink"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="i-heroicons-link" />
          </button>
          <button
            @click.prevent="addButton"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="i-heroicons-stop" />
          </button>
          <button
            v-if="withImage"
            @click.prevent="open()"
            type="button"
            class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
          >
            <Icon name="i-heroicons-photo" />
          </button>
          <VMenu>
            <button
              type="button"
              class="p-0.5 hover:bg-gray-300/60 rounded border flex items-center justify-center h-6 w-6"
            >
              <Icon name="i-heroicons-table-cells" />
            </button>
            <template #popper>
              <div class="p-2 w-56">
                <ul>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="
                        editor
                          ?.chain()
                          .focus()
                          .insertTable({
                            rows: 2,
                            cols: 3,
                            withHeaderRow: true,
                          })
                          .run()
                      "
                    >
                      Insert table
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().addColumnBefore().run()"
                    >
                      Add column before
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().addColumnAfter().run()"
                    >
                      Add column after
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().deleteColumn().run()"
                    >
                      Delete column
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().addRowBefore().run()"
                    >
                      Add row before
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().addRowAfter().run()"
                    >
                      Add row after
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().deleteRow().run()"
                    >
                      Delete row
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().deleteTable().run()"
                    >
                      Delete table
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().mergeCells().run()"
                    >
                      Merge cells
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().splitCell().run()"
                    >
                      Split cell
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="
                        editor?.chain().focus().toggleHeaderColumn().run()
                      "
                    >
                      Toggle header column
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().toggleHeaderRow().run()"
                    >
                      Toggle header row
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().toggleHeaderCell().run()"
                    >
                      Toggle header cell
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().mergeOrSplit().run()"
                    >
                      Merge or split
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="
                        editor
                          ?.chain()
                          .focus()
                          .setCellAttribute('colspan', 2)
                          .run()
                      "
                    >
                      Set cell attribute
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().fixTables().run()"
                    >
                      Fix tables
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().goToNextCell().run()"
                    >
                      Go to next cell
                    </button>
                  </li>
                  <li>
                    <button
                      class="w-full text-sm text-left hover:bg-zinc-100/80 p-1 rounded transition-all duration-300"
                      @click="editor?.chain().focus().goToPreviousCell().run()"
                    >
                      Go to previous cell
                    </button>
                  </li>
                </ul>
              </div>
            </template>
          </VMenu>
        </div>
      </div>

      <ClientOnly>
        <editor-content :editor="editor" placeholder="write something" />
        <div v-if="uploading" class="text-xs text-gray-200 p-2 border">
          We are uploading your image ...
        </div>
      </ClientOnly>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, type Content } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";

import { useFileDialog } from "@vueuse/core";

const { imageTourPackageUpload } = useTourPackage();

const props = withDefaults(
  defineProps<{
    modelValue: string;
    isErrors: boolean;
    withImage?: boolean;
  }>(),
  {
    modelValue: "",
    isErrors: false,
    withImage: true,
  }
);

const uploading = ref(false);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const contentClass = computed(() => {
  if (props.isErrors) {
    return "prose !max-w-none p-2 min-h-[200px] w-full border border-red-400 rounded-md  outline-none rounded-md";
  }
  return "prose !max-w-none p-2 min-h-[200px]  w-full  border border-gray-200 rounded-md outline-none rounded-md";
});

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,

    Link.configure(),
    TextAlign.configure({
      types: ["heading", "paragraph", "image"],
      defaultAlignment: "left",
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "paragraph") {
          return "What’s the title?";
        }
        return "Can you add some further context?";
      },
    }),
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: "table table-sm border",
      },
    }),
    TableRow,
    TableHeader.configure({
      HTMLAttributes: {
        class: "border",
      },
    }),
    TableCell.configure({
      HTMLAttributes: {
        class: "border",
      },
    }),
    ImageResize,
  ],
  editorProps: {
    attributes: {
      class: contentClass.value,
    },
  },
  onUpdate(ctx: any) {
    emit("update:modelValue", ctx?.editor?.getHTML());
  },
});

function addLink() {
  const previousUrl = editor.value?.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.value
    ?.chain()
    .focus()
    .extendMarkRange("link")
    .setLink({
      href: url,
      target: "_blank",
      class: "link link-hover link-primary",
    })
    .run();
}

function addButton() {
  const previousUrl = editor.value?.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.value
    ?.chain()
    .focus()
    .extendMarkRange("link")
    .setLink({
      href: url,
      target: "_blank",
      class: "btn btn-primary text-white",
    })
    .run();
}

function addPhoto({ url }: { url: string; alt?: string }) {
  editor.value?.chain().focus().setImage({ src: url, alt: "Hi Travel" }).run();
}

const { open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
  multiple: false,
});

onChange(async (files: FileList | null) => {
  if (!files) {
    return;
  }

  uploading.value = true;
  const file = files[0];

  // check if size should under 1MB

  if (file.size > 1 * 1024 * 1024) {
    return alert("File size should be less than 1MB");
  }
  const url = await imageTourPackageUpload(file);

  if (url) {
    addPhoto({
      url,
    });
  }

  uploading.value = false;
  // @ts-ignore
  reset();
});

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value?.getHTML() === value) {
      return;
    }
    editor.value?.commands.setContent(value as Content, false);
  }
);
</script>

<style scoped>
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>

import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { javascript } from "@codemirror/lang-javascript";

// https://github.com/tailwindlabs/tailwindcss/blob/v2.2.4/stubs/defaultConfig.stub.js
const tailwindTheme = require("tailwindcss/defaultTheme");

// https://github.com/codemirror/basic-setup/blob/0.18.2/src/basic-setup.ts
const setup = [
  defaultHighlightStyle.fallback,
  highlightActiveLine(),
  keymap.of([...defaultKeymap]),
];

// https://github.com/codemirror/view/blob/0.18.17/src/theme.ts
const theme = EditorView.theme({
  "&": {
    "&.cm-focused": {
      outline: "none",
    },
  },
  ".cm-scroller": {
    fontFamily: tailwindTheme.fontFamily.mono.join(", "),
    lineHeight: 1.3,
  },
  ".cm-content": {
    padding: "0",
  },
  ".cm-activeLine": {
    backgroundColor: tailwindTheme.colors.gray[100],
  }
});

const language = javascript();

const view = new EditorView({
  parent: document.querySelector("#editor"),
  state: EditorState.create({
    extensions: [setup, theme, language],
  }),
});

const transaction = view.state.update({
  changes: { from: 0, insert: "function foo(a, b) {\n  return a + b;\n}\n" },
});
view.dispatch(transaction);

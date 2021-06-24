import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { javascript } from "@codemirror/lang-javascript";

const tailwindTheme = require("tailwindcss/defaultTheme");

const setup = [
  defaultHighlightStyle.fallback,
  highlightActiveLine(),
  keymap.of([...defaultKeymap]),
];

const theme = EditorView.theme({
  $: {
    "&$focused": { outline: "none" },
  },
  $scroller: {
    fontFamily: tailwindTheme.fontFamily.mono.join(", "),
  },
  $content: {
    padding: "0",
  },
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

import { EditorView, keymap } from "@codemirror/next/view";
import { EditorState } from "@codemirror/next/state";
import { defaultKeymap } from "@codemirror/next/commands";
import { defaultHighlightStyle } from "@codemirror/next/highlight";
import { highlightActiveLine } from "@codemirror/next/highlight-selection";
import { javascript } from "@codemirror/next/lang-javascript";

const tailwindTheme = require("tailwindcss/defaultTheme");

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

const setup = [
  defaultHighlightStyle,
  highlightActiveLine(),
  keymap([...defaultKeymap]),
];

const view = new EditorView({
  state: EditorState.create({ extensions: [setup, theme, javascript()] }),
  parent: document.body,
});

const transaction = view.state.update({
  changes: { from: 0, insert: "function foo(a, b) {\n  return a + b;\n}\n" },
});
view.dispatch(transaction);

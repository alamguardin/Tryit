import './style.css';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from 'thememirror';

const startState = EditorState.create({
	doc: 'const gretting = "Hello"; \nconsole.log(gretting);',
	extensions: [keymap.of(defaultKeymap), javascript(), dracula],
});

const view = new EditorView({
	state: startState,
	parent: document.querySelector('#editor'),
});

document.querySelector('#editor').addEventListener('keyup', () => {
	//???
});

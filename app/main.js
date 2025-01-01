import './style.css';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from 'thememirror';
import evaluate from './src/Evaluate';

/**
 * Get Started the editor
 */
const startState = EditorState.create({
	doc: '//Write something',
	extensions: [keymap.of(defaultKeymap), javascript(), dracula],
});

const view = new EditorView({
	state: startState,
	parent: document.querySelector('#editor'),
});

const editor = document.getElementById('editor');
const output = document.getElementById('output');

editor.addEventListener('keyup', () => {
	const currentCode = view.state.doc.toString();
	const results = evaluate(currentCode);
	let resultsFragment = '';

	for (const result of results) {
		const resultExpression = `<div>${result}</div>`;
		resultsFragment += resultExpression;
	}

	output.innerHTML = resultsFragment;
});

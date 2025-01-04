import './style.css';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from 'thememirror';
import evaluate from './src/evaluate';

/**
 * Get Started the editor
 */

const testDoc = `
const testResults = {
	str: 'Hello',
	num: 1924,
	bool: true,
	obj: {
		name: 'Alam',
		age: 21,
		bool: false,
		att: { power: 213, money: 100 },
	},
	arr: [['a', 'b'], 0, 1, 2, ['name', ['Alam', 21, [0, 2, 3, true]]]],
};

testResults.str
testResults.num
testResults.bool
testResults.obj
testResults.arr

const arr = [{name: 'Alam'}, {name: 'Jhon'}]
arr

const obj = {names: [0,2,3,4]}
obj
`;

const startState = EditorState.create({
	doc: testDoc,
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
	// console.log(results);
	let resultsFragment = '';

	for (const result of results) {
		const resultExpression = `<div class="${result.type}">${result.content}</div>`;
		resultsFragment += resultExpression;
	}

	output.innerHTML = resultsFragment;
});

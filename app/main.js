import './style.css';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from 'thememirror';
import * as babel from '@babel/standalone';

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
	try {
		const code = view.state.doc.toString();
		const astCode = babel.packages.parser.parse(code);
		const nodes = astCode.program.body;

		let dynamicCode = '';
		let resultsFragment = '';
		const resutls = [];

		for (const node of nodes) {
			const generateCode = babel.packages.generator.default(node);
			dynamicCode += generateCode.code;
			if (node.type === 'ExpressionStatement') {
				// biome-ignore lint/security/noGlobalEval: <explanation>
				resutls.push(eval(dynamicCode));
			}
		}

		for (const result of resutls) {
			const resultExpression = `<div>${result}</div>`;
			resultsFragment += resultExpression;
		}

		output.innerHTML = resultsFragment;
	} catch (e) {
		output.innerHTML = `<div>${e.name}</div>`;
	}
});

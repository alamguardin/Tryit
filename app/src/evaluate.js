import * as Babel from '@babel/standalone';
import formatter from './formatter';

function runCode(code) {
	// biome-ignore lint/security/noGlobalEval: <explanation>
	const executionResult = eval(code);
	const formattedCode = formatter(executionResult);

	return formattedCode;
}

function evaluate(code) {
	try {
		const currentCode = code;
		const codeToAst = Babel.packages.parser.parse(currentCode);
		const nodes = codeToAst.program.body;

		let codeToExecute = '';
		const executionResults = [];

		for (const node of nodes) {
			const astToCode = Babel.packages.generator.default(node);
			codeToExecute += astToCode.code;
			if (node.type === 'ExpressionStatement') {
				const result = runCode(codeToExecute);
				executionResults.push(result);
			}
		}
		return executionResults;
	} catch (err) {
		return [{ type: 'error', content: `${err.name} ${err.message}` }];
	}
}

export default evaluate;

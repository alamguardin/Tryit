import * as Babel from '@babel/standalone';

function isObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function runCode(code) {
	// biome-ignore lint/security/noGlobalEval: <explanation>
	const executionResult = eval(code);

	if (isObject(executionResult)) {
		let fragment = '';
		let loopCount = 0;
		const entriesObject = Object.entries(executionResult);
		for (const entrie of entriesObject) {
			loopCount++;
			fragment += `${entrie[0]} : ${entrie[1]}${loopCount !== entriesObject.length ? ', ' : ''}`;
		}
		return `{ ${fragment} }`;
	}

	if (Array.isArray(executionResult)) {
		let fragment = '';
		let loopCount = 0;
		for (const value of executionResult) {
			loopCount++;
			fragment += `${value}${loopCount !== executionResult.length ? ', ' : ''}`;
		}
		return `[ ${fragment} ]`;
	}

	return executionResult;
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
		return [`${err.name} ${err.message}`];
	}
}

export default evaluate;

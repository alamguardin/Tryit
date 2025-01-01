const testResults = {
	str: 'Hello',
	num: 1924,
	bool: true,
	obj: { name: 'Alam', age: 21, bool: false },
	arr: [21, 'Jhon', false],
};

function str(result) {
	return {
		type: 'string',
		content: `'${result}'`,
	};
}

function num(result) {
	return {
		type: 'number',
		content: result,
	};
}

function bool(result) {
	return {
		type: 'boolean',
		content: result,
	};
}

function formatter(result) {
	if (typeof result === 'string') {
		return str(result);
	}

	if (typeof result === 'number') {
		return num(result);
	}

	if (typeof result === 'boolean') {
		return bool(result);
	}
}

console.log(formatter(testResults.str));
console.log(formatter(testResults.num));
console.log(formatter(testResults.bool));

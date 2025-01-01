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

function isObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

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

function deepMap(arr) {
	return arr.map((item) => {
		return Array.isArray(item)
			? deepMap(item)
			: `<span class='${typeof item}'>${item}</span>`;
	});
}

function arr(result) {
	const newFormat = JSON.stringify(deepMap(result))
		.replaceAll('"', '')
		.replaceAll(',', ', ')
		.replaceAll('[', '[ ')
		.replaceAll(']', ' ]');

	return {
		type: 'array',
		content: newFormat,
	};
}

function mappedObj(obj) {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => {
			if (typeof value === 'object') {
				return [`<span class='key'>${key}</span>`, mappedObj(value)];
			}
			return [
				`<span class='key'>${key}</span>`,
				`<span class='${typeof value}'>${value}</span>`,
			];
		}),
	);
}

function obj(result) {
	const newFormat = JSON.stringify(mappedObj(result))
		.replaceAll('"', '')
		.replaceAll(':', ' : ')
		.replaceAll(',', ', ')
		.replaceAll('{', '{ ')
		.replaceAll('}', ' }');

	return {
		type: 'object',
		content: newFormat,
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

	if (Array.isArray(result)) {
		return arr(result);
	}

	if (isObject(result)) {
		return obj(result);
	}
}

export default formatter;

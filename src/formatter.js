function isObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepMap(arr) {
	return arr.map((item) => {
		return Array.isArray(item)
			? deepMap(item)
			: isObject(item)
				? JSON.stringify(mappedObj(item))
						.replaceAll('"', '')
						.replaceAll(':', ' : ')
						.replaceAll(',', ', ')
						.replaceAll('{', '{ ')
						.replaceAll('}', ' }')
				: `<span class='${typeof item}'>${item}</span>`;
	});
}

function mappedObj(obj) {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => {
			if (isObject(value)) {
				return [`<span class='key'>${key}</span>`, mappedObj(value)];
			}

			if (Array.isArray(value)) {
				return [
					`<span class='key'>${key}</span>`,
					JSON.stringify(deepMap(value))
						.replaceAll('"', '')
						.replaceAll(',', ', ')
						.replaceAll('[', '[ ')
						.replaceAll(']', ' ]'),
				];
			}

			return [
				`<span class='key'>${key}</span>`,
				`<span class='${typeof value}'>${value}</span>`,
			];
		}),
	);
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

function bigint(result) {
	return {
		type: 'bigint',
		content: result,
	};
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

	if (typeof result === 'bigint') {
		return bigint(result);
	}

	if (Array.isArray(result)) {
		return arr(result);
	}

	if (isObject(result)) {
		return obj(result);
	}

	return {
		type: 'undefined',
		content: result,
	};
}

export default formatter;

import express from 'express';

class Server {
	#port;
	#static;
	#server;

	constructor() {
		this.#port = null;
		this.#static = null;
		this.#server = express();
	}

	setPort(port) {
		if (typeof port !== 'number')
			throw new Error('The argument must be a number');

		this.#port = port;
	}

	setStatic(url) {
		if (typeof url !== 'string')
			throw new Error('The argument must be a string');

		this.#static = url;
	}

	run() {
		this.#server.use('/', express.static(this.#static));
		this.#server.listen(this.#port, () => {
			console.log(`Running in the port: ${this.#port}`);
		});
	}
}

export default Server;

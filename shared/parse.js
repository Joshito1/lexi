/*
	parse.js
	description: CLI argv parser
	version: 1.0.0
	date-modified: 2026-1-6
	date-created: 2026-1-5
*/

export function parseArgs(argv) {
	const result = {
		command: null,
		positionals: [],
		flags: {},
		raw: argv,
	};

	let i = 0;

	// First token = command
	result.command = argv[i++];

	for (; i < argv.length; i++) {
		const token = argv[i];

		// Long flag: --flag or --flag=value
		if (token.startsWith("--")) {
			const [name, value] = token.slice(2).split("=");
			result.flags[name] = value ?? true;
			continue;
		}

		// Short flags: -abc
		if (token.startsWith("-") && token.length > 1) {
			for (const char of token.slice(1)) {
				result.flags[char] = true;
			}
			continue;
		}

		// Positional argument
		result.positionals.push(token);
	}

	return result;
}

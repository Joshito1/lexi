/*
	dispatch.js
	description: NA
	version: 1.0.0
	date-modified: 2026-1-6
	date-created: 2026-1-6
*/

export async function dispatch(parsed, registry) {
	const def = registry[parsed.command];

	// Gaurd for unknown command
	if (!def) {
		console.error(`Unknown command "${parsed.command}".`);
	}

	// Map positional args to names args
	const args = {};
	def?.args?.forEach((argDef, i) => {
		args[argDef.name] = parsed.positionals[i];
	});

	// Context object
	const ctx = {
		args,
		flags: parsed.flags,
		cwd: process.cwd(),
	};

	await def.handler(parsed, ctx);

	if (!def.run) {
		console.log(`Command "${parsed.command}" has no implementation.`);
		return;
	}

	try {
		await def.run(ctx);
	} catch (err) {
		// add command context and rethrow to be handled by top-level error handler
		err.message = `Error in command "${parsed.command}": ${err.message}`;
		throw err;
	}
}

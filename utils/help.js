/*
	help.js
	description: Help for the lexi library.
	version: 1.0.0
	date-modified: 2026-1-28
	date-created: 2026-1-21
*/

export function printHelp(registry, commandName = null) {
	if (!commandName) {
		printGlobalHelp(registry);
		return;
	}

	const command = registry[commandName];
	if (!command) {
		console.raw(`Unknown command "${commandName}"\n`);
		printGlobalHelp(registry);
		return;
	}

	printCommandHelp(commandName, command);
}

function printGlobalHelp(registry) {
	// console.raw("Global Help");
	console.raw("\nLexi — i18n CLI tool\n");
	console.raw("Usage:");
	console.raw("   lexi <command> [args] [flags]\n");

	console.raw("Commands:");
	for (const [name, cmd] of Object.entries(registry)) {
		console.raw(`${name.padStart(10).padEnd(15)} ${cmd.description}`);
	}
	console.raw();
}

function printCommandHelp(name, command) {
	console.raw(`\nCommand: ${name}`);
	console.raw(command.description);

	console.raw("\nUsage:");
	const argsUsage = (command.args || []).map((a) => `<${a.name}>`).join(" ");
	console.raw(`  lexi ${name} ${argsUsage} [flags]\n`);

	if (command.args?.length) {
		console.raw("Arguments:");
		for (const arg of command.args) {
			console.raw(`${arg.name.padEnd(12)} ${arg.description}`);
		}
		console.raw();
	}

	if (command.flags && Object.keys(command.flags).length) {
		console.raw("Flags:");
		for (const [name, flag] of Object.entries(command.flags)) {
			const aliases = flag.aliases?.length
				? ` (${flag.aliases.join(", ")})`
				: "";
			const value = flag.takesValue ? " <value>" : "";
			console.raw(`--${name}${value}${aliases}  ${flag.description}`);
		}
		console.raw();
	}
}

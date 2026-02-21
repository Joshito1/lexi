/*
	registry.js
	description: stores the commands etc. descriptions
	version: 1.0.0
	date-modified: 2026-1-6
	date-created: 2026-1-5
*/

// import { renameCommand } from "commands/rename.js";
// import { extractCommand } from "commands/extract.js";
import { flags } from "../shared/flags.js";
import { deepFreeze } from "../utils/immu.js";
import { initCommand } from "./commands/init.js";

/**
 * @typedef {Object} Command
 * @property {string} description
 * @property {Array} args
 * @property {Object} flags
 * @property {Function} run
 */

export const registry = deepFreeze({
	init: {
		description: "Initialize a new project",
		args: [],
		flags: {
			dryRun: flags.dryRun,
			backup: flags.backup,
			directory: flags.directory,
		},
		run: initCommand,
	},
	// rename: {
	// 	description: "Rename a translation key everywhere",
	// 	args: [args.fromIdentifier, args.toIdentifier],
	// 	flags: {
	// 		dryRun: flags.dryRun,
	// 		backup: flags.backup,
	// 		directory: flags.directory,
	// 	},
	// 	run: rename,
	// },
	// extract: {
	// 	description: "Extract missing translation keys from source files",
	// 	args: [],
	// 	flags: {
	// 		dryRun: flags.dryRun,
	// 		backup: flags.backup,
	// 		lang: flags.lang,
	// 	},
	// 	run: extractCommand,
	// },
});

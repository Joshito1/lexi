/*
	flags.js
	description: stores the flag descriptions
	version: 1.0.0
	date-modified: 2026-1-5
	date-created: 2026-1-5
*/

export const flags = Object.freeze({
	dryRun: Object.freeze({
		description: "Preview changes without writing files",
		aliases: ["dry-run", "d"],
	}),
	backup: Object.freeze({
		description: "Create backup files before modifying",
		aliases: ["b"],
	}),
	// lang: Object.freeze({
	// 	description: "Limit operation to a specific language",
	// 	takesValue: true,
	// 	aliases: ["l"],
	// }),
});

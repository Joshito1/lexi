/*
	registry.js
	description: stores DEBUG flags for each module.
	version 1.0.0
	date-modified: 2026-1-30
	date-created: 2026-1-30
*/

export const registry_debug = Object.freeze({
	path_mode: Object.freeze({
		flags: {
			full: flags.full,
			short: flags.short,
			relative: flags.relative,
		},
		run: async () => {
			const { flags } = await import("../flags.js");
			const { full, short, relative } = flags.path_mode;
			const { file } = await import("../logger.js");
			const { fileURLToPath } = await import("node:url");
			const { APP_META } = await import("../meta.js");

			const path_mode = {
				full,
				short,
				relative,
			};

			return {
				file: fileURLToPath(file),
				line: match[2],
				col: match[3],
			};
		},
	}),
});

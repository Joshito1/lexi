/*
	normalize.js
	description: normalization of flags
	version: 1.0.0
	date-modified: 2026-1-6
	date-created: 2026-1-6
*/

export function normalizeFlags(rawFlags, allowedFlags) {
	const normalized = {};

	for (const [rawName, value] of Object.entries(rawFlags)) {
		let matched = false;

		for (const [canonical, def] of Object.entries(allowedFlags)) {
			if (rawName === canonical || def.aliases?.includes(rawName)) {
				normalized[canonical] = value;
				matched = true;
				break;
			}
		}

		if (!matched) {
			// keep unknown flags for validator to catch
			normalized[rawName] = value;
		}
	}

	return normalized;
}

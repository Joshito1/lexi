/*
	validate.js
	description: validation
	version: 1.0.0
	date-modified: 2026-1-6
	date-created: 2026-1-6
*/

import { ValidationError } from "../utils/errors/cli/errors.js";
import { normalizeFlags } from "./normalize.js";

/**
 * Validate parsed command against the registry.
 * Throws structured errors if invalid.
 */

export function validateCommand(parsed, registry) {
	const def = registry[parsed.command];
	if (!def) {
		throw new ValidationError({
			code: "UNKNOWN_COMMAND",
			command: parsed.command,
		});
	}

	// normalize flags FIRST
	parsed.flags = normalizeFlags(parsed.flags, def.flags || {});

	// ---- positional args ----
	const definedArgs = def.args || [];
	const requiredArgs = definedArgs.filter((a) => a.required !== false);

	if (parsed.positionals.length < requiredArgs.length) {
		throw new ValidationError({
			code: "MISSING_ARGUMENTS",
			command: parsed.command,
			expected: requiredArgs.map((a) => a.name),
			provided: parsed.positionals,
		});
	}

	// ---- flags ----
	const allowedFlags = def.flags || {};
	for (const key in parsed.flags) {
		if (!(key in allowedFlags)) {
			throw new ValidationError({
				code: "INVALID_FLAG",
				command: parsed.command,
				flag: key,
			});
		}
	}

	// ---- Flags that require values ----
	for (const [name, flag] of Object.entries(allowedFlags)) {
		if (
			flag.takesValue &&
			name in parsed.flags &&
			(parsed.flags[name] === true || parsed.flags[name] === undefined)
		) {
			throw new ValidationError({
				code: "FLAG_VALUE_REQUIRED",
				command: parsed.command,
				flag: name,
			});
		}
	}
}

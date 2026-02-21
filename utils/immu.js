/*
	immu.js
	description: Immutable utilities for Lexi
	version: 1.0.0
	date-modified: 2026-1-30
	date: 2026-1-30
*/

export function deepFreeze(obj) {
	Object.freeze(obj);
	for (const value of Object.values(obj)) {
		if (
			typeof value === "object" &&
			value !== null &&
			!Object.isFrozen(value)
		) {
			deepFreeze(value);
		}
	}

	return obj;
}

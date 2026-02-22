/*
	errors.js
	description: simple error driver
	version: 1.0.0
	date-modified: 2026-1-28
	date-created: 2026-1-6
*/

export class ValidationError extends Error {
	constructor(info) {
		super("Validation error");
		this.name = "ValidationError";
		this.info = info;
	}
}

export function handleError(err) {
	if (err.name === "ValidationError") {
		console.error(`[${err.info.code}]:`, err.info);
	} else {
		console.error(err);
	}
}

/*
	logger.js
    description: Global logger, wrapped around console.log.
	version: 1.0.0
	date-modified: 2026-1-27
	date-created: 2026-1-10
*/

import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { APP_META } from "../../../meta.js";

// Check if the DEBUG environment variable is set to "1"
const DEBUG = process.env.LEXI_DEBUG === "1";

const PATH_MODE = (() => {
	/*
		PATH_MODE=long|relative|short
		short: filename only
		long: absolute path
		relative: relative path to project root
	*/
	const mode = process.env.PATH_MODE;
	if (mode === "long" || mode === "relative") return mode;
	return "short"; // Default
})();

const CWD = process.cwd();

function formatCallerPath(file, line, col) {
	switch (PATH_MODE) {
		case "long":
			return `${file}:${line}:${col}`;
		case "relative":
			return `${path.relative(CWD, file)}:${line}:${col}`;
		default:
			return `${path.basename(file)}:${line}:${col}`;
	}
}

// Check if the output is being piped to a terminal (TTY) or redirected to a file/console that supports colors.
// const IS_TTY = typeof process !== "undefined" && process.stdout?.isTTY;
const IS_TTY = process?.stdout?.isTTY;

/**
 * Patches the global console object to add prefixes, colors, and caller information.
 * @param {Object} options - Optional configuration object.
 * @param {string} [options.app=APP_META.name] - The application name used in log prefixes.
 */
export function patchConsole({ app = APP_META.name } = {}) {
	// Check if console is available
	if (typeof console === "undefined") return;
	// Ensure the console has not been patched before
	if (console.__lexiPatched) return console;
	console.__lexiPatched = true;

	// Create a copy of the original console object
	const raw = { ...console };

	// Define color codes for different log levels
	const levels = {
		log: { color: "\x1b[37m" }, // White
		info: { color: "\x1b[36m" }, // Cyan
		warn: { color: "\x1b[33m" }, // Yellow
		error: { color: "\x1b[31m" }, // Red
		debug: { color: "\x1b[35m" }, // Green
	};

	// Function to create a prefix for log messages
	const prefixFor = (level) => {
		/* What are prefixes? Prefixes are eg. [Lexi : LOG] */
		return `[${app} : ${level.toUpperCase()}]`;
	};

	// Iterate over each log level and override the original method
	Object.keys(levels).forEach((level) => {
		const fn = raw[level] ?? raw.log; // Use original method if not available
		const { color } = levels[level];

		console[level] = (...args) => {
			// Log entry with optional prefix and caller info
			let prefix = prefixFor(level);

			if (DEBUG) {
				const caller = getCallerInfo();
				if (caller) {
					prefix += ` ${formatCallerPath(caller.file, caller.line, caller.col)}`;
				}
			}

			if (IS_TTY && color) {
				// Call the original method with the colorized prefix and arguments
				fn(`${color}${prefix}\x1b[0m`, ...args);
			} else {
				// Call the original method with formatted message
				fn(prefix, ...args);
			}
		};
	});

	/**
	 * Raw logging function, bypasses any custom formatting.
	 * @param {...*} args - Arguments to log.
	 */
	console.raw = raw.log.bind(raw);

	return console;
}

/**
 * Retrieves caller information.
 * @returns {string} - A string containing the file path, line number, and column number of the caller, or an empty string if not available.
 */
function getCallerInfo() {
	const stack = new Error().stack?.split("\n");
	const line = stack?.[3];
	if (!line) return null;

	const match = line.match(/\(?([^\s()]+):(\d+):(\d+)\)?$/);
	if (!match) return null;

	let file = match[1];

	if (file.startsWith("file://")) {
		file = fileURLToPath(file);
	}

	return {
		file,
		line: match[2],
		col: match[3],
	};
}

/*
	ToDo & Ideas:
	Implement Structured Logging..?
	How to implement a Default flag for persistence? COMPLETED
	Won't this Logger interfere with external projects? NO
	Create Tests.
		Test if colors and prefixes are working correctly. COMPLETED
*/

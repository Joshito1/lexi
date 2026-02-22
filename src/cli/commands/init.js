import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { writeJSON } from "./utils.js";

/**
 * Interactive command to create a starter .i18ntoolrc.json config file.
 * Prompts user for basic config values, then writes JSON file.
 * Respects an optional custom config path.
 */
export async function initCommand(options = {}) {
	const configPath = options.configPath
		? path.resolve(options.configPath)
		: path.resolve(process.cwd(), ".i18ntoolrc.json");

	if (fs.existsSync(configPath)) {
		info(`Config file already exists at ${configPath}. Aborting init.`);
		return;
	}

	// Create readline interface for input/output
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	// Helper to ask a question with a default value
	function question(query, defaultVal) {
		return new Promise((resolve) => {
			rl.question(`${query} (${defaultVal}): `, (answer) => {
				resolve(answer.trim() || defaultVal);
			});
		});
	}

	try {
		const langDir = await question("Language files directory", "i18n/locales");
		const sourcePathsInput = await question(
			"Source directories (comma-separated)",
			"src,public",
		);
		const extensionsInput = await question(
			"File extensions to scan (comma-separated)",
			".html,.js",
		);

		rl.close();

		const sourcePaths = sourcePathsInput
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);
		const extensions = extensionsInput
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);

		// Starter default config
		const config = {
			langDir,
			sourcePaths,
			extensions,
			keyPattern: "data-i18n|t\\(['\"](.*?)['\"]\\)", // default regex pattern
		};

		writeJSON(configPath, config);
		console.info(`Created starter config at ${configPath}`);
	} catch (err) {
		rl.close();
		console.error(`Error during init: ${err.message}`);
	}
}

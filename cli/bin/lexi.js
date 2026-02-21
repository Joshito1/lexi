#!/usr/bin/env node

/*
	lexi.js
	description: Entry point
	version: 2.0.0
	date-modified: 2026-1-6
	date-created: 2025-12-27
*/

import { APP_META } from "../../meta.js";
import { dispatch } from "../../shared/dispatch.js";
import { parseArgs } from "../../shared/parse.js";
import { validateCommand } from "../../shared/validate.js";
import { handleError } from "../../utils/errors/cli/errors.js";
import { patchConsole } from "../../utils/errors/cli/logger.js";
import { printHelp } from "../../utils/help.js";
import { registry } from "../registry.js";

async function run() {
	patchConsole();
	const argv = process.argv.slice(2);
	const parsed = parseArgs(argv); // Parse raw args

	// Version
	if (
		parsed.flags?.version ||
		parsed.flags?.v ||
		parsed.command === "version"
	) {
		console.info(`lexi ${APP_META.version}`);
		return;
	}

	// Help handling
	// No command or explicit "help" => global help --- Global Help
	if (!parsed.command || parsed.command === "help") {
		printHelp(registry);
		return;
	}

	// --help with a command => command-specific help --- Command Help
	if (parsed.flags?.help) {
		printHelp(registry, parsed.command);
		return;
	}

	// Validate against registry
	validateCommand(parsed, registry);

	// Dispatch
	await dispatch(parsed, registry);
}

// Top-level error catch
run().catch((err) => handleError(err));

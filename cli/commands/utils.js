import fs from "node:fs";
import path from "node:path";

/**
 * Safely read a JSON file
 */
export function readJSON(filePath) {
	const content = fs.readFileSync(filePath, "utf8").trim();
	if (!content) {
		console.warn(`Warning: ${filePath} is empty. Initializing with {}`);
		return {};
	}
	try {
		return JSON.parse(content);
	} catch (err) {
		console.error(`Error parsing ${filePath}: ${err.message}`);
		return {};
	}
}

/**
 * Write JSON with pretty formatting
 */
export function writeJSON(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

/**
 * Create a backup of a file if it doesn't already exist
 */
export function createBackup(filePath) {
	const backupPath = `${filePath}.bak`;
	if (!fs.existsSync(backupPath)) {
		fs.copyFileSync(filePath, backupPath);
		console.log(`Created backup: ${backupPath}`);
	}
}

/**
 * Recursively scan files and run callback on matches
 */
export function scanFiles(dir, extensions, callback, pattern, depth = 0) {
	if (depth > 20) return; // safety liimit
	const regex = new RegExp(pattern, "g");
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		// Skip ignored directories anywhere in path
		const ignoredDirs = ["node_modules", ".git", "dist", "build"];
		if (ignoredDirs.some((d) => fullPath.includes(d))) continue;

		if (entry.isDirectory()) {
			scanFiles(fullPath, extensions, callback, pattern, depth + 1);
		} else if (extensions.some((ext) => entry.name.endsWith(ext))) {
			const content = fs.readFileSync(fullPath, "utf8");
			let match;
			while ((match = regex.exec(content)) !== null) {
				if (match.index === regex.lastIndex) regex.lastIndex++; // prevent infinite loop
				const key = match[1] || match[0];
				callback(key, fullPath);
			}
		}
	}
}

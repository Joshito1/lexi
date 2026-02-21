// meta.js

import pkg from "./package.json" with { type: "json" };

export const APP_META = {
	name: pkg.name,
	version: pkg.version,
	description: pkg.description,
};

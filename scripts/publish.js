const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = path.resolve(__dirname, '..');

function run(command) {
	console.log(`> ${command}`);
	execSync(command, { stdio: 'inherit', cwd });
}

function hasStagedChanges() {
	try {
		execSync('git diff --cached --quiet', { cwd });
		return false;
	} catch {
		return true;
	}
}

try {
	// Bump version
	run('npm version patch --no-git-tag-version');

	// Stage all current changes
	run('git add -A');

	// Commit version bump
	const pkgAfter = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
	if (hasStagedChanges()) {
		run(`git commit -m "V${pkgAfter.version}"`);
	}

	// Publish
	run('vsce publish --no-git-tag-version');
} catch (error) {
	process.exit(1);
}

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const electronBackboneRoot = path.join(__dirname, '..');
const angularRoot = path.join(__dirname,'..' ,'app', 'ui');


try {

    require.resolve('electron', { paths: [electronBackboneRoot] });
    console.log('The Desktop app is ready.\n');
} catch {

    console.log('Processing the Desktop app.\n');
    execSync("npm install", { cwd: electronBackboneRoot, stdio: "inherit", shell: true });
    console.log('The Desktop app is ready.\n');
}

try {

    require.resolve('@angular/core', { paths: [angularRoot] });
    console.log('UI is ready.\n');
} catch (err) {

    console.log('Processing the UI.\n');
    execSync("npm install", { cwd: angularRoot, stdio: "inherit", shell: true });
    console.log('UI is ready.\n');
}

console.log('Removing outdated builds.\n');
fs.rmSync(path.join(angularRoot, "dist"), { recursive: true, force: true });
fs.rmSync(path.join(electronBackboneRoot, "output"), { recursive: true, force: true });

console.log("Building UI.\n")
execSync("npx ng build --base-href ./", { cwd: angularRoot, stdio: "inherit", shell: true });

console.log("Building the desktop app.");
execSync("npx tsc", { cwd: electronBackboneRoot, stdio: "inherit", shell: true });

console.log('Preparing the UI');
execSync("cp -r ./app/ui/dist/ui ./output/app", { cwd: electronBackboneRoot, stdio: "inherit", shell: true });

console.log('Starting the app');
execSync("npx electron output/app/electron/index.js", { cwd: electronBackboneRoot, stdio: "inherit", shell: true });

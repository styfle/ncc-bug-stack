const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const ncc = require('@zeit/ncc');

async function main() {
	const input = './index.js';
	const outDir = './dist';
	const opts = { sourceMap: true, sourceMapRegister: true };
	const { code, assets } = await ncc(input, opts);
	await writeFile(path.join(outDir, input), code);
	for (var [assetName, assetCode] of Object.entries(assets)) {
		await writeFile(path.join(outDir, assetName), assetCode);
	}
	return 'success';
}

main().then(console.log).catch(console.error);

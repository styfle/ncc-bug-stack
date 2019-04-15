const { join } = require('path');
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const ncc = require('@zeit/ncc');

async function main() {
	const input = './index.ts';
	const outDir = './dist';
	const opts = { sourceMap: true, sourceMapRegister: true };
	const { code, map, assets } = await ncc(input, opts);
	await writeFile(join(outDir, input.replace('.ts', '.js')), code);
	await writeFile(join(outDir, `${input.replace('.ts', '.js')}.map`), map);
	for (var [assetName, assetCode] of Object.entries(assets)) {
		await writeFile(join(outDir, assetName), assetCode.source.toString('utf8'));
	}
	return 'success';
}

main().then(console.log).catch(console.error);

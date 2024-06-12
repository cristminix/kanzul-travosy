import fs from "node:fs";
import path from "node:path";
import { writeFileSync } from "../global/fn/writeFileSync.js";

const generateGaleryList = () => {
	const baseDir = `${process.cwd()}/public`;
	const imagesDir = "assets/images/galery/croped";
	const galeryPath = `${baseDir}/${imagesDir}`;

	const fileList = fs.readdirSync(galeryPath);
	const outputList = [];
	for (const file of fileList) {
		const name = file.replace(/\..*$/, "");
		const item = {
			name,
			description: `Description of item ${name}`,
			image: `/${imagesDir}/${file}`,
		};
		outputList.push(item);
	}
	return outputList;
};

const main = async () => {
	const list = generateGaleryList();
	const jsonData = { list };
	const jsonPath = `${process.cwd()}/src/data/galery.json`;
	console.log(`WRITE:${jsonPath}`);
	await writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
	// console.log(jsonData);

	process.exit(0);
};

main();

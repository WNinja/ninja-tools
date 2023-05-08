import * as fs from 'fs';
import * as vscode from 'vscode';
import { DropHeroString } from "./drop_string";
import { logReadable } from "./modules/log";

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "ninja-tools" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand("ninja-tools.log_readable", (uri) => logReadable(context, uri)));

	let cmdDropVPCf = vscode.commands.registerCommand("ninja-tools.hero_drop", async () => {
		// 生成vtex和vpcf
		let sTgaPath = "D:/Github/ProjectDttD/content/dota_td/materials/items/";
		let sVTEXPath = "D:/Github/ProjectDttD/content/dota_td/materials/";
		let sVPCFPath = "D:/Github/ProjectDttD/content/dota_td/particles/generic_gameplay/";
		let fTGAs = fs.readdirSync(sTgaPath);
		fTGAs.forEach(fileName => {
			if (fileName.indexOf("npc_dota_hero_") !== -1) {
				let sHeroName = fileName.substr(14, fileName.length - 14 - 4);
				let sShortFileName = fileName.substr(0, fileName.length - 4);
				let sVTEXFileName = sVTEXPath + sShortFileName + ".vtex";
				let sVPCFFileName = `${sVPCFPath}dropped_item_${sHeroName}.vpcf`;
				console.log(sVPCFFileName);
				let oHeroString = new DropHeroString(sHeroName);
				if (!fs.existsSync(sVTEXFileName)) {
					fs.writeFileSync(sVTEXFileName, oHeroString.strDropVtex);
				}
				if (!fs.existsSync(sVPCFFileName)) {
					fs.writeFileSync(sVPCFFileName, oHeroString.strDropVPCF);
				}
			}
		});
	});

	context.subscriptions.push(cmdDropVPCf);
}

// this method is called when your extension is deactivated
export function deactivate() { }

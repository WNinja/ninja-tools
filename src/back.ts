// let CmdReadAllVPCF = vscode.commands.registerCommand("dota2tools.read_vpcf", async () => {
// 	let _ReadDir = (dir: string) => {
// 		try {
// 			let fFiles = fs.readdirSync(dir);
// 			fFiles.forEach(fileName => {
// 				let sFileOrDir = dir + fileName;
// 				let st = fs.statSync(sFileOrDir);
// 				if (st.isDirectory()) {
// 					_ReadDir(sFileOrDir + "/");
// 				} else {
// 					if (sFileOrDir.indexOf(".lua") != -1) {
// 						luaFiles.push(sFileOrDir);
// 					}
// 				}
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	let sAbilityPath = (GameDir + "/scripts/vscripts/abilities/").replace(/\\/g, "/");
// 	var luaFiles: any[] = [];
// 	_ReadDir(sAbilityPath);

// 	let reg = /"particles.+\.vpcf"/g;
// 	let reg2 = /.+=class\(\{\}\)/g;
// 	let reg3 = /:Precache\(/g;
// 	let objFile2Vpcf: any = {};
// 	let objFile2Precache: any = {};
// 	luaFiles.forEach(sLuaFilePath => {
// 		let sFile = fs.readFileSync(sLuaFilePath, "utf-8");
// 		sFile.replace(/\r\n/g, "\n");
// 		let rows: string[] = sFile.split("\n");
// 		let sAbilityName: string = "";
// 		let iAbilityNameIndex = -1;
// 		for (let index = 0; index < rows.length; index++) {
// 			let rowText = rows[index].replace(/\s/g, '');
// 			let matched = rowText.match(reg);
// 			if (matched) {
// 				if (!objFile2Vpcf[sLuaFilePath]) {
// 					objFile2Vpcf[sLuaFilePath] = [];
// 				}
// 				matched.forEach(sMatched => {
// 					if (objFile2Vpcf[sLuaFilePath].indexOf(sMatched) == -1) {
// 						objFile2Vpcf[sLuaFilePath].push(sMatched);
// 					}
// 				});
// 			}
// 			if (sAbilityName == "") {
// 				let matched2 = rowText.match(reg2);
// 				if (matched2) {
// 					iAbilityNameIndex = index;
// 					matched2.forEach(sMatched => {
// 						if (sMatched.indexOf("modifier_") == -1) {
// 							sAbilityName = sMatched.replace("=class({})", "");
// 						}
// 					});
// 				}
// 			}
// 			let matched3 = rowText.match(reg3);
// 			if (matched3) {
// 				console.log("already has precache", sLuaFilePath);
// 			}
// 		}
// 		if (sAbilityName != "") {
// 			let str = "function " + sAbilityName + ":Precache(context)\n\tif AssetModifiers == nil or AssetModifiers.PrecacheParticleWithAsset == nil then\n\t\treturn\n\tend\n";
// 			let vpcfs: any[] = objFile2Vpcf[sLuaFilePath];
// 			if (vpcfs) {
// 				vpcfs.forEach(sVPCF => {
// 					str += "\tAssetModifiers:PrecacheParticleWithAsset(" + sVPCF + ", context)\n";
// 				});
// 				str += "end";
// 				rows.splice(iAbilityNameIndex + 2, 0, str);
// 				let sNewFileText = "";
// 				rows.forEach(st => {
// 					sNewFileText += st + "\n";
// 				});
// 				fs.writeFileSync(sLuaFilePath, sNewFileText);
// 			}
// 		}
// 	});
// });
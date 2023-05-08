import { readFileSync } from "fs";
import { ExtensionContext, Uri, ViewColumn, window } from "vscode";
import path = require("path");

export async function logReadable(context: ExtensionContext, uri: Uri) {
	let filePath = path.normalize(uri.fsPath);
	let sFileCotent = readFileSync(filePath, "utf-8");
	let aMatch = sFileCotent.match(/\d+\|172.17.0.10\|(.+\n)stack traceback:\n(\t.+\n)+/g);
	if (aMatch) {
		let obj: Record<string, {
			count: number,
			content?: string[];
		}> = {};
		let reg = /\d+\|172.17.0.10\|/g;
		aMatch.forEach((sStr) => {
			let lines = sStr.split("\n");
			if (lines.length >= 2) {
				let key = lines[0].replace(reg, "");
				lines.splice(0, 1);
				if (obj[key] === undefined) {
					obj[key] = {
						count: 0,
					};
				}
				obj[key].count += 1;
				obj[key].content = lines;
			}
		});

		let sCotent = Object.entries(obj).reduce((str, [k, v]) => {
			str += `# ${k} <br>##次数：${v.count}<br>`;
			if (v.content) {
				str += v.content.join("<br>");
			}
			return str;
		}, "");

		const panel = window.createWebviewPanel("logReadable", "logReadable", ViewColumn.One);
		panel.webview.html = sCotent;
	}
}
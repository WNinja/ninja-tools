import path = require("path");
import * as fs from "fs";
import { PNG } from "pngjs";
import * as vscode from "vscode";

export async function PngProc(context: vscode.ExtensionContext, uri: vscode.Uri) {
	let filePath = path.normalize(uri.fsPath);

	fs.createReadStream(filePath).pipe(
		new PNG({
			colorType: 6,
			inputColorType: 6,
			inputHasAlpha: true,
		})
	).on("parsed", function (this, data) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				let idx = (this.width * y + x) << 2;
				if (data[idx + 3] == 0) {
					for (let i = 0; i < 3; i++) {
						data[idx + i] = 0;
					}
				}
			}
		}
		this.pack().pipe(fs.createWriteStream(filePath));
	});
}
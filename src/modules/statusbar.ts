import * as vscode from 'vscode';


export function initStatusBarItems(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration().get<{ text: string, command: string, tooltip: string, priority?: number; }[]>("ninja-tools.statusbar.items");
	if (config === undefined) return;
	for (let value of config) {
		let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, value.priority ?? -1);
		statusBarItem.text = value.text;
		statusBarItem.command = value.command;
		statusBarItem.tooltip = value.tooltip;
		context.subscriptions.push(statusBarItem);
		statusBarItem.show();
	}
}
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "miro" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('miro.start', async () => {
		// The code you place here will be executed every time your command is executed
		// Open an input box to ask the user to provide a board URL
		let input =  await vscode.window.showInputBox({ 'prompt': 'Provide board URL'}) || "URL invalid";

		// check if the URL provided is a valid URL
		if(!input.includes("https://miro.com/app/board/")){
			vscode.window.showErrorMessage("URL invalid");
			return;
		}

		//  Transform the board URL into a live-embed URL
		let boardUrl = input.replace("board", "live-embed");

		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			'miroBoard', // For internal usage
			'Miro Board', // Title of the panel displayed to user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in
			{
				enableScripts: true
			} // Webview options
		);
		// Set HTML content
		panel.webview.html = getMiroBoard(boardUrl);
	});

	context.subscriptions.push(disposable);
}

function getMiroBoard(boardUrl: string) {
	return `<iframe width="1024" height="780" src="${boardUrl}?embedAutoplay=true" frameBorder="0" scrolling="no" allowFullScreen></iframe>`;
}
// this method is called when your extension is deactivated
export function deactivate() {
}

// Test URL (public board): https://miro.com/app/board/o9J_lFh2iDc=/

# README

## About

This is the official Wails React-TS template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: <https://wails.io/docs/reference/project-config>

## Development

### Dependencies

Wails has a number of common dependencies that are required before installation:

- Go 1.18+
- NPM (Node 15+)

#### Go

Download Go from the Go Downloads Page.

Ensure that you follow the official Go installation instructions. You will also need to ensure that your PATH environment variable also includes the path to your ~/go/bin directory. Restart your terminal and do the following checks:

- Check Go is installed correctly: go version
- Check "~/go/bin" is in your PATH variable: echo $PATH | grep go/bin

#### NPM

Download NPM from the Node Downloads Page. It is best to use the latest release as that is what we generally test against.

- Run npm --version to verify.

#### MacOS dependencies

- Wails requires that the xcode command line tools are installed. This can be done by running xcode-select --install.

### Installation

Go 1.18+

- go install github.com/wailsapp/wails/v2/cmd/wails@latest

### Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on <http://localhost:34115>. Connect
to this in your browser, and you can call your Go code from devtools.

### Building

To build a redistributable, production mode package, use `wails build`.

## Running requirements

For now only MacOS is supported

When running dev or prod you'll be prompted for 3 paths:

- DBeaver (needs to be installed)
- boundary cli (needs to be installed)
- boundary address

## App installation

- Unzip and copy `boundary-wrapper.app` into Applications folder

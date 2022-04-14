# npm

You can try Doc² without installing it using npx.

From the terminal, run:

```bash
npx n8n
```

This command will download everything that is needed to start n8n. You can then access Doc² and start building workflows by opening [http://localhost:5678](http://localhost:5678).

If you want to install Doc² globally, use npm:

```bash
npm install Doc² -g
```

After the installation, start Doc² by running:

```bash
n8n
# or
n8n start
```

!!! note " Keep in mind"
    Windows users remember to change into the `.n8n` directory of your Home folder (`~/.n8n`) before running `n8n start`.


--8<-- "_snippets/self-hosting/installation/tunnel.md"

Start Doc² with `--tunnel` by running:

```bash
n8n start --tunnel
```

## Windows troubleshooting

If you are experiencing issues running Doc² with the typical flow of:

```powershell
npx n8n
```

### Requirements

Please ensure that you have the following requirements fulfilled:

- Install latest version of [NodeJS](https://nodejs.org/en/download/)
- Install [Python 2.7](https://www.python.org/downloads/release/python-2717/) (It is okay to have multiple versions installed on the machine)
- Windows SDK
- C++ Desktop Development Tools
- Windows Build Tools

### Install build tools

If you haven't satisfied the above, follow this procedure through your PowerShell (run with administrative privileges).
This command installs the build tools, windows SDK and the C++ development tools in one package.

```powershell
npm install --global --production windows-build-tools
```

### Configure npm to use Python version 2.7

```powershell
npm config set python python2.7
```

### Configure npm to use correct msvs version

```powershell
npm config set msvs_version 2017 --global
```

### mmmagic npm package when using MSbuild tools with Visual Studio

While installing this package, `node-gyp` is run and it might fail to install it with an error appearing in the ballpark of:

```
gyp ERR! stack Error: spawn C:\Program Files (x86)\Microsoft Visual Studio\2019\**Enterprise**\MSBuild\Current\Bin\MSBuild.exe ENOENT
```

It is seeking the `MSBuild.exe` in a directory that does not exist. If you are using Visual Studio Community or vice versa, you can change the path of MSBuild with command: 

```powershell
npm config set msbuild_path "C:\Program Files (x86)\Microsoft Visual Studio\2019\**Community**\MSBuild\Current\Bin\MSBuild.exe"
```

Attempt to install package again after running the command above.

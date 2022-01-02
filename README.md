# Digital Archiving Tools

A set of command line tools to assist with digital archiving.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g digital-archiving-tools
$ datools COMMAND
running command...
$ datools (--version)
digital-archiving-tools/0.0.0 darwin-x64 node-v14.17.3
$ datools --help [COMMAND]
USAGE
  $ datools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`datools help [COMMAND]`](#datools-help-command)
* [`datools plugins`](#datools-plugins)
* [`datools plugins:inspect PLUGIN...`](#datools-pluginsinspect-plugin)
* [`datools plugins:install PLUGIN...`](#datools-pluginsinstall-plugin)
* [`datools plugins:link PLUGIN`](#datools-pluginslink-plugin)
* [`datools plugins:uninstall PLUGIN...`](#datools-pluginsuninstall-plugin)
* [`datools plugins update`](#datools-plugins-update)

## `datools help [COMMAND]`

Display help for datools.

```
USAGE
  $ datools help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for datools.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `datools plugins`

List installed plugins.

```
USAGE
  $ datools plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ datools plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `datools plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ datools plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ datools plugins:inspect myplugin
```

## `datools plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ datools plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ datools plugins add

EXAMPLES
  $ datools plugins:install myplugin 

  $ datools plugins:install https://github.com/someuser/someplugin

  $ datools plugins:install someuser/someplugin
```

## `datools plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ datools plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ datools plugins:link myplugin
```

## `datools plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ datools plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ datools plugins unlink
  $ datools plugins remove
```

## `datools plugins update`

Update installed plugins.

```
USAGE
  $ datools plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->

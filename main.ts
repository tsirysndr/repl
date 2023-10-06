import { Input, green, cyan } from "./deps.ts";

import Docker from "./plugins/docker.ts";
import Git from "./plugins/git.ts";
import GithubCLI from "./plugins/github-cli.ts";
import Terraform from "./plugins/terraform.ts";
import Brew from "./plugins/brew.ts";
import Bun from "./plugins/bun.ts";
import Pkgx from "./plugins/pkgx.ts";
import Pulumi from "./plugins/pulumi.ts";
import Tilt from "./plugins/tilt.ts";
import Spin from "./plugins/spin.ts";
import Wasmer from "./plugins/wasmer.ts";
import Dagger from "./plugins/dagger.ts";
import Helm from "./plugins/helm.ts";
import Devbox from "./plugins/devbox.ts";
import Kubectl from "./plugins/kubectl.ts";
import Npm from "./plugins/npm.ts";
import Deno from "./plugins/deno.ts";
import Bazel from "./plugins/bazel.ts";
import Asdf from "./plugins/asdf.ts";
import Terragrunt from "./plugins/terragrunt.ts";
import Podman from "./plugins/podman.ts";
import Nix from "./plugins/nix.ts";
import HomeManager from "./plugins/home-manager.ts";
import { availableCommands, evaluateSystemCommand } from "./src/helpers.ts";

const plugins = [
  new Docker(),
  new Git(),
  new GithubCLI(),
  new Terraform(),
  new Brew(),
  new Bun(),
  new Pkgx(),
  new Pulumi(),
  new Tilt(),
  new Spin(),
  new Wasmer(),
  new Dagger(),
  new Helm(),
  new Devbox(),
  new Kubectl(),
  new Npm(),
  new Deno(),
  new Bazel(),
  new Asdf(),
  new Terragrunt(),
  new Podman(),
  new Nix(),
  new HomeManager(),
];

const history: string[] = [];
const useSuggestions = [
  ...(await availableCommands()),
  ...plugins.map((p) => `use ${p.name}`),
];

async function repl(
  message = "",
  suggestions = [
    "use",
    "help",
    "history",
    "list",
    "exit",
    ...history,
    ...useSuggestions,
  ],
  evaluate: (command: string) => Promise<void> = evaluateSystemCommand
) {
  const command = await Input.prompt({
    message,
    suggestions,
  });

  if (command === "exit") {
    if (message === "") {
      console.log("Bye!");
      return;
    }
    repl();
    return;
  }

  if (command === "list" && message === "") {
    console.log("Available plugins:");
    plugins.forEach((plugin) => console.log(green(plugin.name)));
    console.log(`type ${cyan("use <plugin>")} to use a plugin`);
    history.push("list");
    repl(message, suggestions, evaluate);
    return;
  }

  if (command === "help" && message === "") {
    console.log(`Common Commands:
    use         Use a plugin
    help        Show this message
    history     Show command history
    list        List available plugins
    exit        Exit the repl`);
    repl(message, suggestions, evaluate);
    return;
  }

  if (command.startsWith("use ")) {
    const pluginName = command.split(" ")[1];
    const selectedPlugin = plugins.find((p) => p.name === pluginName);
    if (selectedPlugin) {
      history.push(`use ${selectedPlugin.name}`);
      await selectedPlugin.install();
      repl(
        selectedPlugin.name,
        [
          ...Object.keys(selectedPlugin.commands),
          ...history,
          ...useSuggestions,
        ],
        (command: string) => selectedPlugin.evaluate(command)
      );
      return;
    } else {
      console.log(`plugin ${green(pluginName)} not found`);
    }
    repl(message, suggestions, evaluate);
    return;
  }

  if (command === "history") {
    console.log(history.join("\n"));
    repl(message, suggestions, evaluate);
    return;
  }

  if (command === "") {
    repl(message, suggestions, evaluate);
    return;
  }

  history.push(command);
  await evaluate(command);
  repl(message, [...suggestions, ...history], evaluate);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Repl v0.4.0 🚀 ✨");
  console.log("exit using ctrl+c, or exit, type help for more info");
  repl();
}

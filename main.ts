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
import Deno from "./plugins/deno.ts";
import Bazel from "./plugins/bazel.ts";

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
  new Deno(),
  new Bazel(),
];

const history: string[] = [];
const useSuggestions = plugins.map((p) => `use ${p.name}`);

async function repl(
  message = "",
  suggestions = ["use", "help", "list", "exit", ...history, ...useSuggestions],
  evaluate?: (command: string) => Promise<void>
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

  if (evaluate) {
    history.push(command);
    await evaluate(command);
    repl(message, [...suggestions, ...history], evaluate);
    return;
  }

  repl(message, suggestions, evaluate);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Repl v0.3.0 🚀 ✨");
  console.log("exit using ctrl+c, or exit, type help for more info");
  repl();
}

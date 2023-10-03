import { Input } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";
import { green, cyan } from "https://deno.land/std@0.203.0/fmt/colors.ts";

import Docker from "./docker.ts";
import Git from "./git.ts";
import GithubCLI from "./github-cli.ts";

const plugins = [new Docker(), new Git(), new GithubCLI()];

const history: string[] = [];

async function repl(
  message = "",
  suggestions = ["use", "help", "list", "exit", ...history],
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
      repl(
        selectedPlugin.name,
        [...Object.keys(selectedPlugin.commands), ...history],
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
  console.log("Repl v0.2.1 🚀 ✨");
  console.log("exit using ctrl+c, or exit, type help for more info");
  repl();
}
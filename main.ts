import { Input, green, cyan, magenta } from "./deps.ts";
import { plugins } from "./plugins/mod.ts";
import { availableCommands, evaluateSystemCommand } from "./src/helpers.ts";

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
  console.log(
    magenta(`                                        .
        .(((((((((((((((((((((((((((((          
        .((                        (((          
        .((      (####            .(((          
        .((    ****.#####          (((          
        .((      *****.####        (((          
        .((        ,**.#####.*    .(((          
        .((          ####.*****    (((          
        .((        ####.*****      (((          
        .((        .#.****        .(((          
        .((            *          .(((          
        .((                        (((          
        ./(((((((((((((((((((((((((((          .
                                        .`)
  );
  console.log("Repl v0.6.0 🚀 ✨");
  console.log("exit using ctrl+c, or exit, type help for more info");
  repl();
}

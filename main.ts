import {
  KeyCode,
  parse,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/keycode/mod.ts";
import { green, cyan, magenta } from "./deps.ts";
import { plugins } from "./plugins/mod.ts";
import {
  availableCommands,
  evaluateSystemCommand,
  spawn,
} from "./src/helpers.ts";
import Brew from "./plugins/brew.ts";

const history: string[] = [];
const useSuggestions = [
  ...(await availableCommands()),
  ...plugins.map((p) => `use ${p.name}`),
];

async function repl(
  message = "> ",
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
  const command = await readline(message, suggestions);
  if (command === "exit") {
    if (message === "> ") {
      console.log("Bye!");
      return;
    }
    repl();
    return;
  }

  if (command === "list" && message === "> ") {
    console.log("Available plugins:");
    plugins.forEach((plugin) => console.log(green(plugin.name)));
    console.log(`type ${cyan("use <plugin>")} to use a plugin`);
    history.push("list");
    repl(message, suggestions, evaluate);
    return;
  }

  if (command === "help" && message === "> ") {
    console.log(`Common Commands:
    use         Use a plugin
    help        Show this message
    history     Show command history
    list        List available plugins
    exit        Exit the repl`);
    repl(message, suggestions, evaluate);
    return;
  }

  if (command!.startsWith("use ")) {
    const pluginName = command!.split(" ")[1];
    const selectedPlugin = plugins.find((p) => p.name === pluginName);
    if (selectedPlugin) {
      history.push(`use ${selectedPlugin.name}`);
      await selectedPlugin.install();
      repl(
        `${selectedPlugin.name} > `,
        [
          ...Object.keys(selectedPlugin.commands),
          ...history,
          ...useSuggestions,
          "exit",
          "use",
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

  history.push(command!);
  await evaluate(command!);
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
  console.log("Repl v0.7.1 🚀 ✨");
  console.log("exit using ctrl+c, or exit, type help for more info");
  repl();
}

async function readline(message: string, suggestions: string[]) {
  Deno.stdout.writeSync(new TextEncoder().encode(message));
  let input: string[] = [];
  let cursor = 0;
  while (true) {
    const data = new Uint8Array(8);

    Deno.stdin.setRaw(true);
    const nread = await Deno.stdin.read(data);
    Deno.stdin.setRaw(false);

    if (nread === null) {
      break;
    }

    const keys: Array<KeyCode> = parse(data.subarray(0, nread));

    for (const key of keys) {
      if (key.ctrl && key.name === "c") {
        console.log("\nexit");
        Deno.exit();
      }
      if (key.name === "up") {
        continue;
      }
      if (key.name === "down") {
        continue;
      }
      if (key.name === "left") {
        if (cursor > 0) {
          cursor = cursor - 1;
        } else {
          continue;
        }
      }
      if (key.name === "right") {
        if (cursor < input.length) {
          cursor = cursor + 1;
        } else {
          continue;
        }
      }
      if (key.name === "return") {
        console.log();
        return input.join("");
      }
      if (key.sequence === "\x7f") {
        if (cursor > 0) {
          cursor = cursor - 1;
          input.splice(cursor, 1);
        }
        Deno.stdout.writeSync(new TextEncoder().encode("\x1b[2K\r"));
        Deno.stdout.writeSync(new TextEncoder().encode(message));
        Deno.stdout.writeSync(new TextEncoder().encode(`${input.join("")}`));
        if (cursor < input.length) {
          Deno.stdout.writeSync(
            new TextEncoder().encode(`\x1b[${input.length - cursor}D`)
          );
          continue;
        }
        Deno.stdout.writeSync(
          new TextEncoder().encode(`\x1b[${input.length - cursor - 3}C`)
        );
      }
      if (
        key.sequence?.match(/^[0-9a-zA-Z!@#$%^&*()_+=\[\]{};:'",<.>/?\\| -]+$/u)
      ) {
        cursor++;
        input.splice(cursor, 0, key.sequence);
        if (input.join("").split(" ").length > 1) {
          Deno.stdout.writeSync(new TextEncoder().encode(key.sequence));
          continue;
        }
        const selected = await fzf(suggestions, input.join(""));
        Deno.stdout.writeSync(new TextEncoder().encode(selected));
        if (selected) {
          Deno.stdout.writeSync(new TextEncoder().encode("\x1b[2K\r"));
          Deno.stdout.writeSync(new TextEncoder().encode(message));

          input = selected.split("");
          cursor = input.length;
          Deno.stdout.writeSync(new TextEncoder().encode(`${input.join("")}`));
          continue;
        }
      }

      Deno.stdout.writeSync(new TextEncoder().encode(key.sequence));
    }
  }
}

async function fzf(suggestions: string[], message: string) {
  await setupFzf();
  const command = new Deno.Command("sh", {
    args: [
      "-c",
      'echo "' + suggestions.join("\n") + '" | fzf' + " -q " + message,
    ],
    stdin: "inherit",
    stdout: "piped",
    stderr: "inherit",
  });
  const child = command.spawn();
  const { stdout } = await child.output();
  const decoder = new TextDecoder();
  const output = decoder.decode(stdout);
  const lines = output.split("\n");
  const selected = lines[lines.length - 2];
  return selected;
}

async function setupFzf() {
  await new Brew().install();
  await spawn("sh", ["-c", "type fzf > /dev/null || brew install fzf"]);
}

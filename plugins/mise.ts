import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Mise implements Plugin {
  name = "mise";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    const mise = (args: string[]) => [
      "-c",
      `eval "$(~/.local/bin/mise activate bash)" && ~/.local/bin/mise ${args.join(
        " "
      )}`,
    ];
    this.commands = {
      alias: (args: string[]) => spawn("bash", mise(["alias", ...args])),
      "bin-paths": (args: string[]) =>
        spawn("bash", mise(["bin-paths", ...args])),
      cache: (args: string[]) => spawn("bash", mise(["cache", ...args])),
      completion: (args: string[]) =>
        spawn("bash", mise(["completion", ...args])),
      current: (args: string[]) => spawn("bash", mise(["current", ...args])),
      direnv: (args: string[]) => spawn("bash", mise(["direnv", ...args])),
      doctor: (args: string[]) => spawn("bash", mise(["doctor", ...args])),
      env: (args: string[]) => spawn("bash", mise(["env", ...args])),
      "env-vars": (args: string[]) =>
        spawn("bash", mise(["env-vars", ...args])),
      exec: (args: string[]) => spawn("bash", mise(["exec", ...args])),
      implode: (args: string[]) => spawn("bash", mise(["implode", ...args])),
      install: (args: string[]) => spawn("bash", mise(["install", ...args])),
      latest: (args: string[]) => spawn("bash", mise(["latest", ...args])),
      link: (args: string[]) => spawn("bash", mise(["link", ...args])),
      ls: (args: string[]) => spawn("bash", mise(["ls", ...args])),
      "ls-remote": (args: string[]) =>
        spawn("bash", mise(["ls-remote", ...args])),
      outdated: (args: string[]) => spawn("bash", mise(["outdated", ...args])),
      plugins: (args: string[]) => spawn("bash", mise(["plugins", ...args])),
      prune: (args: string[]) => spawn("bash", mise(["prune", ...args])),
      reshim: (args: string[]) => spawn("bash", mise(["reshim", ...args])),
      "self-update": (args: string[]) =>
        spawn("bash", mise(["self-update", ...args])),
      settings: (args: string[]) => spawn("bash", mise(["settings", ...args])),
      sync: (args: string[]) => spawn("bash", mise(["sync", ...args])),
      trust: (args: string[]) => spawn("bash", mise(["trust", ...args])),
      uninstall: (args: string[]) =>
        spawn("bash", mise(["uninstall", ...args])),
      upgrade: (args: string[]) => spawn("bash", mise(["upgrade", ...args])),
      u: (args: string[]) => spawn("bash", mise(["use", ...args])),
      version: (args: string[]) => spawn("bash", mise(["version", ...args])),
      where: (args: string[]) => spawn("bash", mise(["where", ...args])),
      which: (args: string[]) => spawn("bash", mise(["which", ...args])),
      node: (args: string[]) => spawn("bash", mise(["node", ...args])),
      x: (args: string[]) => spawn("bash", mise(["exec", ...args])),
      help: () => {
        console.log(`
        Commands:
          alias        Manage aliases [aliases: a]
          bin-paths    List all the active runtime bin paths
          cache        Manage the mise cache
          completion   Generate shell completions
          current      Shows current active and installed runtime versions
          direnv       Output direnv function to use mise inside direnv
          doctor       Check mise installation for possible problems.
          env          Exports env vars to activate mise a single time [aliases: e]
          env-vars     Manage environment variables
          exec         Execute a command with tool(s) set [aliases: x]
          implode      Removes mise CLI and all related data
          install      Install a tool version [aliases: i]
          latest       Gets the latest available version for a plugin
          link         Symlinks a tool version into mise
          ls           List installed and/or currently selected tool versions [aliases: list]
          ls-remote    List runtime versions available for install
          outdated     [experimental] Shows outdated tool versions
          plugins      Manage plugins [aliases: p]
          prune        Delete unused versions of tools
          reshim       rebuilds the shim farm
          self-update  Updates mise itself
          settings     Manage settings
          sync         Add tool versions from external tools to mise
          trust        Marks a config file as trusted
          uninstall    Removes runtime versions
          upgrade      [experimental] Upgrades outdated tool versions
          u            Change the active version of a tool locally or globally. [aliases: u]
          version      Show mise version
          where        Display the installation path for a runtime
          which        Shows the path that a bin name points to
          node         Commands for the node plugin
          help         Print this message or the help of the given subcommand(s)`);
        return Promise.resolve();
      },
    };
  }

  async evaluate(command: string): Promise<void> {
    const [cmd, ...params] = command.split(" ");
    if (this.commands[cmd]) {
      await this.commands[cmd](params);
      return;
    }
    if (cmd === "") {
      return;
    }
    await evaluateSystemCommand(command);
  }

  async install(): Promise<void> {
    const HOME = Deno.env.get("HOME");
    const mise = `${HOME}/.local/bin`;
    Deno.env.set("PATH", `${Deno.env.get("PATH")}:${mise}`);
    Deno.env.set(
      "PATH",
      `${Deno.env.get("PATH")}:${HOME}/.local/share/mise/shims`
    );
    await spawn("sh", [
      "-c",
      "type ~/.local/bin/mise > /dev/null || curl https://mise.run | sh",
    ]);
  }
}

export default Mise;

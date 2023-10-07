import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Rtx implements Plugin {
  name = "rtx";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    const rtx = (args: string[]) => [
      "-c",
      `eval "$(rtx activate bash)" && rtx ${args.join(" ")}`,
    ];
    this.commands = {
      alias: (args: string[]) => spawn("bash", rtx(["alias", ...args])),
      "bin-paths": (args: string[]) =>
        spawn("bash", rtx(["bin-paths", ...args])),
      cache: (args: string[]) => spawn("bash", rtx(["cache", ...args])),
      completion: (args: string[]) =>
        spawn("bash", rtx(["completion", ...args])),
      current: (args: string[]) => spawn("bash", rtx(["current", ...args])),
      direnv: (args: string[]) => spawn("bash", rtx(["direnv", ...args])),
      doctor: (args: string[]) => spawn("bash", rtx(["doctor", ...args])),
      env: (args: string[]) => spawn("bash", rtx(["env", ...args])),
      "env-vars": (args: string[]) => spawn("bash", rtx(["env-vars", ...args])),
      exec: (args: string[]) => spawn("bash", rtx(["exec", ...args])),
      implode: (args: string[]) => spawn("bash", rtx(["implode", ...args])),
      install: (args: string[]) => spawn("bash", rtx(["install", ...args])),
      latest: (args: string[]) => spawn("bash", rtx(["latest", ...args])),
      link: (args: string[]) => spawn("bash", rtx(["link", ...args])),
      ls: (args: string[]) => spawn("bash", rtx(["ls", ...args])),
      "ls-remote": (args: string[]) =>
        spawn("bash", rtx(["ls-remote", ...args])),
      outdated: (args: string[]) => spawn("bash", rtx(["outdated", ...args])),
      plugins: (args: string[]) => spawn("bash", rtx(["plugins", ...args])),
      prune: (args: string[]) => spawn("bash", rtx(["prune", ...args])),
      reshim: (args: string[]) => spawn("bash", rtx(["reshim", ...args])),
      "self-update": (args: string[]) =>
        spawn("bash", rtx(["self-update", ...args])),
      settings: (args: string[]) => spawn("bash", rtx(["settings", ...args])),
      sync: (args: string[]) => spawn("bash", rtx(["sync", ...args])),
      trust: (args: string[]) => spawn("bash", rtx(["trust", ...args])),
      uninstall: (args: string[]) => spawn("bash", rtx(["uninstall", ...args])),
      upgrade: (args: string[]) => spawn("bash", rtx(["upgrade", ...args])),
      u: (args: string[]) => spawn("bash", rtx(["use", ...args])),
      version: (args: string[]) => spawn("bash", rtx(["version", ...args])),
      where: (args: string[]) => spawn("bash", rtx(["where", ...args])),
      which: (args: string[]) => spawn("bash", rtx(["which", ...args])),
      node: (args: string[]) => spawn("bash", rtx(["node", ...args])),
      x: (args: string[]) => spawn("bash", rtx(["exec", ...args])),
      help: () => {
        console.log(`
        Commands:
          alias        Manage aliases [aliases: a]
          bin-paths    List all the active runtime bin paths
          cache        Manage the rtx cache
          completion   Generate shell completions
          current      Shows current active and installed runtime versions
          direnv       Output direnv function to use rtx inside direnv
          doctor       Check rtx installation for possible problems.
          env          Exports env vars to activate rtx a single time [aliases: e]
          env-vars     Manage environment variables
          exec         Execute a command with tool(s) set [aliases: x]
          implode      Removes rtx CLI and all related data
          install      Install a tool version [aliases: i]
          latest       Gets the latest available version for a plugin
          link         Symlinks a tool version into rtx
          ls           List installed and/or currently selected tool versions [aliases: list]
          ls-remote    List runtime versions available for install
          outdated     [experimental] Shows outdated tool versions
          plugins      Manage plugins [aliases: p]
          prune        Delete unused versions of tools
          reshim       rebuilds the shim farm
          self-update  Updates rtx itself
          settings     Manage settings
          sync         Add tool versions from external tools to rtx
          trust        Marks a config file as trusted
          uninstall    Removes runtime versions
          upgrade      [experimental] Upgrades outdated tool versions
          u            Change the active version of a tool locally or globally. [aliases: u]
          version      Show rtx version
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
    const RTX = `${HOME}/.local/share/rtx/bin`;
    Deno.env.set("PATH", `${Deno.env.get("PATH")}:${RTX}`);
    Deno.env.set(
      "PATH",
      `${Deno.env.get("PATH")}:${HOME}/.local/share/rtx/shims`
    );
    await spawn("sh", [
      "-c",
      "type rtx > /dev/null || (type apt && sudo apt install libssl-dev -y)",
    ]);
    await spawn("sh", [
      "-c",
      "type rtx > /dev/null || curl https://rtx.pub/install.sh | sh",
    ]);
    await spawn("sh", ["-c", "mkdir -p ~/.local/share/rtx/shims"]);
  }
}

export default Rtx;

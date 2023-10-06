import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Nix from "./nix.ts";

class Flox implements Plugin {
  name = "flox";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      activate: (args: string[]) => spawn(this.name, ["activate", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      install: (args: string[]) => spawn(this.name, ["install", ...args]),
      uninstall: (args: string[]) => spawn(this.name, ["uninstall", ...args]),
      edit: (args: string[]) => spawn(this.name, ["edit", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      list: (args: string[]) => spawn(this.name, ["list", ...args]),
      nix: (args: string[]) => spawn(this.name, ["nix", ...args]),
      delete: (args: string[]) => spawn(this.name, ["delete", ...args]),
      push: (args: string[]) => spawn(this.name, ["push", ...args]),
      pull: (args: string[]) => spawn(this.name, ["pull", ...args]),
      containerize: (args: string[]) =>
        spawn(this.name, ["containerize", ...args]),
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      upgrade: (args: string[]) => spawn(this.name, ["upgrade", ...args]),
      import: (args: string[]) => spawn(this.name, ["import", ...args]),
      export: (args: string[]) => spawn(this.name, ["export", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      "wipe-history": (args: string[]) =>
        spawn(this.name, ["wipe-history", ...args]),
      subscribe: (args: string[]) => spawn(this.name, ["subscribe", ...args]),
      unsubscribe: (args: string[]) =>
        spawn(this.name, ["unsubscribe", ...args]),
      channels: (args: string[]) => spawn(this.name, ["channels", ...args]),
      history: (args: string[]) => spawn(this.name, ["history", ...args]),
      "print-dev-env": (args: string[]) =>
        spawn(this.name, ["print-dev-env", ...args]),
      shell: (args: string[]) => spawn(this.name, ["shell", ...args]),
      version: (args: string[]) => spawn(this.name, ["--version", ...args]),
      help: () => {
        console.log(`    Local Development Commands
        init           Create an environment in the current directory
        activate       Activate environment
        search         Search packages in subscribed channels
        install        Install a package into an environment
        uninstall      Uninstall installed packages from an environment
        edit           Edit declarative environment configuration
        run            Run app from current project
        list           List packages installed in an environment
        nix            Access to the nix CLI
        delete         Delete an environment
    
    Sharing Commands
        push           Send environment to flox hub
        pull           Pull environment from flox hub
        containerize   Containerize an environment
    
    Additional Commands. Use "flox COMMAND --help" for more info
        build, upgrade, import, export, config, wipe-history, subscribe, unsubscribe,
        channels, history, print-dev-env, shell, version`);
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
    await new Nix().install();
    await spawn("sh", [
      "-c",
      "type flox > /dev/null || echo 'extra-trusted-substituters = https://cache.floxdev.com' | sudo tee -a /etc/nix/nix.conf",
    ]);
    await spawn("sh", [
      "-c",
      "type flox > /dev/null || echo 'extra-trusted-public-keys = flox-store-public-0:8c/B+kjIaQ+BloCmNkRUKwaVPFWkriSAd0JJvuDu4F0=' | sudo tee -a /etc/nix/nix.conf",
    ]);
    await spawn("sh", [
      "-c",
      `type flox > /dev/null || nix profile install --impure \
      --experimental-features "nix-command flakes" \
      --accept-flake-config \
      'github:flox/floxpkgs#flox.fromCatalog'`,
    ]);
  }
}

export default Flox;

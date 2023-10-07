import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Nix from "./nix.ts";

class Devenv implements Plugin {
  name = "devenv";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      shell: (args: string[]) => spawn(this.name, ["shell", ...args]),
      container: (args: string[]) => spawn(this.name, ["container", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      up: (args: string[]) => spawn(this.name, ["up", ...args]),
      gc: (args: string[]) => spawn(this.name, ["gc", ...args]),
      ci: (args: string[]) => spawn(this.name, ["ci", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`    Commands:
        init                      Scaffold devenv.yaml, devenv.nix, and .envrc inside the current directory.
        init TARGET               Scaffold devenv.yaml, devenv.nix, and .envrc inside TARGET directory.
        search NAME               Search packages matching NAME in nixpkgs input.
        shell                     Activate the developer environment.
        shell CMD [args]          Run CMD with ARGS in the developer environment. Useful when scripting.
        container [options] NAME  Generate a container for NAME. See devenv container --help and http://devenv.sh/containers
        info                      Print information about the current developer environment.
        update                    Update devenv.lock from devenv.yaml inputs. See http://devenv.sh/inputs/#locking-and-updating-inputs
        up                        Starts processes in foreground. See http://devenv.sh/processes
        gc                        Removes old devenv generations. See http://devenv.sh/garbage-collection
        ci                        Builds your developer environment and make sure all checks pass.
        version                   Display devenv version`);
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
      'type devenv > /dev/null || echo "trusted-users = root $USER" | sudo tee -a /etc/nix/nix.conf',
    ]);
    await spawn("sh", [
      "-c",
      "type devenv > /dev/null || sudo pkill nix-daemon",
    ]);
    await spawn("sh", [
      "-c",
      `type cachix > /dev/null || nix profile install 'github:cachix/cachix'`,
    ]);
    await spawn("sh", ["-c", "type devenv > /dev/null || cachix use devenv"]);
    await spawn("sh", [
      "-c",
      `type devenv > /dev/null || nix profile install \
    --experimental-features "nix-command flakes" \
    --accept-flake-config \
    'github:cachix/devenv/latest'`,
    ]);
  }
}

export default Devenv;

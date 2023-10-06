import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Fastlane implements Plugin {
  name = "fastlane";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    const exec = ["exec", "fastlane"];
    this.commands = {
      android: (args: string[]) =>
        spawn("bundle", [...exec, "android", ...args]),
      ios: (args: string[]) => spawn("bundle", [...exec, "ios", ...args]),
      action: (args: string[]) => spawn("bundle", [...exec, "action", ...args]),
      actions: (args: string[]) =>
        spawn("bundle", [...exec, "actions", ...args]),
      add_plugin: (args: string[]) =>
        spawn("bundle", [...exec, "add_plugin", ...args]),
      docs: (args: string[]) => spawn("bundle", [...exec, "docs", ...args]),
      env: (args: string[]) => spawn("bundle", [...exec, "env", ...args]),
      init: (args: string[]) => spawn("bundle", [...exec, "init", ...args]),
      install_plugins: (args: string[]) =>
        spawn("bundle", [...exec, "install_plugins", ...args]),
      lanes: (args: string[]) => spawn("bundle", [...exec, "lanes", ...args]),
      list: (args: string[]) => spawn("bundle", [...exec, "list", ...args]),
      new_action: (args: string[]) =>
        spawn("bundle", [...exec, "new_action", ...args]),
      new_plugin: (args: string[]) =>
        spawn("bundle", [...exec, "new_plugin", ...args]),
      run: (args: string[]) => spawn("bundle", [...exec, "run", ...args]),
      search_plugins: (args: string[]) =>
        spawn("bundle", [...exec, "search_plugins", ...args]),
      socket_server: (args: string[]) =>
        spawn("bundle", [...exec, "socket_server", ...args]),
      trigger: (args: string[]) =>
        spawn("bundle", [...exec, "trigger", ...args]),
      update_fastlane: (args: string[]) =>
        spawn("bundle", [...exec, "update_fastlane", ...args]),
      update_plugins: (args: string[]) =>
        spawn("bundle", [...exec, "update_plugins", ...args]),
      version: (args: string[]) =>
        spawn("bundle", [...exec, "--version", ...args]),
      help: () => {
        console.log(`    Commands: (* default) 
        android                Run a fastlane android lane
        ios                    Run a fastlane ios lane
        action                 Shows more information for a specific command
        actions                Lists all available fastlane actions
        add_plugin             Add a new plugin to your fastlane setup
        docs                   Generate a markdown based documentation based on the Fastfile
        env                    Print your fastlane environment, use this when you submit an issue on GitHub
        help                   Display global or [command] help documentation
        init                   Helps you with your initial fastlane setup
        install_plugins        Install all plugins for this project
        lanes                  Lists all available lanes and shows their description
        list                   Lists all available lanes without description
        new_action             Create a new custom action for fastlane.
        new_plugin             Create a new plugin that can be used with fastlane
        run                    Run a fastlane one-off action without a full lane
        search_plugins         Search for plugins, search query is optional
        socket_server          Starts local socket server and enables only a single local connection
        trigger              * Run a specific lane. Pass the lane name and optionally the platform first.
        update_fastlane        Update fastlane to the latest release
        update_plugins         Update all plugin dependencies
        help       Show this message
        version    Show fastlane version`);
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
    await new Brew().install();
    await spawn("sh", [
      "-c",
      "type ruby > /dev/null || brew install ruby libffi",
    ]);
    await spawn("sh", ["-c", "type bundle > /dev/null || gem install bundler"]);
    await spawn("sh", [
      "-c",
      "type pkg-config > /dev/null || brew install pkg-config",
    ]);
    await spawn("sh", ["-c", "type gcc-11 > /dev/null || brew install gcc@11"]);
    await spawn("sh", [
      "-c",
      "type gcc-11 > /dev/null || brew link gcc@11 --overwrite",
    ]);
    await spawn("sh", ["-c", "[ ! -d vendor ] && bundle install"]);
  }
}

export default Fastlane;

import { spawn } from "./helpers.ts";
import Plugin from "./plugin.ts";

class Docker implements Plugin {
  name = "docker";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      ps: (args: string[]) => spawn(this.name, ["ps", ...args]),
      container: (args: string[]) => spawn(this.name, ["container", ...args]),
      images: (args: string[]) => spawn(this.name, ["images", ...args]),
      exec: (args: string[]) => spawn(this.name, ["exec", ...args]),
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      pull: (args: string[]) => spawn(this.name, ["pull", ...args]),
      push: (args: string[]) => spawn(this.name, ["push", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      help: () => {
        console.log(`Common Commands:
        run         Create and run a new container from an image
        exec        Execute a command in a running container
        ps          List containers
        build       Build an image from a Dockerfile
        pull        Download an image from a registry
        push        Upload an image to a registry
        images      List images
        login       Log in to a registry
        logout      Log out from a registry
        search      Search Docker Hub for images
        version     Show the Docker version information
        info        Display system-wide information`);
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
    console.log("Command not found");
  }
}

export default Docker;

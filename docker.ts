import Plugin from "./plugin.ts";

class Docker implements Plugin {
  name = "docker";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      run: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["run", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      ps: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["ps", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      container: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["container", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      images: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["images", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      exec: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["exec", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      build: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["build", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      pull: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["pull", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      push: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["push", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      search: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["search", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      version: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["version", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
      info: async (args: string[]) => {
        const command = new Deno.Command(this.name, {
          args: ["info", ...args],
          stdout: "inherit",
          stderr: "inherit",
        });
        const child = command.spawn();
        await child.status;
      },
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

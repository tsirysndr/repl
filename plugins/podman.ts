import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Podman implements Plugin {
  name = "podman";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      attach: (args: string[]) => spawn(this.name, ["attach", ...args]),
      build: (args: string[]) => spawn(this.name, ["build", ...args]),
      commit: (args: string[]) => spawn(this.name, ["commit", ...args]),
      container: (args: string[]) => spawn(this.name, ["container", ...args]),
      cp: (args: string[]) => spawn(this.name, ["cp", ...args]),
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      diff: (args: string[]) => spawn(this.name, ["diff", ...args]),
      events: (args: string[]) => spawn(this.name, ["events", ...args]),
      exec: (args: string[]) => spawn(this.name, ["exec", ...args]),
      export: (args: string[]) => spawn(this.name, ["export", ...args]),
      generate: (args: string[]) => spawn(this.name, ["generate", ...args]),
      healthcheck: (args: string[]) =>
        spawn(this.name, ["healthcheck", ...args]),
      history: (args: string[]) => spawn(this.name, ["history", ...args]),
      image: (args: string[]) => spawn(this.name, ["image", ...args]),
      images: (args: string[]) => spawn(this.name, ["images", ...args]),
      import: (args: string[]) => spawn(this.name, ["import", ...args]),
      info: (args: string[]) => spawn(this.name, ["info", ...args]),
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      inspect: (args: string[]) => spawn(this.name, ["inspect", ...args]),
      kill: (args: string[]) => spawn(this.name, ["kill", ...args]),
      kube: (args: string[]) => spawn(this.name, ["kube", ...args]),
      load: (args: string[]) => spawn(this.name, ["load", ...args]),
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      logout: (args: string[]) => spawn(this.name, ["logout", ...args]),
      logs: (args: string[]) => spawn(this.name, ["logs", ...args]),
      machine: (args: string[]) => spawn(this.name, ["machine", ...args]),
      manifest: (args: string[]) => spawn(this.name, ["manifest", ...args]),
      network: (args: string[]) => spawn(this.name, ["network", ...args]),
      pause: (args: string[]) => spawn(this.name, ["pause", ...args]),
      pod: (args: string[]) => spawn(this.name, ["pod", ...args]),
      port: (args: string[]) => spawn(this.name, ["port", ...args]),
      ps: (args: string[]) => spawn(this.name, ["ps", ...args]),
      pull: (args: string[]) => spawn(this.name, ["pull", ...args]),
      push: (args: string[]) => spawn(this.name, ["push", ...args]),
      rename: (args: string[]) => spawn(this.name, ["rename", ...args]),
      restart: (args: string[]) => spawn(this.name, ["restart", ...args]),
      rm: (args: string[]) => spawn(this.name, ["rm", ...args]),
      rmi: (args: string[]) => spawn(this.name, ["rmi", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      save: (args: string[]) => spawn(this.name, ["save", ...args]),
      search: (args: string[]) => spawn(this.name, ["search", ...args]),
      secret: (args: string[]) => spawn(this.name, ["secret", ...args]),
      start: (args: string[]) => spawn(this.name, ["start", ...args]),
      stats: (args: string[]) => spawn(this.name, ["stats", ...args]),
      stop: (args: string[]) => spawn(this.name, ["stop", ...args]),
      system: (args: string[]) => spawn(this.name, ["system", ...args]),
      tag: (args: string[]) => spawn(this.name, ["tag", ...args]),
      top: (args: string[]) => spawn(this.name, ["top", ...args]),
      unpause: (args: string[]) => spawn(this.name, ["unpause", ...args]),
      untag: (args: string[]) => spawn(this.name, ["untag", ...args]),
      update: (args: string[]) => spawn(this.name, ["update", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      volume: (args: string[]) => spawn(this.name, ["volume", ...args]),
      wait: (args: string[]) => spawn(this.name, ["wait", ...args]),
      help: (args: string[]) => {
        if (Array.isArray(args) && args.length !== 0) {
          return spawn(this.name, ["help", ...args]);
        }
        console.log(`
            Available Commands:
                attach      Attach to a running container
                build       Build an image using instructions from Containerfiles
                commit      Create new image based on the changed container
                container   Manage containers
                cp          Copy files/folders between a container and the local filesystem
                create      Create but do not start a container
                diff        Display the changes to the object's file system
                events      Show podman system events
                exec        Run a process in a running container
                export      Export container's filesystem contents as a tar archive
                generate    Generate structured data based on containers, pods or volumes
                healthcheck Manage health checks on containers
                help        Help about any command
                history     Show history of a specified image
                image       Manage images
                images      List images in local storage
                import      Import a tarball to create a filesystem image
                info        Display podman system information
                init        Initialize one or more containers
                inspect     Display the configuration of object denoted by ID
                kill        Kill one or more running containers with a specific signal
                kube        Play containers, pods or volumes from a structured file
                load        Load image(s) from a tar archive
                login       Log in to a container registry
                logout      Log out of a container registry
                logs        Fetch the logs of one or more containers
                machine     Manage a virtual machine
                manifest    Manipulate manifest lists and image indexes
                network     Manage networks
                pause       Pause all the processes in one or more containers
                pod         Manage pods
                port        List port mappings or a specific mapping for the container
                ps          List containers
                pull        Pull an image from a registry
                push        Push an image to a specified destination
                rename      Rename an existing container
                restart     Restart one or more containers
                rm          Remove one or more containers
                rmi         Remove one or more images from local storage
                run         Run a command in a new container
                save        Save image(s) to an archive
                search      Search registry for image
                secret      Manage secrets
                start       Start one or more containers
                stats       Display a live stream of container resource usage statistics
                stop        Stop one or more containers
                system      Manage podman
                tag         Add an additional name to a local image
                top         Display the running processes of a container
                unpause     Unpause the processes in one or more containers
                untag       Remove a name from a local image
                update      Update an existing container
                version     Display the Podman version information
                volume      Manage volumes
                wait        Block on one or more containers
        `);
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
    // TODO: install podman
  }
}

export default Podman;

import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Tilt implements Plugin {
  name = "tilt";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      alpha: (args: string[]) => spawn(this.name, ["alpha", ...args]),
      analytics: (args: string[]) => spawn(this.name, ["analytics", ...args]),
      "api-resources": (args: string[]) =>
        spawn(this.name, ["api-resources", ...args]),
      apply: (args: string[]) => spawn(this.name, ["apply", ...args]),
      args: (args: string[]) => spawn(this.name, ["args", ...args]),
      ci: (args: string[]) => spawn(this.name, ["ci", ...args]),
      completion: (args: string[]) => spawn(this.name, ["completion", ...args]),
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      delete: (args: string[]) => spawn(this.name, ["delete", ...args]),
      demo: (args: string[]) => spawn(this.name, ["demo", ...args]),
      describe: (args: string[]) => spawn(this.name, ["describe", ...args]),
      disable: (args: string[]) => spawn(this.name, ["disable", ...args]),
      docker: (args: string[]) => spawn(this.name, ["docker", ...args]),
      "docker-prune": (args: string[]) =>
        spawn(this.name, ["docker-prune", ...args]),
      doctor: (args: string[]) => spawn(this.name, ["doctor", ...args]),
      down: (args: string[]) => spawn(this.name, ["down", ...args]),
      dump: (args: string[]) => spawn(this.name, ["dump", ...args]),
      edit: (args: string[]) => spawn(this.name, ["edit", ...args]),
      enable: (args: string[]) => spawn(this.name, ["enable", ...args]),
      explain: (args: string[]) => spawn(this.name, ["explain", ...args]),
      get: (args: string[]) => spawn(this.name, ["get", ...args]),
      logs: (args: string[]) => spawn(this.name, ["logs", ...args]),
      lsp: (args: string[]) => spawn(this.name, ["lsp", ...args]),
      patch: (args: string[]) => spawn(this.name, ["patch", ...args]),
      snapshot: (args: string[]) => spawn(this.name, ["snapshot", ...args]),
      trigger: (args: string[]) => spawn(this.name, ["trigger", ...args]),
      up: (args: string[]) => spawn(this.name, ["up", ...args]),
      "verify-install": (args: string[]) =>
        spawn(this.name, ["verify-install", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      wait: (args: string[]) => spawn(this.name, ["wait", ...args]),
      help: () => {
        console.log(`    Available Commands:
        alpha          unstable/advanced commands still in alpha
        analytics      info and status about tilt-dev analytics
        api-resources  Print the supported API resources
        apply          Apply a configuration to a resource by filename or stdin
        args           Changes the Tiltfile args in use by a running Tilt
        ci             Start Tilt in CI/batch mode with the given Tiltfile args
        completion     Generate the autocompletion script for the specified shell
        create         Create a resource from a file or from stdin.
        delete         Delete resources by filenames, stdin, resources and names, or by resources and label selector
        demo           Creates a local, temporary Kubernetes cluster and runs a Tilt sample project
        describe       Show details of a specific resource or group of resources
        disable        Disables resources
        docker         Execute Docker commands as Tilt would execute them
        docker-prune   Run docker prune as Tilt does
        doctor         Print diagnostic information about the Tilt environment, for filing bug reports
        down           Delete resources created by 'tilt up'
        dump           Dump internal Tilt state
        edit           Edit a resource on the server
        enable         Enables resources
        explain        Get documentation for a resource
        get            Display one or many resources
        help           Help about any command
        logs           Get logs from a running Tilt instance (optionally filtered for the specified resources)
        lsp            Language server for Starlark
        patch          Update fields of a resource
        snapshot       
        trigger        Trigger an update for the specified resource
        up             Start Tilt with the given Tiltfile args
        verify-install Verifies Tilt Installation
        version        Current Tilt version
        wait           Experimental: Wait for a specific condition on one or many resources      
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
    console.log("Command not found");
  }

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type tilt > /dev/null || brew install tilt"]);
  }
}

export default Tilt;

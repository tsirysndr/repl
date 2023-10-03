import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Pulumi implements Plugin {
  name = "pulumi";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      new: (args: string[]) => spawn(this.name, ["new", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      stack: (args: string[]) => spawn(this.name, ["stack", ...args]),
      console: (args: string[]) => spawn(this.name, ["console", ...args]),
      import: (args: string[]) => spawn(this.name, ["import", ...args]),
      refresh: (args: string[]) => spawn(this.name, ["refresh", ...args]),
      state: (args: string[]) => spawn(this.name, ["state", ...args]),
      up: (args: string[]) => spawn(this.name, ["up", ...args]),
      destroy: (args: string[]) => spawn(this.name, ["destroy", ...args]),
      preview: (args: string[]) => spawn(this.name, ["preview", ...args]),
      cancel: (args: string[]) => spawn(this.name, ["cancel", ...args]),
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      logout: (args: string[]) => spawn(this.name, ["logout", ...args]),
      whoami: (args: string[]) => spawn(this.name, ["whoami", ...args]),
      org: (args: string[]) => spawn(this.name, ["org", ...args]),
      policy: (args: string[]) => spawn(this.name, ["policy", ...args]),
      plugin: (args: string[]) => spawn(this.name, ["plugin", ...args]),
      schema: (args: string[]) => spawn(this.name, ["schema", ...args]),
      package: (args: string[]) => spawn(this.name, ["package", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      about: (args: string[]) => spawn(this.name, ["about", ...args]),
      "gen-completion": (args: string[]) =>
        spawn(this.name, ["gen-completion", ...args]),
      convert: (args: string[]) => spawn(this.name, ["convert", ...args]),
      watch: (args: string[]) => spawn(this.name, ["watch", ...args]),
      logs: (args: string[]) => spawn(this.name, ["logs", ...args]),
      help: () => {
        console.log(`
        Stack Management Commands:
          new                   Create a new Pulumi project
          config                Manage configuration
          stack                 Manage stacks
          console               Opens the current stack in the Pulumi Console
          import                Import resources into an existing stack
          refresh               Refresh the resources in a stack
          state                 Edit the current stack's state
        
        Deployment Commands:
          up                    Create or update the resources in a stack
          destroy               Destroy all existing resources in the stack
          preview               Show a preview of updates to a stack's resources
          cancel                Cancel a stack's currently running update, if any
        
        Pulumi Cloud Commands:
          login                 Log in to the Pulumi Cloud
          logout                Log out of the Pulumi Cloud
          whoami                Display the current logged-in user
          org                   Manage Organization configuration
        
        Policy Management Commands:
          policy                Manage resource policies
        
        Plugin Commands:
          plugin                Manage language and resource provider plugins
          schema                Analyze package schemas
          package               Work with Pulumi packages
        
        Other Commands:
          version               Print Pulumi's version number
          about                 Print information about the Pulumi environment.
          gen-completion        Generate completion scripts for the Pulumi CLI
        
        Experimental Commands:
          convert               Convert Pulumi programs from a supported source program into other supported languages
          watch                 Continuously update the resources in a stack
          logs                  Show aggregated resource logs for a stack
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
}

export default Pulumi;

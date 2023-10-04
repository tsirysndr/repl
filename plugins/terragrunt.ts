import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Terragrunt implements Plugin {
  name = "terragrunt";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      init: (args: string[]) => spawn(this.name, ["init", ...args]),
      validate: (args: string[]) => spawn(this.name, ["validate", ...args]),
      plan: (args: string[]) => spawn(this.name, ["plan", ...args]),
      apply: (args: string[]) => spawn(this.name, ["apply", ...args]),
      destroy: (args: string[]) => spawn(this.name, ["destroy", ...args]),
      console: (args: string[]) => spawn(this.name, ["console", ...args]),
      fmt: (args: string[]) => spawn(this.name, ["fmt", ...args]),
      force_unlock: (args: string[]) =>
        spawn(this.name, ["force-unlock", ...args]),
      get: (args: string[]) => spawn(this.name, ["get", ...args]),
      graph: (args: string[]) => spawn(this.name, ["graph", ...args]),
      import: (args: string[]) => spawn(this.name, ["import", ...args]),
      login: (args: string[]) => spawn(this.name, ["login", ...args]),
      logout: (args: string[]) => spawn(this.name, ["logout", ...args]),
      metadata: (args: string[]) => spawn(this.name, ["metadata", ...args]),
      output: (args: string[]) => spawn(this.name, ["output", ...args]),
      providers: (args: string[]) => spawn(this.name, ["providers", ...args]),
      refresh: (args: string[]) => spawn(this.name, ["refresh", ...args]),
      show: (args: string[]) => spawn(this.name, ["show", ...args]),
      state: (args: string[]) => spawn(this.name, ["state", ...args]),
      taint: (args: string[]) => spawn(this.name, ["taint", ...args]),
      untaint: (args: string[]) => spawn(this.name, ["untaint", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      workspace: (args: string[]) => spawn(this.name, ["workspace", ...args]),
      "run-all": (args: string[]) => spawn(this.name, ["run-all", ...args]),
      "terragrunt-info": (args: string[]) =>
        spawn(this.name, ["terragrunt-info", ...args]),
      "validate-inputs": (args: string[]) =>
        spawn(this.name, ["validate-inputs", ...args]),
      "graph-dependencies": (args: string[]) =>
        spawn(this.name, ["graph-dependencies", ...args]),
      hclfmt: (args: string[]) => spawn(this.name, ["hclfmt", ...args]),
      "aws-provider-patch": (args: string[]) =>
        spawn(this.name, ["aws-provider-patch", ...args]),
      "render-json": (args: string[]) =>
        spawn(this.name, ["render-json", ...args]),
      "output-module-groups": (args: string[]) =>
        spawn(this.name, ["output-module-groups", ...args]),
      help: () => {
        console.log(`
        Main commands:
            aws-provider-patch    Overwrite settings on nested AWS providers to work around a Terraform bug (issue #13018).
            graph-dependencies    Prints the terragrunt dependency graph to stdout.
            hclfmt                Recursively find hcl files and rewrite them into a canonical format.
            output-module-groups  Output groups of modules ordered for apply as a list of list in JSON (useful for CI use cases).
            render-json           Render the final terragrunt config, with all variables, includes, and functions resolved, as json.
            run-all               Run a terraform command against a 'stack' by running the specified command in each subfolder.
            terragrunt-info       Emits limited terragrunt state on stdout and exits.
            validate-inputs       Checks if the terragrunt configured inputs align with the terraform defined variables.
            init                  Prepare your working directory for other commands
            validate              Check whether the configuration is valid
            plan                  Show changes required by the current configuration
            apply                 Create or update infrastructure
            destroy               Destroy previously-created infrastructure

        All other commands:
            console       Try Terraform expressions at an interactive command prompt
            fmt           Reformat your configuration in the standard style
            force_unlock  Release a stuck lock on the current workspace
            get           Install or upgrade remote Terraform modules
            graph         Generate a Graphviz graph of the steps in an operation
            import        Associate existing infrastructure with a Terraform resource
            login         Obtain and save credentials for a remote host
            logout        Remove locally-stored credentials for a remote host
            metadata      Metadata related commands
            output        Show output values from your root module
            providers     Show the providers required for this configuration
            refresh       Update the state to match remote systems
            show          Show the current state or a saved plan
            state         Advanced state management
            taint         Mark a resource instance as not fully functional
            untaint       Remove the 'tainted' state from a resource instance
            version       Show the current Terraform version
            workspace     Workspace management
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
    await spawn("sh", [
      "-c",
      "type terragrunt > /dev/null || brew install terragrunt",
    ]);
  }
}

export default Terragrunt;

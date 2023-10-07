import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class Nx implements Plugin {
  name = "nx";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      affected: (args: string[]) => spawn("npx", ["nx", "affected", ...args]),
      "affected:graph": (args: string[]) =>
        spawn("npx", ["nx", "affected:graph", ...args]),
      connect: (args: string[]) => spawn("npx", ["nx", "connect", ...args]),
      daemon: (args: string[]) => spawn("npx", ["nx", "daemon", ...args]),
      graph: (args: string[]) => spawn("npx", ["nx", "graph", ...args]),
      exec: (args: string[]) => spawn("npx", ["nx", "exec", ...args]),
      "format:check": (args: string[]) =>
        spawn("npx", ["nx", "format:check", ...args]),
      "format:write": (args: string[]) =>
        spawn("npx", ["nx", "format:write", ...args]),
      generate: (args: string[]) => spawn("npx", ["nx", "generate", ...args]),
      init: (args: string[]) => spawn("npx", ["nx", "init", ...args]),
      list: (args: string[]) => spawn("npx", ["nx", "list", ...args]),
      migrate: (args: string[]) => spawn("npx", ["nx", "migrate", ...args]),
      print: (args: string[]) => spawn("npx", ["nx", "print", ...args]),
      release: (args: string[]) => spawn("npx", ["nx", "release", ...args]),
      repair: (args: string[]) => spawn("npx", ["nx", "repair", ...args]),
      report: (args: string[]) => spawn("npx", ["nx", "report", ...args]),
      reset: (args: string[]) => spawn("npx", ["nx", "reset", ...args]),
      run: (args: string[]) => spawn("npx", ["nx", "run", ...args]),
      "run-many": (args: string[]) => spawn("npx", ["nx", "run-many", ...args]),
      show: (args: string[]) => spawn("npx", ["nx", "show", ...args]),
      "view-logs": (args: string[]) =>
        spawn("npx", ["nx", "view-logs", ...args]),
      watch: (args: string[]) => spawn("npx", ["nx", "watch", ...args]),
      "workspace-generator": (args: string[]) =>
        spawn("npx", ["nx", "workspace-generator", ...args]),
      "workspace-lint": (args: string[]) =>
        spawn("npx", ["nx", "workspace-lint", ...args]),
      version: (args: string[]) => spawn("npx", ["nx", "--version", ...args]),
      help: () => {
        console.log(`    
        Commands:
          affected                                      Run target for affected projects
          affected:graph                                Graph dependencies affected by changes
            [aliases: affected:dep-graph] [deprecated: Use \`graph --affected\`, or \`affected --graph\` instead depending on which best suits your use case. The \`affected:graph\`
                                                                                                                                                  command will be removed in Nx 18.]
          connect                                       Connect workspace to Nx Cloud                                                              [aliases: connect-to-nx-cloud]
          daemon                                        Prints information about the Nx Daemon process or starts a daemon process
          graph                                         Graph dependencies within workspace                                                                  [aliases: dep-graph]
          exec                                          Executes any command as if it was a target on the project
          format:check                                  Check for un-formatted files
          format:write                                  Overwrite un-formatted files                                                                            [aliases: format]
          generate <generator> [_..]                    Generate or update source code (e.g., generate @nx/js:lib mylib).                                         [aliases: g]
          init                                          Adds Nx to any type of workspace. It installs nx, creates an nx.json configuration file and optionally sets up
                                                           distributed caching. For more info, check https://nx.dev/recipes/adopting-nx.
          list [plugin]                                 Lists installed plugins, capabilities of installed plugins and other available plugins.
          migrate [packageAndVersion]                   Creates a migrations file or runs migrations from the migrations file.
                                                           - Migrate packages and create migrations.json (e.g., migrate @nx/workspace@latest)
                                                           - Run migrations (e.g., migrate --run-migrations=migrations.json). Use flag --if-exists to run migrations only if the
                                                           migrations file exists.
          print-affected                                Prints information about the projects and targets affected by changes
           [deprecated: Use \`show projects --affected\`, \`affected --graph -t build\` or \`graph --affected\` depending on which best suits your use case. The \`print-affected\`
                                                                                                                                                  command will be removed in Nx 18.]
          release                                       **ALPHA**: Orchestrate versioning and publishing of applications and libraries
          repair                                        Repair any configuration that is no longer supported by Nx.
        
                                                           Specifically, this will run every migration within the \`nx\` package
                                                           against the current repository. Doing so should fix any configuration
                                                           details left behind if the repository was previously updated to a new
                                                           Nx version without using \`migrate\`.
        
                                                           If your repository has only ever updated to newer versions of Nx with
                                                           \`migrate\`, running \`repair\` should do nothing.
        
          report                                        Reports useful version numbers to copy into the Nx issue template
          reset                                         Clears all the cached Nx artifacts and metadata about the workspace and shuts down the Nx Daemon.  [aliases: clear-cache]
          run [project][:target][:configuration] [_..]  Run a target for a project
                                                           (e.g., run myapp:serve:production).
        
                                                           You can also use the infix notation to run a target:
                                                           (e.g., serve myapp --configuration=production)
        
                                                           You can skip the use of Nx cache by using the --skip-nx-cache option.
          run-many                                      Run target for multiple listed projects
          show                                          Show information about the workspace (e.g., list of projects)
          view-logs                                     Enables you to view and interact with the logs via the advanced analytic UI from Nx Cloud to help you debug your issue.
                                                           To do this, Nx needs to connect your workspace to Nx Cloud and upload the most recent run details. Only the metrics are
                                                           uploaded, not the artefacts.
          watch                                         Watch for changes within projects, and execute commands
          workspace-generator [generator]               Runs a workspace generator from the tools/generators directory
                                                        [aliases: workspace-schematic] [deprecated: Use a local plugin instead. See: https://nx.dev/deprecated/workspace-generators]
          workspace-lint [files..]                      Lint specific workspace files (nx.json, workspace.json)
                                                  [deprecated: workspace-lint is deprecated, and will be removed in v17. The checks it used to perform are no longer relevant.  See:
                                                                                                                                           https://nx.dev/deprecated/workspace-lint]`);
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
    if (cmd === "help") {
      return;
    }

    await spawn("npx", ["nx", cmd, ...params]);
  }

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type node > /dev/null || brew install node"]);
  }
}
export default Nx;

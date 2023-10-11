import { evaluateSystemCommand, spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import Brew from "./brew.ts";

class GitlabCLI implements Plugin {
  name = "glab";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      alias: (args: string[]) => spawn(this.name, ["alias", ...args]),
      api: (args: string[]) => spawn(this.name, ["api", ...args]),
      auth: (args: string[]) => spawn(this.name, ["auth", ...args]),
      changelog: (args: string[]) => spawn(this.name, ["changelog", ...args]),
      check_update: (args: string[]) =>
        spawn(this.name, ["check-update", ...args]),
      ci: (args: string[]) => spawn(this.name, ["ci", ...args]),
      completion: (args: string[]) => spawn(this.name, ["completion", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      incident: (args: string[]) => spawn(this.name, ["incident", ...args]),
      issue: (args: string[]) => spawn(this.name, ["issue", ...args]),
      label: (args: string[]) => spawn(this.name, ["label", ...args]),
      mr: (args: string[]) => spawn(this.name, ["mr", ...args]),
      release: (args: string[]) => spawn(this.name, ["release", ...args]),
      repo: (args: string[]) => spawn(this.name, ["repo", ...args]),
      schedule: (args: string[]) => spawn(this.name, ["schedule", ...args]),
      snippet: (args: string[]) => spawn(this.name, ["snippet", ...args]),
      ssh_key: (args: string[]) => spawn(this.name, ["ssh-key", ...args]),
      user: (args: string[]) => spawn(this.name, ["user", ...args]),
      variable: (args: string[]) => spawn(this.name, ["variable", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`
            CORE COMMANDS
                alias:       Create, list and delete aliases
                api:         Make an authenticated request to GitLab API
                ask:         Generate terminal commands from natural language. (Experimental.)
                auth:        Manage glab's authentication state
                changelog:   Interact with the changelog API
                check-update: Check for latest glab releases
                ci:          Work with GitLab CI/CD pipelines and jobs
                completion:  Generate shell completion scripts
                config:      Set and get glab settings
                help:        Help about any command
                incident:    Work with GitLab incidents
                issue:       Work with GitLab issues
                label:       Manage labels on remote
                mr:          Create, view and manage merge requests
                release:     Manage GitLab releases
                repo:        Work with GitLab repositories and projects
                schedule:    Work with GitLab CI schedules
                snippet:     Create, view and manage snippets
                ssh-key:     Manage SSH keys registered with your GitLab account.
                user:        Interact with user
                variable:    Manage GitLab Project and Group Variables
                version:     Show glab version information
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
    await new Brew().install();
    await spawn("sh", ["-c", "type glab > /dev/null || brew install glab"]);
  }
}

export default GitlabCLI;

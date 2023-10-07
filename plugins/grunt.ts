import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";
import { blue } from "../deps.ts";
import Brew from "./brew.ts";

class Grunt implements Plugin {
  name = "grunt";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      run: (args: string[]) => spawn("bunx", ["grunt-cli", ...args]),
      tasks: (args: string[]) =>
        spawn("bunx", ["grunt-cli", "--help", ...args]),
      version: (args: string[]) =>
        spawn("bunx", ["grunt-cli", "--version", ...args]),
      help: () => {
        console.log(`    Usage:
        [task [task ...]] [options]

        Options
            --help, -h  Display this help text.                                        
                --base  Specify an alternate base path. By default, all file paths are 
                        relative to the Gruntfile. (grunt.file.setBase) *              
            --no-color  Disable colored output.                                        
          --gruntfile  Specify an alternate Gruntfile. By default, grunt looks in the 
                        current or parent directories for the nearest Gruntfile.js or  
                        Gruntfile.coffee file.                                         
          --debug, -d  Enable debugging mode for tasks that support it.               
              --stack  Print a stack trace when exiting with a warning or fatal error.
          --force, -f  A way to force your way past warnings. Want a suggestion? Don't
                        use this option, fix your code.                                
              --tasks  Additional directory paths to scan for task and "extra" files. 
                        (grunt.loadTasks) *                                            
                --npm  Npm-installed grunt plugins to scan for task and "extra" files.
                        (grunt.loadNpmTasks) *                                         
            --no-write  Disable writing files (dry run).                               
        --verbose, -v  Verbose mode. A lot more information output.                   
        --version, -V  Print the grunt version. Combine with --verbose for more info. 
          --completion  Output shell auto-completion rules. See the grunt-cli          
                        documentation for more information.                   
        
        Commands:
          tasks [options] ${blue("List the tasks available to run.")}
          version         ${blue("Print the version number of bun.")}`);
        return Promise.resolve();
      },
    };
  }

  async evaluate(command: string): Promise<void> {
    const [cmd, ...params] = command.split(" ");
    if (this.commands[cmd]) {
      await this.commands[cmd]([...params]);
      return;
    }
    if (cmd === "") {
      return;
    }
    await this.commands["run"]([...params, cmd]);
  }

  async install(): Promise<void> {
    await new Brew().install();
    await spawn("sh", ["-c", "type node > /dev/null || brew install node"]);
    await spawn("sh", ["-c", "type bun > /dev/null || brew install bun"]);
  }
}

export default Grunt;

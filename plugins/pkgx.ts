import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Pkgx implements Plugin {
  name = "pkgx";
  commands: Record<string, (params: string[]) => Promise<void>>;
  constructor() {
    this.commands = {
      help: () => {
        console.log(`
        [+pkg@x.y…] [program|path] [--] [arg…]

        examples:
          > node@18 --eval 'console.log("pkgx.sh")'
          > +openssl cargo build
          > npx@latest cowsay@latest 'fancy a cuppa?'`);
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
    await spawn(this.name, [cmd, ...params]);
  }
}

export default Pkgx;

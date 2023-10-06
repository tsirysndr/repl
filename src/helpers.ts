import { Input, green } from "../deps.ts";
import Brew from "../plugins/brew.ts";

export async function spawn(name: string, args: string[]): Promise<void> {
  const command = new Deno.Command(name, {
    args,
    stdout: "inherit",
    stderr: "inherit",
  });
  const child = command.spawn();
  await child.status;
}

export async function spawnPiped(
  name: string,
  args: string[]
): Promise<string> {
  const command = new Deno.Command(name, {
    args,
    stdout: "piped",
    stderr: "inherit",
  });
  const child = command.spawn();
  await child.status;
  const { stdout } = await child.output();
  const decoder = new TextDecoder();
  return decoder.decode(stdout);
}

export async function availableCommands(): Promise<string[]> {
  const stdout = await spawnPiped("sh", [
    "-c",
    "ls $(echo $PATH | tr ':' ' ') | grep -v '/' | grep . | sort",
  ]);
  return stdout.split("\n").filter((s) => s !== "");
}

export async function canExecCommand(exec: string) {
  const command = exec.split(" ")[0];
  return (await availableCommands()).includes(command);
}

export async function evaluateSystemCommand(command: string) {
  if (await canExecCommand(command)) {
    return await spawn("sh", ["-c", command]);
  }
  const name = command.split(" ")[0];
  const yes = await Input.prompt({
    message: `${green("`" + name + "`")} is not installed, install it? (y/n)`,
    suggestions: ["yes", "no"],
  });
  if (yes === "yes" || yes === "y") {
    await new Brew().install();
    await spawn("sh", ["-c", `brew install ${name}`]);
  }
}

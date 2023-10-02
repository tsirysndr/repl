abstract class Plugin {
  abstract evaluate(command: string): Promise<void>;
}

export default Plugin;

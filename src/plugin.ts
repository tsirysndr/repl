abstract class Plugin {
  abstract evaluate(command: string): Promise<void>;
  abstract install(): Promise<void>;
}

export default Plugin;

import { spawn } from "../src/helpers.ts";
import Plugin from "../src/plugin.ts";

class Kubectl implements Plugin {
  name = "kubectl";
  commands: Record<string, (params: string[]) => Promise<void>>;

  constructor() {
    this.commands = {
      create: (args: string[]) => spawn(this.name, ["create", ...args]),
      expose: (args: string[]) => spawn(this.name, ["expose", ...args]),
      run: (args: string[]) => spawn(this.name, ["run", ...args]),
      set: (args: string[]) => spawn(this.name, ["set", ...args]),
      explain: (args: string[]) => spawn(this.name, ["explain", ...args]),
      get: (args: string[]) => spawn(this.name, ["get", ...args]),
      edit: (args: string[]) => spawn(this.name, ["edit", ...args]),
      delete: (args: string[]) => spawn(this.name, ["delete", ...args]),
      rollout: (args: string[]) => spawn(this.name, ["rollout", ...args]),
      scale: (args: string[]) => spawn(this.name, ["scale", ...args]),
      autoscale: (args: string[]) => spawn(this.name, ["autoscale", ...args]),
      certificate: (args: string[]) =>
        spawn(this.name, ["certificate", ...args]),
      cluster_info: (args: string[]) =>
        spawn(this.name, ["cluster-info", ...args]),
      top: (args: string[]) => spawn(this.name, ["top", ...args]),
      cordon: (args: string[]) => spawn(this.name, ["cordon", ...args]),
      uncordon: (args: string[]) => spawn(this.name, ["uncordon", ...args]),
      drain: (args: string[]) => spawn(this.name, ["drain", ...args]),
      taint: (args: string[]) => spawn(this.name, ["taint", ...args]),
      describe: (args: string[]) => spawn(this.name, ["describe", ...args]),
      logs: (args: string[]) => spawn(this.name, ["logs", ...args]),
      attach: (args: string[]) => spawn(this.name, ["attach", ...args]),
      exec: (args: string[]) => spawn(this.name, ["exec", ...args]),
      port_forward: (args: string[]) =>
        spawn(this.name, ["port-forward", ...args]),
      proxy: (args: string[]) => spawn(this.name, ["proxy", ...args]),
      cp: (args: string[]) => spawn(this.name, ["cp", ...args]),
      auth: (args: string[]) => spawn(this.name, ["auth", ...args]),
      debug: (args: string[]) => spawn(this.name, ["debug", ...args]),
      events: (args: string[]) => spawn(this.name, ["events", ...args]),
      diff: (args: string[]) => spawn(this.name, ["diff", ...args]),
      apply: (args: string[]) => spawn(this.name, ["apply", ...args]),
      patch: (args: string[]) => spawn(this.name, ["patch", ...args]),
      replace: (args: string[]) => spawn(this.name, ["replace", ...args]),
      wait: (args: string[]) => spawn(this.name, ["wait", ...args]),
      kustomize: (args: string[]) => spawn(this.name, ["kustomize", ...args]),
      label: (args: string[]) => spawn(this.name, ["label", ...args]),
      annotate: (args: string[]) => spawn(this.name, ["annotate", ...args]),
      completion: (args: string[]) => spawn(this.name, ["completion", ...args]),
      api_resources: (args: string[]) =>
        spawn(this.name, ["api-resources", ...args]),
      api_versions: (args: string[]) =>
        spawn(this.name, ["api-versions", ...args]),
      config: (args: string[]) => spawn(this.name, ["config", ...args]),
      plugin: (args: string[]) => spawn(this.name, ["plugin", ...args]),
      version: (args: string[]) => spawn(this.name, ["version", ...args]),
      help: () => {
        console.log(`
        Basic Commands (Beginner):
            create          Create a resource from a file or from stdin
            expose          Take a replication controller, service, deployment or pod and expose it as a new Kubernetes service
            run             Run a particular image on the cluster
            set             Set specific features on objects

        Basic Commands (Intermediate):
            explain         Get documentation for a resource
            get             Display one or many resources
            edit            Edit a resource on the server
            delete          Delete resources by file names, stdin, resources and names, or by resources and label selector

        Deploy Commands:
            rollout         Manage the rollout of a resource
            scale           Set a new size for a deployment, replica set, or replication controller
            autoscale       Auto-scale a deployment, replica set, stateful set, or replication controller

        Cluster Management Commands:
            certificate     Modify certificate resources
            cluster-info    Display cluster information
            top             Display resource (CPU/memory) usage
            cordon          Mark node as unschedulable
            uncordon        Mark node as schedulable
            drain           Drain node in preparation for maintenance
            taint           Update the taints on one or more nodes

        Troubleshooting and Debugging Commands:
            describe        Show details of a specific resource or group of resources
            logs            Print the logs for a container in a pod
            attach          Attach to a running container
            exec            Execute a command in a container
            port-forward    Forward one or more local ports to a pod
            proxy           Run a proxy to the Kubernetes API server
            cp              Copy files and directories to and from containers
            auth            Inspect authorization
            debug           Create debugging sessions for troubleshooting workloads and nodes
            events          List events

        Advanced Commands:
            diff            Diff the live version against a would-be applied version
            apply           Apply a configuration to a resource by file name or stdin
            patch           Update fields of a resource
            replace         Replace a resource by file name or stdin
            wait            Experimental: Wait for a specific condition on one or many resources
            kustomize       Build a kustomization target from a directory or URL

        Settings Commands:
            label           Update the labels on a resource
            annotate        Update the annotations on a resource
            completion      Output shell completion code for the specified shell (bash, zsh, fish, or powershell)

        Other Commands:
            api-resources   Print the supported API resources on the server
            api-versions    Print the supported API versions on the server, in the form of "group/version"
            config          Modify kubeconfig files
            plugin          Provides utilities for interacting with plugins
            version         Print the client and server version information

        Usage:
            [flags] [options]

        Use "<command> --help" for more information about a given command.
        Use "options" for a list of global command-line options (applies to all commands).
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

export default Kubectl;

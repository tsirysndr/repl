{
  description = "Repl - Simple extensible REPL Command Line Tool 💻 🚀✨";

  inputs = {
    utils.url = "github:numtide/flake-utils";
    deno2nix = {
      url = "github:tsirysndr/deno2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, utils, deno2nix }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ deno2nix.overlays.default ];
        };
      in
      rec {

        apps.default = utils.lib.mkApp {
          drv = packages.default;
        };

        packages.default = pkgs.deno2nix.mkExecutable {
          pname = "repl";
          version = "0.5.1";

          src = ./.;
          lockfile = "./deno.lock";
          config = "./deno.json";
          entrypoint = "./main.ts";
        };

        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            deno
          ];
        };
      });
}
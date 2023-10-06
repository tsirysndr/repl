import Docker from "./docker.ts";
import Git from "./git.ts";
import GithubCLI from "./github-cli.ts";
import Terraform from "./terraform.ts";
import Brew from "./brew.ts";
import Bun from "./bun.ts";
import Pkgx from "./pkgx.ts";
import Pulumi from "./pulumi.ts";
import Tilt from "./tilt.ts";
import Spin from "./spin.ts";
import Wasmer from "./wasmer.ts";
import Dagger from "./dagger.ts";
import Helm from "./helm.ts";
import Devbox from "./devbox.ts";
import Kubectl from "./kubectl.ts";
import Npm from "./npm.ts";
import Deno from "./deno.ts";
import Bazel from "./bazel.ts";
import Asdf from "./asdf.ts";
import Terragrunt from "./terragrunt.ts";
import Podman from "./podman.ts";
import Nix from "./nix.ts";
import HomeManager from "./home-manager.ts";
import FlakeHub from "./flakehub.ts";

export const plugins = [
  new Docker(),
  new Git(),
  new GithubCLI(),
  new Terraform(),
  new Brew(),
  new Bun(),
  new Pkgx(),
  new Pulumi(),
  new Tilt(),
  new Spin(),
  new Wasmer(),
  new Dagger(),
  new Helm(),
  new Devbox(),
  new Kubectl(),
  new Npm(),
  new Deno(),
  new Bazel(),
  new Asdf(),
  new Terragrunt(),
  new Podman(),
  new Nix(),
  new HomeManager(),
  new FlakeHub(),
];

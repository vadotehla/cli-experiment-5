/** @format */

import {
  argv as InputArguments,
  argv0 as CommandName,
  exit,
} from "node:process";

const argv = InputArguments.slice(2);

if (argv.length < 1) {
  console.error("few arguments");
  exit(1);
}

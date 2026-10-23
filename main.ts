/** @format */

import {
  argv as InputArguments,
  argv0 as CommandName,
  exit,
} from "node:process";

import * as Types from "./Assets/Types.ts";

const argv = InputArguments.slice(2);

if (argv.length < 1) {
  console.error("few arguments");
  exit(1);
}

const Nodes: Types.AST.ASTNode[] = [];

let i: number = 0;
let PlausibleValues: number = 0;
let ContinueFlags: boolean = true;

while (i < argv.length) {
  let Finished: boolean = false;
  const CurrentElement: string = argv[i];

  if (CurrentElement.startsWith("-") && ContinueFlags) {
    if (PlausibleValues > 0) PlausibleValues = 0;
    if (CurrentElement === "--") {
      ContinueFlags = false;
      Finished = true;
    }

    if (ContinueFlags && !Finished) {
      if (CurrentElement.startsWith("--")) {
        const DefinesValueInline: boolean = CurrentElement.includes("=");
        PlausibleValues = DefinesValueInline ? 0 : 1;
        const FlagName: string = CurrentElement.slice(
          2,
          DefinesValueInline
            ? CurrentElement.indexOf("=") - 1
            : CurrentElement.length
        );
        Nodes.push({ NodeType: Types.AST.NodeType.FLAG, Value: FlagName });
        Finished = true;
      } else if (
        CurrentElement.startsWith("-") &&
        !CurrentElement.startsWith("--")
      ) {
        const DefinesValueInline: boolean = CurrentElement.includes("=");
        const FlagName: string = CurrentElement.slice(
          1,
          DefinesValueInline
            ? CurrentElement.indexOf("=") - 1
            : CurrentElement.length
        );
        console.log(FlagName);
        if (FlagName.length > 1) {
          PlausibleValues = DefinesValueInline
            ? FlagName.length - 1
            : FlagName.length;
          for (let x = 0; x < FlagName.length; x++) {
            const Glyph: string | undefined = FlagName.at(x);
            if (Glyph) {
              Nodes.push({
                NodeType: Types.AST.NodeType.FLAG,
                Value: Glyph,
              });
            }
          }
        } else {
          PlausibleValues = DefinesValueInline ? 0 : 1;
          Nodes.push({ NodeType: Types.AST.NodeType.FLAG, Value: FlagName });
        }
      }
    }
  }

  i++;
}

console.log(Nodes);
console.log(PlausibleValues);

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
    if (CurrentElement === "--") {
      ContinueFlags = false;
      Finished = true;
    }

    if (ContinueFlags && !Finished) {
      if (CurrentElement.startsWith("--")) {
        const DefinesValueInline: boolean = CurrentElement.includes("=");
        const FlagName: string = CurrentElement.slice(
          2,
          DefinesValueInline
            ? CurrentElement.indexOf("=")
            : CurrentElement.length
        );
        if (!isNaN(Number(FlagName[0]))) {
          if (PlausibleValues > 0) {
            Nodes.push({
              NodeType: Types.AST.NodeType.VALUE,
              Value: CurrentElement,
            });
            PlausibleValues--;
          } else {
            Nodes.push({
              NodeType: Types.AST.NodeType.POSITIONAL,
              Value: CurrentElement,
            });
          }
          Finished = true;
        }
        if (!Finished) {
          PlausibleValues = DefinesValueInline ? 0 : 1;
          Nodes.push({ NodeType: Types.AST.NodeType.FLAG, Value: FlagName });
          if (DefinesValueInline) {
            const Value: string = CurrentElement.slice(
              CurrentElement.indexOf("=") + 1
            );

            Nodes.push({ NodeType: Types.AST.NodeType.VALUE, Value });
          }
          Finished = true;
        }
      } else if (
        CurrentElement.startsWith("-") &&
        !CurrentElement.startsWith("--")
      ) {
        const DefinesValueInline: boolean = CurrentElement.includes("=");
        const FlagName: string = CurrentElement.slice(
          1,
          DefinesValueInline
            ? CurrentElement.indexOf("=")
            : CurrentElement.length
        );
        if (!isNaN(Number(FlagName[0]))) {
          if (PlausibleValues > 0) {
            Nodes.push({
              NodeType: Types.AST.NodeType.VALUE,
              Value: CurrentElement,
            });
            PlausibleValues--;
          } else {
            Nodes.push({
              NodeType: Types.AST.NodeType.POSITIONAL,
              Value: CurrentElement,
            });
          }
          Finished = true;
        }
        if (FlagName.length > 1 && !Finished) {
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
          if (DefinesValueInline) {
            const Value: string = CurrentElement.slice(
              CurrentElement.indexOf("=") + 1
            );

            Nodes.push({ NodeType: Types.AST.NodeType.VALUE, Value });
          }
        } else if (!Finished) {
          PlausibleValues = DefinesValueInline ? 0 : 1;
          Nodes.push({ NodeType: Types.AST.NodeType.FLAG, Value: FlagName });
          if (DefinesValueInline) {
            const Value: string = CurrentElement.slice(
              CurrentElement.indexOf("=") + 1
            );

            Nodes.push({ NodeType: Types.AST.NodeType.VALUE, Value });
          }
        }
        Finished = true;
      }
      if (PlausibleValues > 0) PlausibleValues = 0;
    }
  }

  if (PlausibleValues > 0 && !Finished) {
    PlausibleValues--;
    Nodes.push({ NodeType: Types.AST.NodeType.VALUE, Value: CurrentElement });
  } else if (!Finished) {
    Nodes.push({
      NodeType: Types.AST.NodeType.POSITIONAL,
      Value: CurrentElement,
    });
  }

  i++;
}

console.log(Nodes);
console.log(PlausibleValues);

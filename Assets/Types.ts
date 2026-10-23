/** @format */
// deno-lint-ignore-file no-explicit-any no-namespace

export namespace OOPDefinitions {
  export type OOPSubcommand = string;
  export type OOPArgument = string;
  export type OOPFlag = {
    FlagName: string;
    BooleanFlag: boolean;
  };
}

export interface Flag {
  readonly FlagName: string;
  readonly FlagValue: any;
}
export interface Command {
  readonly CommandName: string;
  readonly CommandDescription: string[] | undefined;
  readonly CommandShortDescription: string | undefined;
  readonly CommandArguments: OOPDefinitions.OOPArgument[] | undefined;
  readonly CommandFlags: OOPDefinitions.OOPFlag[] | undefined;
  readonly CommandSubcommands: OOPDefinitions.OOPSubcommand[] | undefined;
  readonly CommandDispatch:
    | ((
        Subcommands: string[],
        Arguments: string[],
        Flags: Flag[]
      ) => Promise<void>)
    | ((Subcommands: string[], Arguments: string[], Flags: Flag[]) => void);
}

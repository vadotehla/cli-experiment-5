/** @format */
// deno-lint-ignore-file no-explicit-any

export interface Flag {
  readonly FlagName: string;
  readonly FlagValue: any;
}
export interface Command {
  readonly CommandName: string;
  readonly CommandDescription: string[] | undefined;
  readonly CommandShortDescription: string | undefined;
  readonly CommandArguments: string[] | undefined;
  readonly CommandFlags: string[] | undefined;
  readonly CommandSubcommands: string[] | undefined;
  readonly CommandDispatch:
    | ((
        Subcommands: string[],
        Arguments: string[],
        Flags: Flag[]
      ) => Promise<void>)
    | ((Subcommands: string[], Arguments: string[], Flags: Flag[]) => void);
}

/** @format */

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
        Flags: string[]
      ) => Promise<void>)
    | ((Subcommands: string[], Arguments: string[], Flags: string[]) => void);
}

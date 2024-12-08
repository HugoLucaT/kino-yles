export type Message =
  | { success: string }
  | { error: string }
  | { message: string }
  | { multiError: string };
export function FormMessage({ message }: { message: Message }) {
  let multiError: string[] = [];
  if ("multiError" in message && typeof message.multiError === "string") {
    multiError = message.multiError.split("|");
  }
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-foreground border-l-2 border-foreground px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
          {message.error}
        </div>
      )}
      {multiError.length > 0 && (
        <>
          <h2>Please fix the following:</h2>
          <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
            <ul>
              {multiError.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}

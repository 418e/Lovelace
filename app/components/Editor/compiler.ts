export function compile(
  input: string,
  symbols?: string[],
  stringLits?: string[],
  keywords?: string[]
): { token: string; type: string }[] {
  const symbolPattern: string | undefined = symbols
    ?.map((s) => escapeRegExp(s))
    .join("|");
  const stringLitPattern: string | undefined = stringLits
    ?.map((s) => escapeRegExp(s))
    .join("|");
  const keywordPattern: string | undefined = keywords?.join("|");

  const tokenPattern: RegExp = new RegExp(
    `(${symbolPattern}|${stringLitPattern}|${
      keywordPattern && keywordPattern
    }|\\w+|\\s|\\n|[^\\w\\s])`,
    "g"
  );

  const tokens: string[] = input.match(tokenPattern) || [];
  return tokens.map((token) => {
    if (symbols?.includes(token)) {
      return { token, type: "symbol" };
    } else if (stringLits?.includes(token)) {
      return { token, type: "string" };
    } else if (keywords?.includes(token)) {
      return { token, type: "keyword" };
    } else if (token.match(/\n/)) {
      return { token, type: "newline" };
    } else if (token.match(/\s/)) {
      return { token, type: "whitespace" };
    } else if (token.match(/\d/)) {
      return { token, type: "digit" };
    } else if (!token.match(/[^\\w\\s]/)) {
      return { token, type: "non-word" };
    } else {
      return { token, type: "word" };
    }
  });
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

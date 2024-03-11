import { Language_Html } from "./modules/html";
import { LanguageSupport } from "../interfaces";

export function LanguageSupport(suffix: string): LanguageSupport {
  switch (suffix) {
    case "html":
      return Language_Html;
  }

  return {};
}

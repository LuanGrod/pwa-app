import { ConnectionOperator } from "./ui/FilterInterface";

/**
 * FilterFragment represents a single filter condition and its connector.
 */
export type FilterFragment = {
  value: string;
  connector: ConnectionOperator;
};

/**
 * FilterStringAssembler is responsible for combining filter fragments into a single filter string.
 * It handles connector placement, deduplication, and trailing connector removal.
 */
export default class StringAssembler {
  static assemble(fragments: FilterFragment[]): string {
    if (fragments.length === 0) return "";

    let result = "";
    fragments.forEach((fragment, idx) => {
      if (idx === 0) {
        // First fragment: connector goes after
        result += `${fragment.value}{${fragment.connector}}`;
      } else {
        // Subsequent fragments: connector goes before
        result += `{${fragment.connector}}${fragment.value}`;
      }
    });

    // Remove trailing connector
    result = result.replace(/\{[^{}]*\}$/, "");

    // Deduplicate connectors if needed
    result = result
      .replace("{and}{or}", "{or}")
      .replace("{or}{and}", "{or}")
      .replace("{and}{and}", "{and}")
      .replace("{or}{or}", "{or}");

    return result;
  }
} 
import { FormatterInterface } from "../FormatterInterface";

export class BrazilianStateFormatter implements FormatterInterface<string> {
  // Single source of truth for state mappings
  private static readonly STATE_MAPPINGS: Record<string, string> = {
    // Long names to abbreviations
    Acre: "AC",
    Alagoas: "AL",
    Amapá: "AP",
    Amazonas: "AM",
    Bahia: "BA",
    Ceará: "CE",
    "Espírito Santo": "ES",
    Goiás: "GO",
    Maranhão: "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    Pará: "PA",
    Paraíba: "PB",
    Paraná: "PR",
    Pernambuco: "PE",
    Piauí: "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    Rondônia: "RO",
    Roraima: "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    Sergipe: "SE",
    Tocantins: "TO",
    "Distrito Federal": "DF",
  };

  format(value: string): string {
    return value;
  }

  longToShort(value: string): string {
    return BrazilianStateFormatter.STATE_MAPPINGS[value] || value;
  }

  shortToLong(value: string): string {
    // Create reverse mapping dynamically to ensure consistency
    const reverseMapping = this.createReverseMapping();
    return reverseMapping[value.toUpperCase()] || value;
  }

  private createReverseMapping(): Record<string, string> {
    const reverseMapping: Record<string, string> = {};
    
    for (const [longName, abbreviation] of Object.entries(BrazilianStateFormatter.STATE_MAPPINGS)) {
      reverseMapping[abbreviation] = longName;
    }
    
    return reverseMapping;
  }
}

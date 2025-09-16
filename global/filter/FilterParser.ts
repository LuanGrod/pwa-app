/**
 * Usado para extrair valores de strings de filtro
 *
 * Suporta o formato padrão: campo_entidade_0{operador}valor
 * Exemplo: questoes_id_prova_0{eq}6
 */

import { ConditionalOperator } from "@global/type/filter/ConditionalOpeator";

export interface ParsedFilter {
  field: string;
  entity?: string;
  operation: ConditionalOperator;
  value: string;
  rawFilter: string;
}

export class FilterParser {
  /**
   * Extrai o valor de um filtro específico da string de filtros
   * @param filters - String completa de filtros (ex: "questoes_id_prova_0{eq}6")
   * @param field - Campo a ser buscado (ex: "id_prova")
   * @param entity - Entidade associada (opcional, ex: "questoes")
   * @returns O valor extraído ou null se não encontrado
   */
  static extractFilterValue(filters: string, field: string, entity?: string): string | null {
    if (!filters || !field) return null;

    // Constrói o padrão de busca
    const pattern = entity
      ? `${entity}_${field}_0\\{(\\w+)\\}([^&]+)`
      : `\\w*_?${field}_0\\{(\\w+)\\}([^&]+)`;

    const regex = new RegExp(pattern);
    const match = filters.match(regex);

    return match ? match[2] : null;
  }

  /**
   * Extrai e converte o valor para número
   * @param filters - String de filtros
   * @param field - Campo a ser buscado
   * @param entity - Entidade associada (opcional)
   * @returns Valor numérico ou null se não encontrado/inválido
   */
  static extractFilterValueAsNumber(
    filters: string,
    field: string,
    entity?: string
  ): number | null {
    const value = this.extractFilterValue(filters, field, entity);
    if (!value) return null;

    const numValue = parseInt(value, 10);
    return isNaN(numValue) ? null : numValue;
  }

  /**
   * Faz o parsing completo de uma string de filtro individual
   * @param filterString - String de um filtro específico
   * @returns Objeto com informações do filtro ou null se inválido
   */
  static parseFilter(filterString: string): ParsedFilter | null {
    if (!filterString) return null;

    // Padrão: campo_entidade_0{operador}valor
    const regex = /^(\w+)_(\w+)_0\{(\w+)\}(.+)$/;
    const match = filterString.match(regex);

    if (!match) return null;

    const [, entity, field, operation, value] = match;

    return {
      field,
      entity,
      operation: operation as ConditionalOperator,
      value,
      rawFilter: filterString,
    };
  }

  /**
   * Extrai todos os filtros de uma string
   * @param filters - String completa de filtros
   * @returns Array com todos os filtros parseados
   */
  static parseAllFilters(filters: string): ParsedFilter[] {
    if (!filters) return [];

    // Divide a string por operadores lógicos (and/or) mantendo os filtros
    // Para simplificar, assume que os filtros são separados por & ou similares
    const filterParts = filters.split(/[&|]/);

    return filterParts
      .map((part) => this.parseFilter(part.trim()))
      .filter((parsed): parsed is ParsedFilter => parsed !== null);
  }
}

import { formattedTypes } from "@global/type/ElapsedFormat";
import { FormatterInterface } from "../FormatterInterface";



export class BrazilianDateFormatter implements FormatterInterface<string> {
  format(value: string): string {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  shortFormatMonth(value: string): string {
    if (!value) return "";
    const date = new Date(value);
    const monthAbbr = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    return monthAbbr[date.getMonth()];
  }

  shortFormatYear(value: string): string {
    if (!value) return "";
    const date = new Date(value);
    return date.getFullYear().toString();
  }

  /**
   * Calcula o tempo decorrido entre duas datas.
   * @param startDate A data de início.
   * @param endDate A data de término (opcional).
   * @returns O tempo decorrido em minutos.
   */
  getElapsedTime(startDate: string, endDate?: string): string {
    const endTime = endDate ? new Date(endDate).getTime() : Date.now();

    const elapsedMs = endTime - new Date(startDate).getTime();

    const elapsedMinutes = Math.floor(elapsedMs / 60000); // Converte para minutos

    return Math.max(0, elapsedMinutes).toString(); // Garante que não seja negativo
  }

  /**
   * Formata o tempo decorrido em uma string legível.
   * @param ElapsedTime A quantidade de tempo decorrido em minutos.
   * @param type O tipo de formatação (simplificada ou detalhada).
   * @example
   * getFormattedElapsedTime("90", "simplified") // "1hr30min"
   * getFormattedElapsedTime("90", "detailed") // "1 hora e 30 min"
   * @returns A string formatada representando o tempo decorrido.
   */
  getFormattedElapsedTime(ElapsedTime: string | null, type: formattedTypes = "simplified"): string {
        if (ElapsedTime == null) return "0 min";

        const elapsedMinutes = parseInt(ElapsedTime);
        const hours = Math.floor(elapsedMinutes / 60);
        const minutes = elapsedMinutes % 60;

        if (type === "simplified") {
          if (hours === 0) {
            return `${minutes}min`;
          } else if (minutes === 0) {
            return `${hours}hr`;
          } else {
            return `${hours}hr${minutes}`;
          }
        } else {
          if (hours === 0 && minutes === 0) {
            return "0 min";
          }

          return `${hours ? `${hours} ${hours > 1 ? "horas" : "hora"}` : ""} ${
            hours && minutes ? "e" : ""
          } ${minutes ? `${minutes} min` : ""}`;
        }
  }
}

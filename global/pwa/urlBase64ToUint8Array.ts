'use client'

/**
 * Classe responsável por converter strings base64 URL-safe para Uint8Array
 * Útil para aplicações PWA que precisam processar dados de push notifications
 */
export class Base64UrlConverter {
  private readonly paddingChar = '='
  private readonly urlSafeChars = { '-': '+', '_': '/' }

  /**
   * Converte uma string base64 URL-safe para Uint8Array
   * @param base64String - String base64 no formato URL-safe
   * @returns Uint8Array com os dados decodificados
   * @throws Error se window.atob não estiver disponível (ambiente servidor)
   */
  public convert(base64String: string): Uint8Array {
    if (typeof window === 'undefined' || !window.atob) {
      throw new Error('Esta operação requer um ambiente de navegador com suporte ao window.atob')
    }

    const normalizedBase64 = this.normalizeBase64String(base64String)
    const rawData = window.atob(normalizedBase64)
    
    return this.createUint8ArrayFromRawData(rawData)
  }

  /**
   * Normaliza a string base64 URL-safe para o formato padrão base64
   * @param base64String - String base64 no formato URL-safe
   * @returns String base64 normalizada com padding correto
   */
  private normalizeBase64String(base64String: string): string {
    const padding = this.calculatePadding(base64String.length)
    return (base64String + padding)
      .replace(/-/g, this.urlSafeChars['-'])
      .replace(/_/g, this.urlSafeChars['_'])
  }

  /**
   * Calcula o padding necessário para a string base64
   * @param length - Comprimento da string base64
   * @returns String com o padding necessário
   */
  private calculatePadding(length: number): string {
    const paddingLength = (4 - (length % 4)) % 4
    return this.paddingChar.repeat(paddingLength)
  }

  /**
   * Cria um Uint8Array a partir de dados binários decodificados
   * @param rawData - Dados binários em formato string
   * @returns Uint8Array com os dados convertidos
   */
  private createUint8ArrayFromRawData(rawData: string): Uint8Array {
    const outputArray = new Uint8Array(rawData.length)
    
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    
    return outputArray
  }

  /**
   * Método estático para uso direto sem instanciar a classe
   * Mantém compatibilidade com a função original
   * @param base64String - String base64 no formato URL-safe
   * @returns Uint8Array com os dados decodificados
   */
  public static convert(base64String: string): Uint8Array {
    const converter = new Base64UrlConverter()
    return converter.convert(base64String)
  }
}

/**
 * Função utilitária para manter compatibilidade com código existente
 * @deprecated Use Base64UrlConverter.convert() ou instancie a classe diretamente
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  return Base64UrlConverter.convert(base64String)
}
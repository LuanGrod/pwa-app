type RequiredPropsConfig<T extends Record<string, any>> = {
  values: T;
  enableDebug?: boolean;
};

/**
 * Hook para validar se todas as props obrigatórias estão presentes
 * Funciona como type guard, garantindo que as props são válidas após a verificação
 */
export default function useRequiredProps<T extends Record<string, any>>(
  config: RequiredPropsConfig<T>
): config is RequiredPropsConfig<{ [K in keyof T]: NonNullable<T[K]> }> {
  const { values, enableDebug = false } = config;

  const invalidKeys = Object.entries(values)
    .filter(([_, value]) => value === null || value === undefined || value === "")
    .map(([key, _]) => key);

  const isValid = invalidKeys.length === 0;

  if (!isValid && enableDebug) {
    console.warn(`Missing required props: ${invalidKeys.join(", ")}`);
  }

  return isValid;
}

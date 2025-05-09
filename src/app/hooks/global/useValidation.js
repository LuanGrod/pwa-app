import { useCallback } from "react";

export default function useValidation(fieldsConfig, data) {
  const validate = useCallback(() => {
    const newErrors = {};
    fieldsConfig.forEach(f => {
      for (const validator of f.validators || []) {
        console.log(data)
        const error = validator.validate(data[f.name]);
        if (error) {
          newErrors[f.name] = error;
          break;
        }
      }
    });
    return newErrors;
  }, [fieldsConfig, data]);

  return validate;
}

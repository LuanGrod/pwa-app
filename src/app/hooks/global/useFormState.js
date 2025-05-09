import { useState, useCallback } from "react";

export default function useFormState(fieldsConfig) {
  const initialData = Object.fromEntries(fieldsConfig.map((f) => [f.name, f.initialValue || ""]));
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const setFieldValue = useCallback((name, value) => {
    setData((d) => ({ ...d, [name]: value }));
  }, []);

  return { data, setFieldValue, errors, setErrors };
}

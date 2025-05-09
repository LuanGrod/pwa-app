import { useState, useCallback } from "react";


export default function useSubmit(onSubmit, data, errors) {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setSubmitError(null);
      try {
        await onSubmit(data);
      } catch (err) {
        setSubmitError(err.message || 'Erro no envio');
      } finally {
        setLoading(false);
      }
    }
  }, [data, errors, onSubmit]);

  return { loading, submitError, handleSubmit };
}
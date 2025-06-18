import React from 'react';

interface ErrorMessageProps {
  error: string | null;
}

export function ErrorMessage({ error = "Ocorreu um erro na requisição, tente novamente mais tarde." }: ErrorMessageProps) {
  return (
    <div className="error">
      <p>Erro: {error}</p>
    </div>
  );
}

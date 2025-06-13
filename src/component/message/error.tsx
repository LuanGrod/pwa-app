import React from 'react';

interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="error">
      <p>Erro: {error}</p>
    </div>
  );
}

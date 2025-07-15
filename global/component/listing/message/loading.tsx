import React from 'react';

interface LoadingMessageProps {
  message?: string;
}

export function LoadingMessage({ message = 'Carregando...' }: LoadingMessageProps) {
  return <div className="loading">{message}</div>;
}

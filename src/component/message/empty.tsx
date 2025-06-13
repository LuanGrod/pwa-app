import React from 'react';

interface EmptyMessageProps {
  message?: string;
}

export function EmptyMessage({ message = 'Nenhum registro encontrado' }: EmptyMessageProps) {
  return <div className="empty">{message}</div>;
}

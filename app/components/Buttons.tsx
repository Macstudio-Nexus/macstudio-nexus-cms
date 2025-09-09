'use client';

interface ButtonProps {
  label: string;
  handleClick?: () => void;
}

export function Primary({ label, handleClick}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="button button-primary"
    >
      {label}
    </button>
  );
}

export function Secondary({ label, handleClick }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="button button-secondary "
    >
      {label}
    </button>
  );
}
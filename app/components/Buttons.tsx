'use client';

interface ButtonProps {
  label: string;
  handleClick?: () => void;
  px?: number;
  py?: number;
  imageSrc?: string;
}

export function Primary({ label, handleClick, px, py, imageSrc }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="buttonPrimary py-1 px-2 text-sm"
    >
      {imageSrc && <img src={imageSrc} alt="button icon" className="mr-2" />}
      {label}
    </button>
  );
}

export function Secondary({ label, handleClick, px, py, imageSrc }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="buttonSecondary py-2 px-5"
    >
      {imageSrc && <img src={imageSrc} alt="button icon" className="mr-2" />}
      {label}
    </button>
  );
}

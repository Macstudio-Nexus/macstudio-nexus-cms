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
      className="buttonPrimary py-1 px-2 text-sm sm:text-lg md:text-2xl"
    >
      {imageSrc && <img src={imageSrc} alt={label} />}
      {label}
    </button>
  );
}

export function Secondary({ label, handleClick, px, py, imageSrc }: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="buttonSecondary py-2 px-5 text-sm sm:text-lg md:text-2xl"
    >
      {imageSrc && <img src={imageSrc} alt={label} />}
      {label}
    </button>
  );
}

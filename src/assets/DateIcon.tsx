'use client';

interface IDateIconType {
  onClick?: (event: React.MouseEvent) => void;
}

export default function DateIcon({ onClick }: IDateIconType) {
  return (
    <svg
      onClick={onClick}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9459 2H18.8378V1C18.8378 0.45 18.3392 0 17.7297 0C17.1203 0 16.6216 0.45 16.6216 1V2H5.54054V1C5.54054 0.45 5.04189 0 4.43243 0C3.82297 0 3.32432 0.45 3.32432 1V2H2.21622C0.997297 2 0 2.9 0 4V20C0 21.1 0.997297 22 2.21622 22H19.9459C21.1649 22 22.1622 21.1 22.1622 20V4C22.1622 2.9 21.1649 2 19.9459 2ZM18.8378 20H3.32432C2.71486 20 2.21622 19.55 2.21622 19V7H19.9459V19C19.9459 19.55 19.4473 20 18.8378 20Z"
        fill="#D1D1D1"
      />
    </svg>
  );
}

interface INavIconType {
  isNav: boolean;
  onClick?: () => void;
}

export default function PlanIcon({isNav, onClick} : INavIconType) {
  return (
    <svg onClick={onClick} width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 3.5C13.5 3.5 11.625 1 7.25 1C2.875 1 1 3.5 1 3.5V21C1 21 2.875 19.75 7.25 19.75C11.625 19.75 13.5 21 13.5 21M13.5 3.5V21M13.5 3.5C13.5 3.5 15.375 1 19.75 1C24.125 1 26 3.5 26 3.5V21C26 21 24.125 19.75 19.75 19.75C15.375 19.75 13.5 21 13.5 21" stroke={isNav ? "#FFBD2D" : "#FFE6AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
interface INavIconType {
  isNav: boolean;
  onClick?: () => void;
}

export default function ChatIcon({isNav, onClick} : INavIconType) {
  return (
    <svg onClick={onClick} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0.75C19.375 0.75 25 5.225 25 10.75C25 16.275 19.375 20.75 12.5 20.75C10.95 20.75 9.4625 20.525 8.0875 20.125C4.4375 23.25 0 23.25 0 23.25C2.9125 20.3375 3.375 18.375 3.4375 17.625C1.3125 15.8375 0 13.4125 0 10.75C0 5.225 5.625 0.75 12.5 0.75Z" fill={isNav ? "#FFBD2D" : "#FFE6AF"}/>
    </svg>
  )
}
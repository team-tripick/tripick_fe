import styled from '@emotion/styled';

interface IArrowType {
  isClick?: boolean;
}

export default function DropDownArrow({ isClick }: IArrowType) {
  return (
    <ImgContainer isClick={isClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9999 13.6501L16.8999 8.75006C17.0666 8.58339 17.2639 8.50273 17.4919 8.50806C17.7199 8.51339 17.917 8.59962 18.0833 8.76673C18.2495 8.93384 18.3328 9.13117 18.3333 9.35873C18.3337 9.58628 18.2504 9.78339 18.0833 9.95006L12.9499 15.0667C12.8166 15.2001 12.6666 15.3001 12.4999 15.3667C12.3332 15.4334 12.1666 15.4667 11.9999 15.4667C11.8332 15.4667 11.6666 15.4334 11.4999 15.3667C11.3332 15.3001 11.1832 15.2001 11.0499 15.0667L5.91658 9.93339C5.74992 9.76673 5.66925 9.57228 5.67458 9.35006C5.67992 9.12784 5.76614 8.93339 5.93325 8.76673C6.10036 8.60006 6.29769 8.51673 6.52525 8.51673C6.75281 8.51673 6.94992 8.60006 7.11658 8.76673L11.9999 13.6501Z"
          fill="#0F0F0F"
        />
      </svg>
    </ImgContainer>
  );
}

const ImgContainer = styled.div<Pick<IArrowType, 'isClick'>>`
  width: fit-content;
  height: 22px;
  transform: rotate(${({ isClick }) => (isClick ? '-180deg' : '0deg')});
  transition: 0.35s;
`;

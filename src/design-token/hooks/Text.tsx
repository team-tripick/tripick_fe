import { Property } from 'csstype';

interface ITextType {
  children?: React.ReactNode;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  position?: Property.Position;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isOverFlow?: boolean;
  width?: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  isSpan?: boolean;
  textAlign?: Property.TextAlign;
  isCursor?: boolean;
}

export const Text = ({
  onClick,
  children,
  fontSize = 16,
  fontWeight = 500,
  color = '#000000',
  position,
  isOverFlow,
  width = 'fit-content',
  top,
  left,
  right,
  bottom,
  textAlign,
  isSpan = false,
  isCursor,
}: ITextType) => {
  const style: React.CSSProperties = {
    width,
    color,
    fontSize,
    fontWeight,
    position,
    top,
    left,
    right,
    bottom,
    textOverflow: isOverFlow ? 'ellipsis' : 'clip',
    overflow: isOverFlow ? 'hidden' : undefined,
    whiteSpace: isOverFlow ? 'nowrap' : undefined,
    display: isSpan ? 'inline' : 'block',
    textAlign,
    cursor: isCursor ? 'pointer' : 'auto',
  };

  return (
    <div onClick={onClick} style={style}>
      {children}
    </div>
  );
};

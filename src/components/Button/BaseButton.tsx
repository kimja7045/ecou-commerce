interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: any;
}

const BaseButton = ({ onClick, children }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export default BaseButton;

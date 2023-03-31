interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: any;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;

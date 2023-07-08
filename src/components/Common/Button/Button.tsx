import {
  Button as MantineButton,
  MantineNumberSize,
  MantineSize,
} from '@mantine/core';
import { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: any;
  leftIcon?: ReactNode;
  style?: CSSProperties;
  radius?: MantineNumberSize;
  size?: MantineSize;
}

const Button = ({
  onClick,
  leftIcon,
  style,
  children,
  radius = 'xl',
  size = 'md',
}: ButtonProps) => {
  return (
    <MantineButton
      className="bg-black"
      onClick={onClick}
      leftIcon={leftIcon}
      style={style}
      radius={radius}
      size={size}
    >
      {children}
    </MantineButton>
  );
};

export default Button;

import { MouseEventHandler } from 'react'

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
  children: any
}

export default function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}

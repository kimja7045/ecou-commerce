import { MouseEventHandler } from 'react'

export default function Button({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  children: any
}) {
  return <button onClick={onClick}>{children}</button>
}

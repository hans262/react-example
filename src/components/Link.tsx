import { classNames } from "../common/classNames"
import { Link as LinkRouter } from 'react-router-dom'

export const Link: React.FC<{
  href: string
}> = ({ children, href }) => {
  return (
    <LinkRouter className={classNames(
      'border-2 text-black',
      'py-2 px-4 inline-block cursor-pointer rounded-md'
    )} to={href}>{children}</LinkRouter>
  )
}
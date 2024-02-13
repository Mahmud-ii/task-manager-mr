import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
// min-w-full
function Col({ children, className }: Props) {
  return (
    <div className={` p-5 ${className}`}>
      {children ? children : "This is a Row container. Must have children"}
    </div>
  );
}

export default Col;

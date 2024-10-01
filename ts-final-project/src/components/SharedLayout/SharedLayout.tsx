import css from "./SharedLayout.module.css"
import {ReactNode} from "react";

interface SharedLayoutProps {
  children: ReactNode;
}


const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return <div className={css.container}>{children} </div>
  
};

export default SharedLayout

import { MouseEventHandler } from "react";
import styles from "./Popout.module.css";

function Backdrop(props: { onClick: MouseEventHandler<HTMLDivElement> | undefined; }) {
  return <div className={styles.backdrop} onClick={props.onClick}/>;
}
export default Backdrop;

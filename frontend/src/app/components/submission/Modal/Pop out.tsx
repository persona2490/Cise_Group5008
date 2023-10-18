import { MouseEventHandler } from "react";
import Link from "next/link";
import styles from "./Popout.module.css";

function Popout(props: { onClick: MouseEventHandler<HTMLButtonElement> | undefined; }) {

  return (
    <div className={styles.modal}>
      <p>Submit Sucessfully</p>
      <img src="../../Assets/success.png" alt="Success" />
      <Link href="/" passHref>
        <button>Back to search</button>
      </Link>
      <button onClick={props.onClick}>Continue</button>
    </div>
  );
}

export default Popout;

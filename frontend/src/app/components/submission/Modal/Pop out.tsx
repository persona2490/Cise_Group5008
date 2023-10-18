import { MouseEventHandler } from "react";
import Link from "next/link";
import styles from "./Popout.module.css";

function Popout(props: { onClick: MouseEventHandler<HTMLButtonElement> | undefined; }) {

  const handleContinueClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    
    window.location.reload();
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <div className={styles.modal}>
      <p>Submit Successfully</p>

      <Link href="/" passHref>
        <button>Back to search</button>
      </Link>

      <button onClick={handleContinueClick}>Continue</button>
    </div>
  );
}

export default Popout;

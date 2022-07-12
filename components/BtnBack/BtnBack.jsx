import styles from "./BtnBack.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Btn from "../Btn/Btn";

const BtnBack = ({ children, ...props }) => {
  return (
    <Btn {...props} className={styles.btnBack}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>

      {children}
    </Btn>
  );
};

export default BtnBack;

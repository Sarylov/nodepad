import styles from "./Record.module.css";
import Link from "next/link";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

const Record = ({ props }) => {
  const { title, id } = { ...props };
  const date = moment(props.time).format("DD/MM/YY HH:mm");

  const star = () => {
    props.clickStar(id);
  };

  const trash = () => {
    props.clickTrash(id);
  };

  return (
    <div className={styles.record}>
      <Link href={`/records/[id]`} as={`/records/${id}`}>
        <a className={styles.link}>
          <span className={styles.title}>
            {title}
            <span className={styles.time}>{date}</span>
          </span>
        </a>
      </Link>
      <div className={styles.icons}>
        <span
          className={`${styles.star} ${props.favorites ? styles.active : ""}`}
          onClick={star}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span className={styles.trash} onClick={trash}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>
  );
};

export default Record;

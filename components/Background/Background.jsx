import styles from "./Background.module.css";
import Waves from "./Waves.svg";

const Background = () => {
  return (
    <div className={styles.background}>
      <div className={styles.bgHeader}>
        <div className={styles.innerBgHeader + " " + styles.flex}></div>
        <div>
          <Waves className={styles.waves} />
        </div>
      </div>
    </div>
  );
};

export default Background;

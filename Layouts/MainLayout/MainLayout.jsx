import Background from "../../components/Background/Background";
import BtnBack from "../../components/BtnBack/BtnBack";
import styles from "./MainLayout.module.css";
import { useRouter } from "next/router";

const MainLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className={styles.app}>
      <Background />
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default MainLayout;

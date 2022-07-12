import { useState } from "react";
import WrapperElements from "../WrapperElements/WrapperElements";

import styles from "./Info.module.css";

const Info = ({ children, duration = 1 }) => {
  const [display, setDisplay] = useState("block");
  setTimeout(() => {
    setDisplay("none");
  }, (duration + 1) * 1000);

  return (
    <div className={styles.info + " info"}>
      <WrapperElements padding={1.5}>{children}</WrapperElements>

      <style jsx>{`
        .info {
          animation-name: ${styles.attenuation};
          animation-duration: ${duration}s;
          animation-fill-mode: forwards;
          display: ${display};
        }
      `}</style>
    </div>
  );
};

export default Info;

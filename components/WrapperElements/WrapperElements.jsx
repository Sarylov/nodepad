import styles from "./WrapperElements.module.css";

const WrapperElements = ({ children, wight = 1000, height, padding = 3 }) => {
  return (
    <div className={styles.flex}>
      <div
        style={{
          maxWidth: `${wight}px`,
          height: `${height ? height + "vh" : "auto"}`,
          padding: `${padding}rem`,
        }}
        className={styles.wrapper}
      >
        {children}
      </div>
    </div>
  );
};

export default WrapperElements;

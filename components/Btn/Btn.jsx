import styles from "./Btn.module.css";

const Btn = ({
  children,
  click,
  color = "white",
  disabled = "",
  colorHover = "gray",
  background = "rgba(255, 255, 255, 0)",
}) => {
  color = disabled == "" ? color : "gray";

  return (
    <>
      <button
        disabled={disabled}
        className={styles.btn + " " + "color"}
        onClick={click}
      >
        {children}
      </button>
      <style jsx>{`
        .color {
          border: 1px solid ${color};
          color: ${color};
          background-color: ${background};
        }

        .color:hover {
          background-color: ${color};
          color: ${colorHover};
        }
      `}</style>
    </>
  );
};

export default Btn;

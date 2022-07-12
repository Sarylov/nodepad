import styles from "./ContentWrapper.module.css";
import WrapperElements from "../../components/WrapperElements/WrapperElements";
import Btn from "../../components/Btn/Btn";

const ContentWrapper = ({
  children,
  btnDisabled = "",
  btnName = "кнопка",
  btnColor = "#178CBE",
  ...props
}) => {
  return (
    <>
      <WrapperElements {...props}>
        <div className={styles.content}>{children}</div>
        <div className={styles.btnWrapper}>
          <Btn
            disabled={btnDisabled}
            color={btnColor}
            colorHover={"white"}
            background={"white"}
            {...props}
          >
            {btnName}
          </Btn>
        </div>
      </WrapperElements>
    </>
  );
};

export default ContentWrapper;

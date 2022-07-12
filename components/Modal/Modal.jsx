import Btn from "../Btn/Btn";
import styles from "./Modal.module.css";

const Modal = ({ props }) => {
  const {
    show,
    message = "сообщение",
    setIsShowModal,
    yesColor = "#178CBE",
    noColor = "red",
    modalProps = {},
    clickYes,
    clickNo,
  } = props;

  const no = () => {
    props.clickNo() && props.clickNo();
    setIsShowModal(false);
  };

  const yes = () => {
    props.clickYes && props.clickYes({ ...modalProps });
    setIsShowModal(false);
  };

  const drowModal = () => {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <p>{message}</p>
          <div className={styles.btns}>
            <Btn click={yes} color={yesColor} colorHover={"white"}>
              да
            </Btn>
            <Btn click={no} color={noColor} colorHover={"white"}>
              нет
            </Btn>
          </div>
        </div>
      </div>
    );
  };

  return <>{show && drowModal()}</>;
};

export default Modal;

import { useState } from "react";
import styles from "./WriteRecord.module.css";
import TextareaAutosize from "react-textarea-autosize";
import moment from "moment";

const WriteRecord = ({ props }) => {
  const time = moment(props.time).format("DD/MM/YY HH:mm");
  const now = moment().format("DD/MM/YY HH:mm");

  return (
    <>
      <span className={styles.time}>
        {props.time ? `последнее редактирование: ${time}` : `${now}`}
      </span>
      <input
        title="нажмите чтобы редактировать"
        onChange={(e) => {
          props.setTitle(e.target.value);
          if (!props.isEdited) props.setIsEdited(true);
        }}
        className={styles.title}
        type="text"
        value={props.title}
        maxLength="50"
      />
      <TextareaAutosize
        autoFocus
        title="нажмите чтобы редактировать"
        onChange={(e) => {
          props.setText(e.target.value);
          if (!props.isEdited) props.setIsEdited(true);
        }}
        className={styles.text}
        value={props.text}
      />
    </>
  );
};

export default WriteRecord;

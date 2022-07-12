import axios from "axios";

import BtnBack from "../components/BtnBack/BtnBack";
import Modal from "../components/Modal/Modal";

import ContentWrapper from "../Layouts/ContentWrapper/ContentWrapper";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import WriteRecord from "../Layouts/WriteRecord/WriteRecord";

import { useRouter } from "next/router";
import { useState } from "react";

export default function NewRecord() {
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState("Введите заголовок");
  const [text, setText] = useState("Введите текст");
  const [isShowModal, setIsShowModal] = useState(false);
  const router = useRouter();

  const back = () => {
    if (isEdited) setIsShowModal(true);
    else router.push("/");
  };

  const modalClickYes = async () => {
    await despatchAddRecord();
    router.push("/");
  };

  const modalClickNo = () => {
    router.push("/");
  };

  const despatchAddRecord = async () => {
    await axios
      .post(`${process.env.API_ROUTE}/records/`, {
        text: text,
        title: title,
        favorites: false,
      })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const clickAdd = () => {
    despatchAddRecord();
  };

  return (
    <MainLayout>
      <div style={{ paddingTop: "2rem" }}>
        <BtnBack click={back}>назад</BtnBack>
      </div>

      <Modal
        props={{
          show: isShowModal,
          clickYes: modalClickYes,
          clickNo: modalClickNo,
          setIsShowModal,
          message: "Добавть запись ?",
        }}
      />

      <div className="app">
        <ContentWrapper
          btnDisabled={isEdited ? "" : "disabled"}
          btnName="добавить"
          click={clickAdd}
          btnColor={"#178CBE"}
          height={70}
        >
          <WriteRecord
            props={{
              setIsEdited,
              isEdited,
              title,
              setTitle,
              text,
              setText,
            }}
          />
        </ContentWrapper>
      </div>
    </MainLayout>
  );
}

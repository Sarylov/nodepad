import axios from "axios";

import BtnBack from "../../components/BtnBack/BtnBack";
import Modal from "../../components/Modal/Modal";

import ContentWrapper from "../../Layouts/ContentWrapper/ContentWrapper";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import WriteRecord from "../../Layouts/WriteRecord/WriteRecord";

import { useRouter } from "next/router";
import { useState } from "react";
import Info from "../../components/Info/Info";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Record({ record }) {
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(record.title);
  const [text, setText] = useState(record.text);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const router = useRouter();

  // работает при нажатии на кнопку назад в левом верхнем углу
  const back = () => {
    if (isEdited) setIsShowModal(true);
    else router.push("/");
  };

  // сохраниться перед выходом
  const modalClickYes = async () => {
    await despatchSaveUpdate(record.id);
    router.push("/");
  };
  // не сохраниться перед выходом
  const modalClickNo = () => {
    router.push("/");
  };
  // работает при нажатии на кнопку сохранить
  const clickSave = () => {
    setIsEdited(false);
    despatchSaveUpdate(record.id);
    setIsShowInfo(true);
    setTimeout(() => {
      setIsShowInfo(false);
    }, 5000);
  };

  // запускает асинхронный запрос для сохранения изменений
  const despatchSaveUpdate = async (id) => {
    await axios
      .post(`${process.env.API_ROUTE}/records/${id}`, {
        text: text,
        title: title,
        favorites: record.favorites,
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <MainLayout>
      {isShowInfo && <Info duration={3}>изменения сохранены 💿</Info>}

      <div style={{ paddingTop: "2rem" }}>
        <BtnBack click={back}>назад</BtnBack>
      </div>
      <Modal
        props={{
          show: isShowModal,
          clickYes: modalClickYes,
          clickNo: modalClickNo,
          setIsShowModal,
          message: "сохранить изменения ?",
        }}
      />

      <div className="app">
        <ContentWrapper
          btnDisabled={isEdited ? "" : "disabled"}
          btnName="сохранить"
          click={clickSave}
          btnColor={"#178CBE"}
          height={70}
        >
          <WriteRecord
            props={{
              ...record,
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.API_ROUTE}/records/${ctx.query.id}`);
  const record = await res.json();
  return {
    props: { record },
  };
}

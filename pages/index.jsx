import styles from "../styles/Home.module.css";

import Record from "../components/Record/Record";
import Modal from "../components/Modal/Modal";
import Btn from "../components/Btn/Btn";
import Info from "../components/Info/Info";

import MainLayout from "../Layouts/MainLayout/MainLayout";
import Search from "../Layouts/Search/Search";
import ContentWrapper from "../Layouts/ContentWrapper/ContentWrapper";

import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import moment from "moment";
import { useEffect } from "react";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Home({ records }) {
  const [favoritesArr, setFavoritesArr] = useState([...records[0]]);
  const [others, setOthers] = useState([...records[1]]);

  let allRecords = [...favoritesArr, ...others]; // массив для вывода

  const [searchArr, setSearchArr] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [modalProps, setModalProps] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowBtnBack, setIsShowBtnBack] = useState(false);
  const [searchText, setSearchText] = useState([""]);
  const [walcomeMessage, setWalcomeMessage] = useState(null);

  const router = useRouter();

  // взависимости от времени формирует приветствующее сообщение
  const createWalcomeMessage = () => {
    const now = moment().format("YYYY-MM-DDTHH:mm:ssZ");
    let res = "";
    if (!localStorage.getItem("lastSession"))
      res = "приветсвую! Можешь записывать и хранить все что угодно 😁";
    else {
      let lastSession = moment(localStorage.getItem("lastSession")).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      let duration = moment(now).diff(lastSession, "hours");
      if (duration > 4 && duration < 6) res = goodTimeDay();
      else if (duration > 6) res = "с возвращением 😊!";
    }
    localStorage.setItem("lastSession", now);
    return res;
  };

  useEffect(() => {
    setWalcomeMessage(createWalcomeMessage());
  }, []);

  // возвращает пожелание доброго дня/утра/вечера/ночи
  const goodTimeDay = () => {
    let now = Number(moment().format("HH"));
    let res = "доброе утро 🌞!";

    if (now > 12 && now < 18) res = "добрый день 😃!";
    else if (now < 21) res = "добрый вечер 🌛!";
    else if (now < 24 || now < 4) res = "не спиться 😴?";

    return res;
  };

  // рисует records массива
  const drowListJsx = (arr) => {
    let res = [
      <p style={{ textAlign: "center" }}>
        {isSearch
          ? "нет ни одного совпадения"
          : "здесь будут отображаться ваши записи"}
      </p>,
    ];
    if (arr[0]) {
      res = [];
      arr.forEach((record) => {
        res.push(
          <Record
            key={record.id}
            props={{
              ...record,
              clickTrash,
              clickStar,
            }}
          />
        );
      });
    }
    return res;
  };

  // изменение стейта при нажатии на поиск
  const btnFind = () => {
    let text = searchText[0].toLowerCase();
    let records = [...favoritesArr, ...others];
    let newSearchArr = [];
    records.forEach((record) => {
      let title = record.title.toLowerCase();
      if (title.indexOf(text) != -1) newSearchArr.push(record);
    });
    setIsSearch(true);
    setSearchArr(newSearchArr);
    setIsShowBtnBack(true);
  };
  // вернуть стейт в прежнее состояние после поиска
  const clickBack = () => {
    setSearchText([""]);
    setIsShowBtnBack(false);
    setIsSearch(false);
  };

  // запускает асинхронный запрос для обновления favorites БД
  const despatchFavorites = async (id, favorites) => {
    // запускает асинхронный запрос для обновления в БД
    await axios
      .post(`${process.env.API_ROUTE}/records/favorites/${id}`, {
        favorites: favorites,
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // запускает асинхронный запрос для удаления с БД
  const despatchDelete = async (id) => {
    await axios
      .delete(`${process.env.API_ROUTE}/records`, { data: { id } })
      .catch((e) => {
        console.log(e);
      });
  };

  // нажатие на мусорку
  const clickTrash = (id) => {
    setIsShowModal(true);
    setModalProps({ id });
  };
  // при нажатии на звездочку
  const clickStar = (id) => {
    let favorites =
      favoritesArr.findIndex((el) => el.id === id) != -1 ? false : true;
    toggleFavorites(id);
    despatchFavorites(id, favorites);
  };

  // при нажатии на yes в модальном окне
  const modalClick = ({ id }) => {
    despatchDelete(id);
    if (favoritesArr.findIndex((el) => el.id === id) != -1) {
      let index = favoritesArr.findIndex((el) => el.id === id);
      deleteElByState(setFavoritesArr, index);
    } else {
      let index = others.findIndex((el) => el.id === id);
      deleteElByState(setOthers, index);
    }
  };

  // меняет favoritesArr и others чтобы изменить allRecords
  const toggleFavorites = (id) => {
    if (favoritesArr.findIndex((el) => el.id === id) != -1) {
      let index = favoritesArr.findIndex((el) => el.id === id);
      setOthers(() => {
        let newEl = favoritesArr[index];
        newEl.favorites = false;
        let res = sortByDate([...others, newEl]);
        return res;
      });
      deleteElByState(setFavoritesArr, index);
    } else {
      let index = others.findIndex((el) => el.id === id);
      setFavoritesArr(() => {
        let newEl = others[index];
        newEl.favorites = true;
        let res = sortByDate([...favoritesArr, newEl]);
        return res;
      });
      deleteElByState(setOthers, index);
    }
  };

  // удаляет из хука элемент
  const deleteElByState = (setF, index) => {
    setF((prev) => {
      let res = [...prev];
      res.splice(index, 1);
      return res;
    });
  };

  // сортирует по времени от большего к меньшему
  const sortByDate = (arr) => {
    let res = [...arr];
    res.sort((a, b) => {
      let dateA = new Date(a.time);
      let dateB = new Date(b.time);
      return dateB - dateA;
    });
    return res;
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <MainLayout>
      <div className="app">
        <div className={styles.searchWrapper}>
          <Search props={{ searchText, setSearchText, btnFind }} />
        </div>

        {walcomeMessage && (
          <Info duration={3}>
            <p>{walcomeMessage}</p>
          </Info>
        )}

        <Modal
          props={{
            show: isShowModal,
            message: "удалить элемент ? ",
            setIsShowModal,
            modalProps,
            clickYes: modalClick,
          }}
        />
        <ContentWrapper
          padding={2}
          wight={700}
          click={() => {
            router.push("./newRecord");
          }}
          btnName="добавить"
          btnColor="#178CBE"
          height={65}
        >
          {/* отображения всех элементах при поиске */}
          {isShowBtnBack && (
            <Btn color="#178CBE" click={clickBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Btn>
          )}

          {/* выводим массив allRecords */}
          {drowListJsx(isSearch ? searchArr : allRecords)}
        </ContentWrapper>
      </div>
    </MainLayout>
  );
}

// получаем все записи с БД
export async function getStaticProps({ req }) {
  const res = await fetch(`${process.env.API_ROUTE}/records`);
  const records = await res.json();
  return {
    props: { records },
  };
}

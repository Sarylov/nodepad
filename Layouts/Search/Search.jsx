import { useState } from "react";
import Btn from "../../components/Btn/Btn";
import ContentWrapper from "../../components/WrapperElements/WrapperElements";
import Input from "../../components/Input/Input";
import styles from "./Search.module.css";
// для работы данного комопнента необходимы компоненты: WrapperElements, Inputs, Btn

const Search = ({ props }) => {
  return (
    <ContentWrapper wight={700} height={0} padding={1}>
      <div className={styles.searchWrapper}>
        <div className={styles.flexItem + " " + styles.item1}>
          <Input
            inputs={["введите запрос"]}
            state={props.searchText}
            setState={props.setSearchText}
          />
        </div>
        <div className={styles.flexItem + " " + styles.item2}>
          <Btn click={props.btnFind} color="#188CBE">
            поиск
          </Btn>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Search;

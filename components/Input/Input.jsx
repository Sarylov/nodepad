import styles from "./Input.module.css";
// inputs - массив названий input`ов, по умолчанию уходит в placeholder, можно настройть чтобы были в label
// state - массив данных которые отображаються в input`ах,
// setState - collback функция, нужена чтобы менять данные, находящиеся в input`ах
// создаеться: const[state, setState] = useState(new Array(inputs.length).fill("")); на уровень выше

const Form = ({ inputs, state, setState }) => {
  return (
    <div className={styles.form}>
      {inputs.map((inputName, index) => {
        return (
          <label key={index}>
            {/* {inputName} */}
            <input
              onChange={(e) => {
                setState((prevState) => {
                  let res = [...prevState];
                  res[index] = e.target.value;
                  return res;
                });
              }}
              value={state[index]}
              type="text"
              placeholder={inputName}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Form;

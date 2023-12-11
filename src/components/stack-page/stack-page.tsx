import React from "react";
import style from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../classes/Stack";

export const StackPage: React.FC = () => {

  type TResult = {
    value: string;
    state: ElementStates;
  };

  const [isValidAdd, setIsValidAdd] = React.useState(false);
  const [isValidRemove, setIsValidRemove] = React.useState(false);
  const [isValidClear, setIsValidClear] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [result, setResult] = React.useState(new Stack<TResult>());
  const [resultArr, setResultArr] = React.useState<TResult[]>([]);

  const maxLength = 4;

  React.useEffect(() => {
    if(resultArr.length > 0) {
      setIsValidRemove(true);
      setIsValidClear(true);
    } else {
      setIsValidRemove(false);
      setIsValidClear(false);
    }
  },[resultArr.length]);

  function delay(time: number = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const curLength = e.target.value.length;
    setInputValue(e.target.value);
    if (curLength > 0 && curLength <= maxLength) {
      setIsValidAdd(true);
    } else {
      setIsValidAdd(false);
    }
  }

  async function handleAdd() {
    setInputValue('');
    setIsValidAdd(false);
    result.push({
      value: inputValue,
      state: ElementStates.Default
    });

    const coloredArr = result.getValues();

    coloredArr[coloredArr.length - 1].state = ElementStates.Changing;
    setResultArr([...coloredArr]);
    await delay(500);  

    coloredArr[coloredArr.length - 1].state = ElementStates.Default;
    setResultArr([...coloredArr]);
  }

  function handleRemove() {
    result.pop();
    setResultArr([...result.getValues()]);
  }

  function handleClear() {
    setResult(new Stack<TResult>());
    setResultArr([]);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={`${style.form}`} onSubmit={e => e.preventDefault()}>
        <fieldset className={`${style.leftSide}`}>
          <Input 
            onChange={handleInput}
            isLimitText={true}
            maxLength={maxLength}
            extraClass={`${style.input}`}
            value={inputValue}
          />
          <Button
            name="add"
            type="button"
            text="Добавить"
            onClick={handleAdd}
            disabled={!isValidAdd}
          />
          <Button
            name="remove"
            type="button"
            text="Удалить"
            onClick={handleRemove}
            disabled={!isValidRemove}
          />
        </fieldset>
        <Button
          name="clear"
          type="button"
          text="Очистить"
          onClick={handleClear}
          disabled={!isValidClear}
        />
      </form>
      <div className={`${style.board}`}>
        {
          resultArr.map((item, index) => {
            return <Circle 
              head={index === resultArr.length - 1 ? "top" : null}
              index={index}
              key={index}
              letter={item.value}
              state={item.state}
            />
          })
        }
      </div>
    </SolutionLayout>
  );
};

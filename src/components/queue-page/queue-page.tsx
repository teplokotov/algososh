import React from "react";
import style from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "../../classes/Queue";

export const QueuePage: React.FC = () => {
  
  type TResult = {
    value: string;
    state: ElementStates;
  };

  const queueLength = 7;
  const maxLength = 4;
  const startArr: TResult[] = [...new Array(queueLength)].map(item => {
    return {
      value: '',
      state: ElementStates.Default
    }
  })

  const [isValidAdd, setIsValidAdd] = React.useState(false);
  const [isValidRemove, setIsValidRemove] = React.useState(false);
  const [isValidClear, setIsValidClear] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [result, setResult] = React.useState(new Queue<TResult>(queueLength));
  const [resultArr, setResultArr] = React.useState<TResult[]>(startArr);

  React.useEffect(() => {
    if(!result.isEmpty()) {
      setIsValidRemove(true);
      setIsValidClear(true);
    } else {
      setIsValidRemove(false);
      result.getHead() > 0 ? setIsValidClear(true) : setIsValidClear(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[result.isEmpty(), result.getHead()]);

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

  function getFilledArray() {
    return [...result.getValues()].map(item => {
      return item ? item : {
        value: '',
        state: ElementStates.Default
      }
    })
  }

  async function handleAdd() {

    if(result.getTail() >= queueLength) return 0;

    setInputValue('');
    setIsValidAdd(false);

    let coloredArr = getFilledArray();

    coloredArr[result.getTail()].state = ElementStates.Changing;
    setResultArr([...coloredArr]);
    await delay(500);     

    result.enqueue({
      value: inputValue,
      state: ElementStates.Default
    });

    coloredArr = getFilledArray();

    coloredArr[result.getTail() - 1].state = ElementStates.Default;
    setResultArr([...coloredArr]);
  }

  async function handleRemove() {

    if(result.getHead() >= queueLength || result.isEmpty()) return 0;

    let coloredArr = getFilledArray();

    coloredArr[result.getHead()].state = ElementStates.Changing;
    setResultArr([...coloredArr]);
    await delay(500);   

    result.dequeue();

    coloredArr = getFilledArray();

    coloredArr[result.getTail() - 1].state = ElementStates.Default;
    setResultArr([...coloredArr]);
  }

  function handleClear() {
    setResult(new Queue<TResult>(queueLength));
    setResultArr(startArr);
  }

  return (
    <SolutionLayout title="Очередь">
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
              head={
                (index === result.getHead() && result.getTail() !== 0) || 
                (result.isEmpty() && index === queueLength - 1 && index === result.getTail() - 1)
                 ? "head" : null
              }
              tail={index === result.getTail() - 1 && !result.isEmpty() ? "tail" : null}
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

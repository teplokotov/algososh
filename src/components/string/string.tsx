import React from "react";
import style from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {

  type TResult = {
    value: string;
    state: ElementStates;
  };
  
  const [isValid, setIsValid] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [result, setResult] = React.useState<TResult[]>([]);
  const maxLength = 11;

  function delay(time: number = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const curLength = e.target.value.length;
    if (curLength > 0 && curLength <= maxLength) {
      setIsValid(true);
      setInputValue(e.target.value);
    } else {
      setIsValid(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reverse(inputValue);
  }

  async function reverse(stringValue: string) {
    const arr = stringValue.split('');
    const coloredArr: TResult[] = arr.map(item => {
      return {
        value: item,
        state: ElementStates.Default
      }
    });
    setResult(coloredArr);
    setIsValid(false);
    await delay(1000);

    let i = 0;
    let middle = Math.floor(arr.length / 2);

    while(i <= middle) {

      if(arr.length % 2 === 0 && i === middle) break;

      coloredArr[i].state = ElementStates.Changing;
      coloredArr[coloredArr.length - 1 - i].state = ElementStates.Changing;
      setResult([...coloredArr]);   // set result as new array for updating component by useState hook
      await delay(1000);            // https://learn.javascript.ru/async-await#await

      const temp = coloredArr[i];
      coloredArr[i] = coloredArr[coloredArr.length - 1 - i];
      coloredArr[coloredArr.length - 1 - i] = temp;

      coloredArr[i].state = ElementStates.Modified;
      coloredArr[coloredArr.length - 1 - i].state = ElementStates.Modified;
      setResult([...coloredArr]);
      await delay(1000);  

      i++;       
    }

    setIsValid(true);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={`${style.form}`} onSubmit={handleSubmit}>
        <Input 
          onChange={handleInput}
          isLimitText={true}
          maxLength={maxLength}
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={false}
          disabled={!isValid}
        />
      </form>
      <div className={`${style.board}`}>
        {
          result.map((item, index) => {
            return <Circle 
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

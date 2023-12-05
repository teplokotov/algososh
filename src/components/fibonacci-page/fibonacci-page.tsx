import React from "react";
import style from "./fibonacci-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: React.FC = () => {

  const minNumber = 1;
  const maxNumber = 19;

  const [isValid, setIsValid] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<number>(minNumber);
  const [result, setResult] = React.useState<number[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);

  function delay(time: number = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const curValue = Number(e.target.value);
    if (curValue >= minNumber && curValue <= maxNumber) {
      setIsValid(true);
      setInputValue(Number(e.target.value));
    } else {
      setIsValid(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fibIterative(inputValue);
  }

  async function fibIterative(val: number) {

    setIsValid(false);
    setIsLoader(true);

    const arr: number[] = [];
    let resultArr: number[] = [];

    for (let i = 0; i <= val + 1; i++){

      if(i < 2) {
        arr.push(i);
      } else {
        arr.push(arr[i - 2] + arr[i - 1]);
      }

      if (i !== 0) {
        resultArr = [...arr];
        resultArr.shift();
      }
      
      setResult([...resultArr]);
      await delay(500);

    }

    setIsValid(true);
    setIsLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${style.form}`} onSubmit={handleSubmit}>
        <Input 
          placeholder="Введите число"
          type="number"
          onChange={handleInput}
          isLimitText={true}
          min={minNumber}
          max={maxNumber}
          disabled={!isValid && isLoader}
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={isLoader}
          disabled={!isValid}
        />
      </form>
      <div className={`${style.board}`}>
        {
          result.map((item, index) => {
            return <Circle 
              key={index}
              letter={String(item)}
              state={ElementStates.Default}
              tail={String(index)}
            />
          })
        }
      </div>
    </SolutionLayout>
  );
};

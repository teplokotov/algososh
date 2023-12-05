import React from "react";
import style from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {

  type TResult = {
    value: number;
    state: ElementStates;
  };

  const [isValid, setIsValid] = React.useState(true);
  const [result, setResult] = React.useState<TResult[]>(getRandomArr());
  const [isLoaderASC, setIsLoaderASC] = React.useState(false);
  const [isLoaderDESC, setIsLoaderDESC] = React.useState(false);

  function delay(time: number = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function getRandomArr(): TResult[] {
    const result: TResult[] = [];
    const min = 3;
    const max = 17;
    const maxLength = Math.floor(Math.random() * (max - min)) + min;
    for (let i = 0; i < maxLength; i++) {
      result.push(
        {
          value: Math.floor(Math.random() * 100),
          state: ElementStates.Default
        }
      );
    }
    return result;
  }

  function swap(arr: TResult[], firstIndex: number, secondIndex: number): void {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  async function selectionSort(arr: TResult[], type: 'asc' | 'desc') {
    
    arr.forEach(item => item.state = ElementStates.Default);
    setResult([...arr]);

    setIsValid(false);
    if(type === 'asc') setIsLoaderASC(true);
    if(type === 'desc') setIsLoaderDESC(true);

    for (let i = 0; i <= arr.length - 1; i++) {
      let maxInd = i;
      
      for(let j = i + 1; j < arr.length; j++) {

        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setResult([...arr]);
        await delay(500);
        arr[j].state = ElementStates.Default;
        setResult([...arr]);

        if(type === 'asc' && arr[j].value < arr[maxInd].value) maxInd = j;
        if(type === 'desc' && arr[j].value > arr[maxInd].value) maxInd = j;

      }
      swap(arr, i , maxInd);

      arr[maxInd].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setResult([...arr]);
    }

    if(type === 'asc') setIsLoaderASC(false);
    if(type === 'desc') setIsLoaderDESC(false);
    setIsValid(true);
  }

  async function bubbleSort(arr: TResult[], type: 'asc' | 'desc') {

    arr.forEach(item => item.state = ElementStates.Default);
    setResult([...arr]);

    setIsValid(false);
    if(type === 'asc') setIsLoaderASC(true);
    if(type === 'desc') setIsLoaderDESC(true);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {

        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setResult([...arr]);
        await delay(500);

        if((type === 'asc' && arr[j].value > arr[j + 1].value) || 
           (type === 'desc' && arr[j].value < arr[j + 1].value)) {
          swap(arr, j, j + 1);
        }

        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setResult([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }

    if(type === 'asc') setIsLoaderASC(false);
    if(type === 'desc') setIsLoaderDESC(false);
    setIsValid(true);
  }
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const typeOfBtn = document.activeElement?.getAttribute('name');
    const typeOfSort = (document.querySelector('input[name="typeOfSort"]:checked') as HTMLInputElement).value;
    
    switch (typeOfBtn) {
      case 'newArr':
        setResult(getRandomArr());
        break;
      case 'asc':
        if(typeOfSort === 'Selection') selectionSort(result, 'asc');
        if(typeOfSort === 'Bubble') bubbleSort(result, 'asc');
        break;
      case 'desc':
        if(typeOfSort === 'Selection') selectionSort(result, 'desc');
        if(typeOfSort === 'Bubble') bubbleSort(result, 'desc');
        break;
      default:
        break;
    }

  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${style.form}`} onSubmit={handleSubmit}>
        <fieldset className={`${style.radioBtns}`}>
          <RadioInput 
            name="typeOfSort"
            label="Выбор"
            value="Selection"
            defaultChecked={true}
            disabled={!isValid}
          />
          <RadioInput
            name="typeOfSort"
            label="Пузырёк"
            value="Bubble"
            disabled={!isValid}
          />
        </fieldset>
        <fieldset className={`${style.sortBtns}`}>
          <Button
            name="asc"
            type="submit"
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoaderASC}
            disabled={!isValid}
            extraClass={`${style.btn}`}
          />
          <Button
            name="desc"
            type="submit"
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={isLoaderDESC}
            disabled={!isValid}
            extraClass={`${style.btn}`}
          />
        </fieldset>
        <Button
          name="newArr"
          type="submit"
          text="Новый массив"
          isLoader={false}
          disabled={!isValid}
          extraClass={`${style.btn}`}
        />
      </form>
      <div className={`${style.board}`}>
        {
          result.map((item, index) => {
            return <Column 
              key={index}
              index={item.value}
              state={item.state}
            />
          })
        }
      </div>
    </SolutionLayout>
  );
};

import { sleep } from './sleep.ts'

export async function useSelectionSort(array: number[]) {
    console.log(array);
    let temp: number
    
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            
            if (array[j] <= array[i]) {
                await sleep(1)
                temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
        }
    }
    
    console.log(array);
    return array
}
import { sleep } from './sleep.ts'

export async function useQuickSort(array: number[], sortedArray: number[]): Promise<number[]> {
    await quickSort(array, 0, array.length - 1, sortedArray);
    return sortedArray;
}

async function quickSort(array: number[], low: number, high: number, sortedArray: number[]): Promise<void> {
    if (low < high) {
        const pivotIndex = await partition(array, low, high, sortedArray);

        await Promise.all([
            quickSort(array, low, pivotIndex - 1, sortedArray),
            quickSort(array, pivotIndex + 1, high, sortedArray)
        ]);
    }
}

async function partition(array: number[], low: number, high: number, sortedArray: number[]): Promise<number> {
    const pivot = array[high];
    let i = low;
    
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            await swap(array, i, j, sortedArray);
            i++;
        }
    }

    await swap(array, i, high, sortedArray);
    return i;
}

async function swap(array: number[], i: number, j: number, sortedArray: number[]): Promise<void> {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    // Update the sortedArray for visualization
    sortedArray.push(...array);
    await sleep(5)
}

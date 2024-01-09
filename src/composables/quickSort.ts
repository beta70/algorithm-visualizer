import { sleep } from './sleep.ts'

export async function useQuickSort(array: number[]): Promise<void> {
    await quickSort(array, 0, array.length - 1);
}

async function quickSort(array: number[], low: number, high: number): Promise<void> {
    if (low < high) {
        const pivotIndex = await partition(array, low, high);

        await Promise.all([
            quickSort(array, low, pivotIndex - 1),
            quickSort(array, pivotIndex + 1, high)
        ])
    }
}

async function partition(array: number[], low: number, high: number): Promise<number> {
    const pivot = array[high];
    let pivotIndex = low

    for (let i = low; i < high; i++) {
        if (array[i] < pivot) {
            await swap(array,i,pivotIndex)

            pivotIndex++        
        }
    }

    await swap(array,pivotIndex,high)
    return pivotIndex;
}

async function swap(array: number[], i: number, j: number): Promise<void> {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    await sleep(5);
}

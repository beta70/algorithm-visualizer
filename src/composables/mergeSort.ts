import { sleep } from './sleep.ts'

export async function useMergeSort(array: number[]): Promise<void> {
    await mergeSort(array);
}

async function mergeSort(array: number[], start = 0, end = array.length - 1) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);

        await mergeSort(array, start, mid);
        await mergeSort(array, mid + 1, end);
        
        await merge(array, start, mid, end);
    }
}

async function merge(arr: number[], start: number, mid: number, end: number) {
    const leftSize = mid - start + 1;
    const rightSize = end - mid;

    const leftArray = new Array(leftSize);
    const rightArray = new Array(rightSize);

    for (let i = 0; i < leftSize; i++) {
        leftArray[i] = arr[start + i];
    }

    for (let j = 0; j < rightSize; j++) {
        rightArray[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = start;

    while (i < leftSize && j < rightSize) {
        await sleep(5)
        
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < leftSize) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < rightSize) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }

    
}

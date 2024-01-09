<template>
    <div class="flex flex-col gap-12 p-6 mx-auto sm:p-8 lg:p-20 max-w-9xl">
        <div class="grid grid-cols-12 gap-4 lg:gap-12">
            <div class="flex flex-col col-span-12 gap-12">
                <div class="relative grid grid-cols-2 gap-2 transition-all duration-300 border-8 rounded-lg border-ttt-lilac form__panel">
                    <div class="absolute z-10 px-2 -translate-y-1/2 -top-1 left-8 bg-darker-blue">
                        <h2 class="text-lg font-bold lowercase text-papaya">Settings</h2>
                        
                    </div>

                    <select v-model="selectedOption">
                        <option 
                            v-for="algorithm in algorithms"
                            :value="algorithm.name"
                        >
                            {{ algorithm.title }}
                        </option>
                    </select>

                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 lg:gap-12">
            <div class="col-span-12">
                <div class="relative grid grid-cols-2 transition-all duration-300 border-8 rounded-lg border-ttt-violet form__panel">
                    <div class="absolute z-10 px-2 -translate-y-1/2 -top-1 left-8 bg-darker-blue">
                        <h2 class="text-lg font-bold lowercase text-papaya">Visualization</h2>
                    </div>
                    <div class="flex col-span-2 p-6 lg:p-8">
                        <div 
                            ref="barWrapper"
                            class="flex items-end w-full gap-[2px]"
                        >
                            <div 
                                v-for="(num,index) in numArray"
                                :key="index"
                                :class="[
                                    'bg-white w-[2px] h-20',
                                ]"
                                :style="`height: ${num}px;`"
                            >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 lg:gap-12">
            <div class="flex flex-col col-span-12 gap-12">
                <div class="relative grid grid-cols-2 gap-2 transition-all duration-300 border-8 rounded-lg border-ttt-violet form__panel">
                    <div class="absolute z-10 px-2 -translate-y-1/2 -top-1 left-8 bg-darker-blue">
                        <h2 class="text-lg font-bold lowercase text-papaya">Options</h2>
                        
                    </div>

                    <div class="col-span-2 p-6 lg:p-8">
                        {{ getCurrentAlgorithm }}
                        <button 
                            type="button" 
                            @click="getCurrentAlgorithm.fn()"
                            class="flex items-center justify-between gap-4 text-lg font-medium underline transition-all duration-300 text-ttt-perlwinkle"
                        >
                            <span>run algorithm</span>
                            <div class="w-6 h-6 text-ttt-perlwinkle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path fill="currentColor" d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm0-80h560L520-492v-268h-80v268L200-200Zm280-280Z"/>
                                </svg>
                            </div>
                        </button>
                        <button 
                            type="button" 
                            @click="randomizeArray"
                            class="flex items-center justify-between gap-4 text-lg font-medium underline transition-all duration-300 text-ttt-perlwinkle"
                        >
                            <span>randomize</span>
                            <div class="w-6 h-6 text-ttt-perlwinkle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path fill="currentColor" d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm0-80h560L520-492v-268h-80v268L200-200Zm280-280Z"/>
                                </svg>
                            </div>
                        </button>
                        <div class="col-span-2 mt-12 text-white">
                            <div v-if="sortInProgress">Algorithm running...</div>
                            <div v-if="arrayIsSorted">Array is sorted!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useElementSize } from '@vueuse/core'
import { AlgorithmObject } from '../types/algorithmObject.ts'
import { useSelectionSort } from '../composables/selectionSort.ts'
import { useQuickSort } from '../composables/quickSort.ts'
import { useMergeSort } from '../composables/mergeSort.ts'


const maxBarHeight = ref<number>(500)
const barWrapper = ref(null)
const { width } = useElementSize(barWrapper)
const numArrayLength = ref(0)
const numArray = ref<number[]>([]);
const sortInProgress = ref<boolean>(false);
const arrayIsSorted = ref<boolean>(false)
const selectedOption = ref<string>('selectionSort')
const getCurrentAlgorithm = computed(() => algorithms.value.filter(a => a.name === selectedOption.value)[0])

const algorithms = ref<AlgorithmObject[]>([
    {
        title: 'Selection sort',
        name: 'selectionSort',
        type: 'sorting',
        fn: () => runAlgorithm(useSelectionSort)
    },   
    {
        title: 'Quicksort',
        name: 'quickSort',
        type: 'sorting',
        fn: () => runAlgorithm(useQuickSort)
    },
    {
        title: 'Mergesort',
        name: 'mergeSort',
        type: 'sorting',
        fn: () => runAlgorithm(useMergeSort)
    }
]);


async function runAlgorithm(fn: Function) {
    console.log(fn,'runAlgorithm');
    if (arrayIsSorted.value || sortInProgress.value) return
            
    sortInProgress.value = true
    await fn(numArray.value)
    sortInProgress.value = false
    arrayIsSorted.value = true
}

function randomizeArray() {
    sortInProgress.value = false
    arrayIsSorted.value = false
    
    numArray.value = Array.from({ length: numArrayLength.value / 4 }, () => Math.floor(Math.random() * maxBarHeight.value));
}

watchEffect(() => {
    numArrayLength.value = width.value
    numArray.value = Array.from({ length: numArrayLength.value / 4 }, () => Math.floor(Math.random() * maxBarHeight.value));
});




</script>

<style scoped>

    opton:disabled {
        color: red!important;
    }

</style>
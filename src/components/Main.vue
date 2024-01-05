<template>
    <div class="flex flex-col gap-12 p-6 mx-auto sm:p-8 lg:p-20 max-w-9xl">
        <div class="grid grid-cols-12 gap-4 lg:gap-12">
            <div class="col-span-12">
                <div class="relative grid grid-cols-2 transition-all duration-300 border-8 rounded-lg border-ttt-lilac form__panel">
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
                        <h2 class="text-lg font-bold lowercase text-papaya">Values</h2>
                        
                    </div>

                    <div class="col-span-2 p-6 text-white lg:p-8">
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
                        <button 
                            type="button" 
                            @click="algorithms[0].fn(numArray)"
                            class="flex items-center justify-between gap-4 text-lg font-medium underline transition-all duration-300 text-ttt-perlwinkle"
                        >
                            <span>run algorithm</span>
                            <div class="w-6 h-6 text-ttt-perlwinkle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path fill="currentColor" d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm0-80h560L520-492v-268h-80v268L200-200Zm280-280Z"/>
                                </svg>
                            </div>
                        </button>
                        <!-- <button 
                            type="button" 
                            @click="algorithms[0].fn(0, numArray.length - 1)"
                            class="flex items-center justify-between gap-4 text-lg font-medium underline transition-all duration-300 text-ttt-perlwinkle"
                        >
                            <span>run algorithm</span>
                            <div class="w-6 h-6 text-ttt-perlwinkle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path fill="currentColor" d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm0-80h560L520-492v-268h-80v268L200-200Zm280-280Z"/>
                                </svg>
                            </div>
                        </button> -->
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


const maxBarHeight = ref<number>(500)
const barWrapper = ref(null)
const { width } = useElementSize(barWrapper)
const getNumArrayLength = computed(() => width.value)

const numArray = ref<number[]>([]);
const sortedNumArray = computed(() => [...numArray.value]);

const quickSortedArray = ref<number[]>([]);
// const sortInProgress = ref<boolean>(false);

watchEffect(() => {
  numArray.value = Array.from({ length: getNumArrayLength.value / 4 }, () => Math.floor(Math.random() * maxBarHeight.value));
});

const algorithms = ref<AlgorithmObject[]>([
    {
        name: 'selectionSort',
        type: 'sorting',
        fn: useSelectionSort
    },   
    {
        name: 'quickSort',
        type: 'sorting',
        fn: async () => {
            await useQuickSort(numArray.value, quickSortedArray.value);
    }
}
]);




</script>
import { Algorithm } from './algorithm.ts'

export interface AlgorithmObject {
    title: string,
    name: string,
    type: Algorithm,
    fn: Function
}

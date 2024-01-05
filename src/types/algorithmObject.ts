import { Algorithm } from './algorithm.ts'

export interface AlgorithmObject {
    name: string,
    type: Algorithm,
    fn: Function
}

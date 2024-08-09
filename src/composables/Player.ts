import type { Imouse } from '@/types/interfaces';
import {reactive, ref} from 'vue';


const condition = ref<string>('');
const totalMouseDistance = reactive<Imouse>({
    x:0, y:0
})

export function Player () {



    return {
        condition,
        totalMouseDistance
    }
}
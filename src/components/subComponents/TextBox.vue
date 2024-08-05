<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { dispachTimeForVictory, maxError } from '@/configVariables';
import gsap from 'gsap';
import { useRouter} from 'vue-router';
import type {Router} from 'vue-router';
//noterete un settimeout differente rispetto a quello degli altri dispacher, questo perchè la nuova view verrà caricata (onMounted) dopo 5 sec, quindi non avrebbe mai intercettato i dispacher da 1 sec, per qeusto ho inserito 6 sec, ovvero: tempo per il caricamento nuova view + 1 sec (valore standard scelto da me per il passaggio disparcher).

const spanWords = ref<HTMLElement[] | null> (null); // ref necessario per far funzionare l'animazion , targhetta i span.

const word = ref<string>(""); //carica la parola dalla chiamata axios.
const wordArray = ref<string[]>([]); // carica l'array di char della parola word.

const indexCounter = ref<number[]>([]); //tiene traccia della posizione (index) delle lettere svelate con successo da wordArray.
const prevIndexCounter = ref<number[]>([]); //necessario per tenere traccia di chi NON deve lampeggiare

const error = ref<boolean>(false); //booleano per attivare l'invio dell'errore al componente.
const errorCount = ref<number>(0); //contatore di errori, necessario per far triggerare la condizione di fine gioco, sconfitta.

const highConsecutiveWordScore = ref<number>(0); //contatore di quante lettere consecutive sono state trovate.
const provisoryConsecutiveWordScore = ref<number>(0);  // contatore per confrontare con la variabile HightConsecutiveWordScore, in caso la supera quest'ultima variabile verrà aggiornata con i lvalore del provisoryConsecutiveWordScore

const endGameCounter= ref<number>(0); // se questo valore è identico alla wordArray allora significa che la parola è stata svelata e si può procedere con la condizione di vittoria.

const router:Router = useRouter();

const props = defineProps({
    lang:{
        type: String ,
        required: true,
        validator: value => value !== "" 
    },
    playerWord:{
        type: String,
    }
})

const animateSpan = (index: number):void => {
    if (!spanWords.value) return;
  const spanElement = spanWords.value[index];
    gsap.timeline()
      .fromTo(spanElement,
        { opacity: 0, rotationY: 0 },
        { opacity: 1, rotationY: 360, duration: 0.5, ease: "power1.inOut" }
      )
      .set(spanElement, { borderColor: "#ffd700" }) //valore hex preso da $hoverTextColor in _variables scss
      .to(spanElement,
        { opacity: 0, 
          duration: 1, 
          ease: "power1.inOut",
          repeat: 2, 
          yoyo: true, 
          onComplete: () => {
          gsap.to(spanElement, { 
            opacity: 1,
            borderColor: '#d3d3d3'  //valore hex preso da $primaryTextColor in _variables scss
            });
            } 
        }
    );
};

const wordCheck= ():number[]=> {
    if(props.playerWord ==="" || props.playerWord === null || props.playerWord === " " ) return [];
    let indexArray:number[]=[];

    //vi lascio 2 metodi che ho trovato per controllare le lettere:
    /* for (let i = 0; i < wordArray.value.length; i++) {
        if (wordArray.value[i] === props.playerWord) indexArray= [...indexArray,i];
    } */

    //versione alternativa array.protopype.reduce (ove array.prototype = l'array su cui vogliamo lavorare). è una versione molto potente (e personalmente la ritengo fichissima) di un ciclo for , adatta quando bisogna  eseguire operazioni di accumulo (es. fare la somma degli elementi). acc sta per l'accumulatore, necessario per tenere traccia dell'operazione che stiamo eseguendo su ogni elemento. Current sarebbe l'elemento corrente ed ovviamente index è l'indice. .reduce fa una sorta di "foreach" nel senso che itera su ogni elemento dell'array.
    indexArray= wordArray.value.reduce<number[]>((acc,current,index)=> {
        if(current === props.playerWord) 
            acc.push(index);
        return acc; //vitale per far toranre l'accumultore per il prossimo elemento ,senza di esso non terrebbe traccia dell'avanzare dell'accumulo.
    },[])

    return indexArray;
}


const callWord = async ():Promise<void>=>{
    const baseUrl:string =`/api/word?lang=${props.lang}`
    try {
        const response = await axios.get<string>(baseUrl);
        word.value= response.data[0].toLowerCase().trim();
        wordArray.value=word.value.split("");
        highConsecutiveWordScore.value = wordArray.value.length; //imposto il valore delle lettere consecutive al massimo possibile, cosi che, se l'utente non sbaglia mai avrà questo valore come risultato.
    } catch(error){
        console.log("Warning error detected:", error)
        setTimeout(() => {
           router.push({name:'home'}) //rimanda automaticamente alla Home in caso di errore del get..
        }, 1000);
    }
}

watch(() => indexCounter.value, (newIndexCounter, oldIndexCounter) => {
  // Aggiorna gli span per quelli che ora sono svelati e non erano svelati in precedenza
  const prevIndex:number[] = oldIndexCounter ?? []
  const newlyRevealed:number[] = newIndexCounter.filter(index => !prevIndex.includes(index));
  newlyRevealed.forEach(index => {
    if (spanWords.value && spanWords.value[index])
        animateSpan(index);
  });
  prevIndexCounter.value = prevIndex;
}, { immediate: true });


watch(()=>props.playerWord,(element)=>{
    let wordCheckLength:number = wordCheck().length; //richiedo la length dell'output della funzione.
    //se è 0 significa che non è stata trovata nessuna lettera dall'utente.
    if(wordCheckLength === 0) { 
        generateError();
        updateConsecutiveWord();
        getScore(-100,wordArray.value.length);
        error.value=false;
        checkEndGame();
        return;
    }
    //Altrimenti, significa che length non è 0 quindi ha trovato qualcosa ed inizio la sequenza di aggiornamento delle meccaniche del gioco..
    endGameCounter.value+=wordCheckLength;
    provisoryConsecutiveWordScore.value++;
    getScore(80,wordArray.value.length,wordCheckLength);
    indexCounter.value=[...indexCounter.value,...wordCheck()]; 
    checkEndGame();  
})

const sendSummaryWord = ():void => {
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('sendSummaryWord', {
        detail: { word: word.value },
        bubbles: true 
        }));
    }, dispachTimeForVictory);
}

const sendSummaryConsecutiveWord = ():void => {
    setTimeout(() => {
            console.log("che schifo", highConsecutiveWordScore.value)
            document.dispatchEvent(new CustomEvent('sendSummaryConsecutiveWord', {
            detail: { consecutiveWord: highConsecutiveWordScore.value },
            bubbles: true 
            }));
        }, dispachTimeForVictory);
}

const getScore= (score:number,wordLength:number,moltiplierWord:number=1):void => {
    //La formula è creata tenendo in considerazione che più la parola è lunga più la difficoltà è alta, quinndi un bonus moltiplicatore. Un altro moltiplicatore è dato da quante lettere ha indovinato, ovviamente più lettere si indovinano con una sola scelta maggior punti vanno dati. Quest'ultima è impostata come parametro opzionale in modo che nel momento in cui si va in errore il moltiplicatore è x1 . math.max serve a garantire che se uscisse una parola lunga meno di 3 caratteri (molto improbabile ma non posso escluderlo) allora il moltiplicatore sia 1.
    let totalScore:number =  Math.round((score * moltiplierWord) * Math.max(1,wordLength / 3));
    document.dispatchEvent(new CustomEvent('score', {
    detail: { score: totalScore },
    bubbles: true 
  }));
    
}

const generateError = ():void => {
    error.value=true;
    errorCount.value++;
    document.dispatchEvent(new CustomEvent('doError', {
    detail: { error: error },
    bubbles: true 
  }));
}

const checkEndGame = ():void => {
    if (wordArray.value.length == endGameCounter.value || errorCount.value == maxError ) {
            sendSummaryWord(); 
            sendSummaryConsecutiveWord();
            if(wordArray.value.length == endGameCounter.value){
                document.dispatchEvent(new CustomEvent('endGameCondition', {
                detail: { condition: "victory" },
                bubbles: true 
                }));
            }
    }
}

const updateConsecutiveWord = ():void => {
    //questa condizione è necessaria altrimenti non potrà mai calcolare la quantità di  lettere consecutive indovinate i nquanto di base il contatore è settato pari alal length della parola, in modo far si che se l'utente non sbagli mai possa aver il giusto risultato. 
    if (highConsecutiveWordScore.value == wordArray.value.length)  
        highConsecutiveWordScore.value = 0;

    if (provisoryConsecutiveWordScore.value > highConsecutiveWordScore.value) 
        highConsecutiveWordScore.value = provisoryConsecutiveWordScore.value;

    provisoryConsecutiveWordScore.value=0;
}

onMounted(()=> {
    callWord();
    //scommentare (ricorda di scommentare anche lang sulla gameview) se il server dove facciamo la request non funziona!
    /* word.value = "grandetest"
    wordArray.value=word.value.split("");
    highConsecutiveWordScore.value = wordArray.value.length;
    */
})



</script>

<template>
    <!-- <p>La parola è : {{ word }} avente {{ indexCounter }}</p> -->
    <div class="container">
        <div>
            <ul>
                <li v-for="(slot,index) in word.split('')" :key="slot" >
                    <span ref="spanWords" :class="{
                        'spanBorder': true,
                        'hidden': slot === ' '
                    }">
                    {{ indexCounter.includes(index) ? slot : '_' }}
                    </span>
                <!--  <span v-if="slot !=' ' && !indexCounter.includes(index)" class="border">_</span>
                    <span v-else-if="slot ===' '"> </span>
                    <span v-else class="border"> {{ slot }} </span> -->
                </li>
            </ul>
        </div>
    </div>

</template>

<style scoped lang="scss">
@use '../../assets/style/mixin' as mix;
@use '../../assets/style/variable' as var;


ul {
    @include mix.displayFlex();
    gap: 1em;
    li span{
        padding: 0.5em 0.5em 0.2em;
        font-weight: bold;
        font-size: 24px;
        border-radius: 10px;
        transition: transform 0.5s ease;
        transition: border-color 0.5s ease;
        &.hidden{
            opacity: 0;
        }
    }
}

.spanBorder{
    border: 2px solid var.$primaryTextColor;
}
</style>
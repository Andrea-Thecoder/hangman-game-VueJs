import {ref} from 'vue';
//simil al static di java, ovvero crea una singletorn quindi questo valore sarà sempre lo stesso ap rescindere da quante volte viene creata un istanza di questo composable.

const errorCount = ref<number>(0); //tracker degli errori
const consecutiveWordScore = ref<number>(0); //tracker delle parole consecutive indovinate.
const totalScore= ref<number>(0); //tracker dei punti totali
const summaryWord = ref<string>(""); //tracker per la parola da mostrare in caso di sconfitta
const countTimer = ref<number>(0); // tracker del tempo trascorso, in secondi!
const starterCountTimer = ref<boolean>(false); //tracker per far partire e fermare il counter

export function SendParameter() {
    
    const incrementError = ():void => {
        errorCount.value++;
    }

    const resetError=():void => {
        errorCount.value = 0;
    }

    const updateConsecutiveWord = (provisory:number,maxScore?:number):number => {

    //la prima condizione serve, dopo il primo errore , a resettare il contatore, i nquanto di base ad esso è associato il valore massimo ovvero la length della parola. Questo controllo non deve essere eseguito durante la fase di checkendgame in quanto potrebbe succedere che l'utente non abbia mai sbagliato, e cosi facendo ritornerà il giusto risultato.
    if(maxScore){
        if (consecutiveWordScore.value === maxScore)  
            consecutiveWordScore.value = 0;
    }

    if (provisory > consecutiveWordScore.value) 
        consecutiveWordScore.value = provisory;

    return 0; // a prescindere da quello che accade nelle condizioni, return 0 in quanto deve resettare il contatore delle parole consecutive temporaneo.
    }

    const resetScore= ():void => {
        totalScore.value = 0;
    }

    const setScore = (scorePoint:number,wordLength:number,moltiplierWord:number=1):void => {
        //La formula è creata tenendo in considerazione che più la parola è lunga più la difficoltà è alta, quinndi un bonus moltiplicatore. Un altro moltiplicatore è dato da quante lettere ha indovinato, ovviamente più lettere si indovinano con una sola scelta maggior punti vanno dati. Quest'ultima è impostata come parametro opzionale in modo che nel momento in cui si va in errore il moltiplicatore è x1 . math.max serve a garantire che se uscisse una parola lunga meno di 3 caratteri (molto improbabile ma non posso escluderlo) allora il moltiplicatore sia 1.
        let sumScore:number =  Math.round((scorePoint * moltiplierWord) * Math.max(1,wordLength / 3));
        totalScore.value += sumScore;
    }

    const goTimer = ():void =>{
        countTimer.value ++;
    }
    
    const trasformTimer=():string => {
        let minutes:number,seconds:number;
        minutes = Math.floor(countTimer.value / 60);
        seconds = countTimer.value % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return {
        errorCount,
        consecutiveWordScore,
        totalScore,
        summaryWord,
        countTimer,
        starterCountTimer,
        incrementError,
        resetError,
        updateConsecutiveWord,
        setScore,
        resetScore,
        goTimer,
        trasformTimer
      };
}



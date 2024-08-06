//regex necessarie per controllare se si è tornati alla home, alla game oppure alla schermata di summary. Le ho inserite come generiche dentro il file src perchè le utilizzo in diversi componenti.

export const regexReset:RegExp = new RegExp( "^\/$|^\/game(?:\/[^\/]*)?$");
export const regexSummary:RegExp = new RegExp("^\/summary(?:\/[^\/]*)?$");
export const maxError:number = 6;

export const dispachTimeBase:number = 1000;
export const dispachTimeForVictory:number = dispachTimeBase + 5000;

export const writerTimer: number = 70;
//regex necessarie per controllare se si è tornati alla home, alla game oppure alla schermata di summary. Le ho inserite come generiche dentro il file src perchè le utilizzo in diversi componenti.
export const regexReset = new RegExp("^\/$|^\/game(?:\/[^\/]*)?$");
export const regexSummary = new RegExp("^\/summary(?:\/[^\/]*)?$");
export const maxError = 6;
export const dispachTimeBase = 1000;
export const dispachTimeForVictory = dispachTimeBase + 5000;

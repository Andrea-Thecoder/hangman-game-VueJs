import { ref } from 'vue';
import { writerTimer } from '@/configVariables';
export function dynamicText() {
  const displayText = ref<string>('');
  const endLoading = ref<boolean>(false);

 const updateText = (textValue:string, counter:number) => {
    if (textValue.length > counter) {
      setTimeout(() => {
        displayText.value += textValue[counter];
        if (textValue[counter] =="," || 
            (textValue[counter] =="." && textValue[counter+1] !=".")
           ) {
           displayText.value += "<br> <br>";}
        counter++;
        updateText(textValue, counter);
      }, writerTimer);
    } else {
        endLoading.value = true;
    }
  };

  const generateText = (textValue:string) => {
    if(!textValue){return;}
    let counter = 0;
    displayText.value = ''; // Reset del displayText per riutilizzi.
    endLoading.value = false; // Reset di endLoading per riutilizzi.
    updateText(textValue, counter);
  };

  return {
    displayText,
    endLoading,
    generateText
  };
}
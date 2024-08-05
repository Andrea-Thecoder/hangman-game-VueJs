<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Keyboard from 'simple-keyboard';
import type { KeyboardButtonTheme } from'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

const inputValue = ref<string>('');

const disabledKeys = ref<Set<string>>(new Set());

const emit = defineEmits<{
    (e:'inputValue', payload:{inputWord: string}): void
}>();


let keyboard: Keyboard;

const onChange = (input: string):void => {
    if (inputValue.value.length >= 1) return ; //blocchiamo ad 1 carattere alla volta la possibile scelta!
    inputValue.value = input;
};

const onKeyPress = (button: string):void => {
  if (button === "{shift}" || button === "{lock}") handleShift();
  if (button === "{enter}") handleEnter();
  if (button === "{bksp}") handleBackspace();
};

const handleShift = ():void => {
  const currentLayout:string = keyboard.options.layoutName ?? "default"; //operatore coalescenza nulla ?? serve in caso l'assegnazione produca un null/undefined allora gli assegna un valore predefinito, in questo modo sarà sempre di tipo string.
  keyboard.setOptions({
    layoutName: currentLayout === "default" ? "shift" : "default"
  });
};

const handleEnter = ():void => {
    if(inputValue.value.length === 0) return; //impossibilità di inviare un char vuoto.
    //console.log('Enter attivo', inputValue.value);
    emit('inputValue', {inputWord: inputValue.value});
    if (!disabledKeys.value.has(inputValue.value)) {
          disabledKeys.value.add(inputValue.value);
      }
      keyboard.setOptions({
          buttonTheme: getButtonTheme()
      });
    inputValue.value ='';
    keyboard.setInput('');
};

const handleBackspace = ():void => {
    keyboard.setInput('');
    inputValue.value = ""; 
};

const getButtonTheme = ():KeyboardButtonTheme[] => {
    const buttonTheme:KeyboardButtonTheme[] = [];
    disabledKeys.value.forEach((key) => {
        buttonTheme.push({
            class: "hg-button-disabled",
            buttons: key
        });
    });
    return buttonTheme;
};

onMounted(() => {
  keyboard = new Keyboard(".simple-keyboard-container", {
    onChange: onChange,
    onKeyPress: onKeyPress,
    layout: {
      default: [
        "1 2 3 4 5 6 7 8 9 0 {bksp}",
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{shift} z x c v b n m {enter}",
      ],
      shift: [
        "à á â ã ä å æ ç è é {bksp}",
        "ê ë ì í î ï ð ñ ò ó",
        "ô õ ö ø ù ú û ü ý þ ÿ",
        "{shift} à è ì ò ù é â ê î ô û {enter}",
      ]
    },
    display: {
      '{bksp}': 'Backspace',
      '{enter}': 'Enter',
      '{shift}': 'Shift',
    },
    buttonTheme: getButtonTheme()
  });

  
});

onBeforeUnmount(() => {
  if (keyboard) {
    keyboard.destroy();
  }
});
</script>


<template>
    <div class="container pb-2 pt-2 customWidth">
        <div class="container custom" >
            <input v-model="inputValue" type="text" readonly @keydown.prevent />
        </div>
      <div class="simple-keyboard-container"></div>
    </div>
</template>
  

<style scoped lang="scss">
@use '../../assets/style/variable' as var;
@use '../../assets/style/mixin' as mix;


.custom {
    @include mix.displayFlex();
    margin: 0.7em 0;
}

.customWidth{
  width: 600px;
}

input {
  width: 8%;
  background-color: transparent;
  color: var.$primaryTextColor;
  text-align: center;
  pointer-events: none;
}

</style>
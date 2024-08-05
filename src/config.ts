const config = {
    development: {
      apiUrl: 'http://localhost:5173/api',
      baseUrl: '/'
    },
    production: {
      apiUrl: 'https://random-word-api.herokuapp.com',
      baseUrl: '/hangman-game-VueJs/'
    }
  };
  
  const env = import.meta.env.MODE || 'development'; // Usa `development` come predefinito
  export default config[env];
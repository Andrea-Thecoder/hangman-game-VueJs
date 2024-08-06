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

  type ConfigKeys = keyof typeof config;
  
  const env = import.meta.env.MODE  as ConfigKeys || 'development';
  export default config[env];
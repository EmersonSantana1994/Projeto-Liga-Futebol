// pergunta.js
const readline = require('readline');

// Cria uma interface para ler o input do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question(nome){}

// Faz a primeira pergunta
rl.question('Qual é o seu nome? ', (nome) => {
  // Faz a segunda pergunta
  rl.question('Quantos anos você tem? ', (idade) => {
    // Exibe as respostas
    console.log(`Olá, ${nome}! Você tem ${idade} anos.`);

    // Fecha a interface após a resposta
    rl.close();
  });
});
# UberHack2019
Projeto criado pelo time 6 do UberHack Recife 2019.

O projeto consiste de 3 vertentes:
    - Aplicativo POC construído em Vuejs
    - Conexão IoT contruída utilizando um node mcu
    - backend serverless utilizando dynamodb, aws lambda e nodejs

## Vuejs
Para rodar o projeto primeiro instale as dependências com o comando:
`npm install`
Logo em seguida rode o comando `npm run serve`

Na UI foi utilizado o Vuetify.js, para utilizar o padrão material design.

## NodeMCU
Módulo responsável por representar o sistema do carro de trava e controle. Conecta com a cloud para travar e destravar o carro e outras frentes.

## Backend 
Desenvolvido no ambiente da AWS, utilizando a arquitetura serverless e node.js como linguagem principal se conecta com o nosso banco NoSQL, onde registra usuários e carros. 


### Recursos extras
 API Google Maps - https://developers.google.com/maps/documentation/?hl=pt
 QRCode - https://github.com/gruhn/vue-qrcode-reader
 
 
 

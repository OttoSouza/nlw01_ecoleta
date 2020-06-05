# Ecoleta
![](https://i.ibb.co/B4VVk82/Capa.png)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Sobre
  - Projeto NLW da RocketSeat! 
  - Utilizando 
    - Node, 
    - TypeScript
    - ReactJs 
    - React-Native
  
- Um simulador de coleta de resíduos com diversos assuntos incriveis:
    - Buscar por Geolocalização
    - Validações
    - Upload de Imagens

- TanTo o back , front e mobile foram desenvolvidos em __TypeScript__.

# Antes de Começar

  - Instale na sua maquina o yarn ou npm para copilar os projetos.
  - Em seguida execute o camando __'yarn install'__  ou __'npm install'__, para instalar as dependências

# Node 
- O projeto backend encontra-se na pasta __server__.
- Toda api foi desenvovida para Web quanto para Mobile.
- Frameworks
    - Validações - celebrate
    - upload - multer
    - knex e sqlite - conexão e gerenciamento do banco
    
-Além disso utilizando TypeScript que é uma ferramenta que adiciona tipagem estática ao JS. 

# ReactJs
- O projeto react encontra-se na pasta __frontend__.
- Teve como finalidade ensinar um pouco de cada como consumir uma api ate enviar dados para o memso.
- Criaçao de Tela Cadastro com finalidade: 
    - Criar um ponto de coleta.
    - Selecionar o local pelo mapa.
    - Selecionar os items.
    - Fazer o upload da imagem do local.

- Utilizando as funcinalidades mais recentes do React.
- Frameworkes
    - Axios - Cliente HTTP
    - React Router Dom - Gerenciamento de Rotas
    - Leaflet - Biblioteca Js de código aberto para Mapa
    - React Icons 
    - React Dropzone - upload de imagens

# React Native
- O projeto react encontra-se na pasta __mobile__.
- Teve como finalidade mostrar um pouco de como funcina o react-native da melhor maneira possível.
- Criação de três telas
    - Para informar Estado e cidade
    - Mostrar no mapa os locais que tem pontos de coletas cadastrados, podendo selecionar os items do ponto.
    - Mostrar as informações individuais de cada local, podendo: 
        -Enviar E-mail
        -Enviar Whatsapp

- Frameworks
    - Axios - Cliente HTTP
    - React Navigation  - Gerenciamento de Rotas
    - React Native Maps - Gerenciamento de Mapa
    - Expo Mail Composer - E-mail
    - Expo - Criarção do Projeto

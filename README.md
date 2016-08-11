# LEIAME #

Camada de visão da aplicação Agente da Sorte.

## Sobre o projeto ##

* 0.0.1-SNAPSHOT
* [http://localhost:8080](http://localhost:8080)

## Configurações ##
* Ionic
	- npm install -g ionic@beta
* Cordova
	- npm install -g cordova
* Angular 2 Highcharts
	- npm i angular2-highcharts --save
* Typings
    - npm install -g typings
* Lodash
	- npm install lodash
* PouchDB - 5.4.5
    - npm install --save pouchdb
    - typings search pouchdb
        - Exemplo: typings install source~name --global --save
    - typings install dt~pouchdb/pouch --global --save
    - Abrir o arquivo: agente-da-sorte/typings/main.d.ts
    - Colar o código:
    > declare module 'pouchdb' {
        var PouchDB: any;
        export default PouchDB;
        }
    - Como importar:
    - import * as PouchDB from 'pouchdb';
    - console.log("Hey look, I've got PouchDB:", PouchDB);
* Plataforma Android
    - ionic platform add android

## Comandos úteis ##

* ionic start exemplo tutorial --ts --v2
* ionic start exemplo blank --ts --v2
* ionic start exemplo --ts --v2
* ionic g page exemplo-pagina
* ionic g provider exemplo-dao
* ionic serve
* ionic serve --port=numero-porta
* ionic info

## IDE VS Code ##

* html:5 + TAB
* script:src + TAB
* Identação automática Ctrl+Shift+f
* Comentário Ctrl+;
* Intalação de plugins Ctrl+p > digitar Install
# WeDecode-backend-test
Desafio de programação para RecrutamentoCada da empresa WeDdecode.
#### Desafio Back-end - Sistema de Controle de Filmes
O objetivo é fazer o back-end de um sistema que controla filmes e quais pessoas já os
assistiram. Não é preciso fazer o front, seu sistema pode ser acessado diretamente por uma
API, vou usar o Postman para testar.
Como é só um exercício também não é necessária autenticação/autorização.
# Requisitos:
- [x] O back-end deve ser programado obrigatoriamente em Node.js ou .NetCore.
- [x] Deve ser usado algum ORM para mapear o banco de dados no código.
## Casos de Uso:
- [x] Deve ser possível inserir novos filmes;
- [x] Deve ser possível ler a lista de filmes cadastrados;
- [x] Deve ser possível inserir novos espectadores;

- [x] Deve ser possível ler a lista de espectadores cadastrados;
- [x] Deve ser possível marcar que um espectador viu um filme;
- [x] Deve ser possível ver quantos filmes cada espectador viu;
- [x] Deve ser possível ver quantos espectadores um filme teve.
## Pontos Extras:
- [x] Se você publicou o código em algum servidor que eu possa acessar diretamente;
- [x] Se o seu código está bem estruturado e comentado;
- [x] Se você escrever uma explicação simples de como a API deve ser acessada;
- [x] Se você me der acesso “somente leitura” ao seu banco de dados para eu verificar
como ficou.

# Techonologias usadas no projeto:
####    ● Node.js &nbsp; &nbsp;  ● TypeScript
# Metodologias usadas no projeto:
####    ● TDD &nbsp; &nbsp; ● SOLID  &nbsp; &nbsp; ● RESFULL
# Design Patterns
Singleton &nbsp; &nbsp;
Factory &nbsp; &nbsp;
Helper &nbsp; &nbsp;
decorator &nbsp; &nbsp;
builder &nbsp; &nbsp;
composite &nbsp; &nbsp;

# API  
### INSERIR UM FILME  


```javascript
método: POST
uri: "/api/films"
body: {   
    "title": "Título do filme",
    "author": "Nome do author do filme",
    "director": "Node do diretor do filme"
}
```
  
  
### VER A LISTA DE FILMES CADASTRADOS
```javascript
método: GET 
uri: "/api/films"
```


### VER A LISTA DE ESPECTADORES QUE UM FILME TEM JUNTO COM A QUANTIDADE DISTINTA
```javascript
método: GET 
uri: "/api/films/:film-id" 
```

### INSERIR UM NOVO ESPECTADOR
```javascript
método: POST 
uri: "/api/spectators"
{   
    "name": "Nome do espectador"
}
```


### VER A LISTA DE ESPECTADORES CADASTRADOS
```javascript
método: GET 
uri: "/api/spectators"
```

### MARCAR UM FILME COMO ASSISTIDO
```javascript
método: POST 
uri: "/api/spectators/:spectator-id"
body: {
  filmId: 'id do filme que deseja adicionar'
}
```

### VER QUANTOS E QUAIS FILMES UM ESPECTADOR ASSISTIU
```javascript
método: GET 
uri: "/api/spectators/films/{spectator-id}"
```

### VER QUANTOS ESPECTADORES UM FILME TEVE E QUAIS SAO ELES
```javascript
método: GET 
uri: "/api/films/audience/{film-id}"
```

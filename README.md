# puc-minas-node-05
Exercicio da puc minas materia node js exercicio 05

#### Configurar/Rodar localmente:

Com o nest cli já configurado seguir os seguintes passos:

1. Subir container do redis:
   	- nerdctl compose -f docker-compose.yml up -d
   	- nerdctl ps
   	- nerdctl exec -it <idcontainer> redis-cli
   	- com o redis-cli aberto: " KEYS * " para ver o cache salvo
1. Abrir cmd dentro da pasta raiz:
	- Rodar comando: `npm run start:dev`
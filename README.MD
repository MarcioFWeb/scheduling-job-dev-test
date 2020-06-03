# Identification / Identificação

**Routine / Rotina:** Scheduling Job  
**Version / Versão:** 0.0.1  
**Status:** Story released
**Epic / Épico:** Job Utilities  
**Story / Estória:** As a Job Administrator, I need to organize a list of jobs in order to group them for execution within a time limit of 8 hours.  
**Squad:** Digital Innovation  
**Author / Autor:** Marcio A. O. Figueiredo <marciofweb@gmail.com> | [About me](https://www.linkedin.com/in/marciofigueiredoweb/)  
**Creation / Criação:** 2020-05-28  
**Last Change / Útima alteração:** 2020-06-03  

# Instructions / Instruções

Instructions for using the routine and running the tests. / Instruções para utilização da rotina e para rodar os testes:  

## Requirements:
- **Git installed** on your operating system so you can clone the repository.
- **Optionally** you can **download the repository** directly here from Github as a compressed file and unzip into a folder of your choice.
- **Node.js installed** on your operating system. [Download](https://nodejs.org/en/download/) | [Install](https://nodejs.org/en/download/package-manager/)
- After the node is downloaded and installed (or if you already have it), enter the application folder and run the command:
```
npm install
```

## Requisitos:
- **Git instalado** em seu sistema operacional para pode clonar o repositório.
- **Opcionalmente** você pode **baixar o repositório** diretamente aqui do Github como arquivo compactado e descompactar em uma pasta de sua escolha.
- **Node.js instalado** em seu sistema operacional. [Baixar](https://nodejs.org/en/download/) | [Instalar](https://nodejs.org/en/download/package-manager/)
- Depois do node baixado e instalado (ou caso você já o possua), entrar na pasta da aplicação e rodar o comando:
```
npm install
```

## How to run / Como executar
* To execute / Para executar:
```
npm start
```
> The results will be presented at CONSOLE. / Os resultados serão apresentados no CONSOLE.

* To run the tests / Para rodar os testes:
```
npm run test
```
> The results will be presented at CONSOLE. / Os resultados serão apresentados no CONSOLE.

## Expected input data format / Formato esperado dos dados de entrada
### Input data location / Localização dos dados de entrada
The input content for processing (list of jobs to group within a time limit) must be informed in the file ***job-descriptions.js*** which in turn is inside the folder ***in***.

O conteúdo de entrada para o processamento (lista de jobs para agrupar dentro de limite de tempo) deve ser informado no arquivo ***job-descriptions.js*** que por sua vez está dentro da pasta ***in***.
```
~project folder~/in/job-descriptions.js
```

### Format / Formato
```json
[
	{
		id: 0, // number
		description: 'description | descrição', // string
		max_execution_date: '2099-12-31 12:00:00', // timestamp
		estimated_time: '2 horas' // string [x hours |x horas]
	}
]
```
### Example / Exemplo
```json
[
	{
		id:  1,
		description:  'Importação de arquivos de imagens',
		max_execution_date:  '2019-11-10 12:00:00',
		estimated_time:  '2 horas'
	},
	{
		id:  2,
		description:  'Importação de dados da Base Legada',
		max_execution_date:  '2019-11-11 12:00:00',
		estimated_time:  '4 horas'
	},
	{
		id:  3,
		description:  'Importação de dados de integração',
		max_execution_date:  '2019-11-11 08:00:00',
		estimated_time:  '6 horas'
	}
]
```
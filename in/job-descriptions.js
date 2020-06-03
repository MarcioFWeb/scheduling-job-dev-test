/* Input file: JOBS DESCRIPTION */
/* Arquivo de entrada: DESCRIÇÃO DOS JOBS */

/* MODEL / MODELO:

[
    {
        id: 0, // number
        description: 'description | descrição', // string
        max_execution_date: '2099-12-31 12:00:00', // timestamp
        estimated_time: '2 horas' // string [x hours |x horas]
    }
]

*/

const input_data = 
    [
        {
            id: 1,
            description: 'Importação de arquivos de fundos',
            max_execution_date: '2019-11-10 12:00:00',
            estimated_time: '2 horas'
        },
        {
            id:  2,
            description: 'Importação de dados da Base Legada',
            max_execution_date: '2019-11-11 12:00:00',
            estimated_time: '4 horas'
        },
        {
            id:  3,
            description: 'Importação de dados de integração',
            max_execution_date: '2019-11-11 08:00:00',
            estimated_time: '6 horas'
        }
    ]

module.exports = { 
    input_data
}
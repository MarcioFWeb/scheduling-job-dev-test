const moment = require('moment')
const strDateTimeFormat = 'YYYY-MM-DD hh:mm:ss'
moment.locale('pt-br')

/* Convert date time in string to object... */
const dateTimeObject = (strDateTime) => moment(strDateTime, strDateTimeFormat)

/* Date Time Diference in Minutes... */
const dateTimeDiferenceInMinutes = (strDateTimeA, strDateTimeB) => dateTimeObject(strDateTimeA).diff(dateTimeObject(strDateTimeB), 'minutes')

module.exports = {
    /* Date Time Diference in Minutes... */
    dateTimeDiferenceInMinutes
}
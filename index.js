/* Routine      : Scheduling Job
   Version      : 0.0.1
   Epic         : Job Utilities
   Story        : As a Job Administrator, I need to organize a list of jobs in order to group them for execution within a time limit of 8 hours.
   Squad        : Digital Innovation
   Author       : Marcio A. O. Figueiredo <marciofweb@gmail.com>
   Creation     : 2020-05-28
   Last Change  : 2020-06-03
   Instructions : See the README.md file
*/

/* IMPORTS */
jobsUtils = require('./utils/jobsgrouping.js')
data = require('./in/job-descriptions.js')

// TODO: Update instuctions and documentation

/* ROUTINE LOGIC */
const routineResult = jobsUtils.JobsGroupingForTimeLimit(data.input_data)

/* PRINT RESULT INTO CONSOLE */
console.log(`Jobs Grouped: ${JSON.stringify(routineResult, null, "\t")}`)
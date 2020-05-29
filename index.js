/* Routine      : Scheduling Job
   Version      : 0.0.1
   Epic         : Job Utilities
   Story        : As a Job Administrator, I need to organize a list of jobs in order to group them for execution within a time limit of 8 hours.
   Squad        : Digital Innovation
   Author       : Marcio A. O. Figueiredo <marciofweb@gmail.com>
   Creation     : 2020-05-28
   Last Change  : 2020-05-28
   Instructions : See the README.md file
*/

/* IMPORTS */
jobsUtils = require('./utils/jobsgrouping.js')

// TODO: Import INIT data

// TODO: Create first test (TDD -> Fail)
// TODO: Implement Grouping logic
// TODO: Run tests (succes)
// TODO: Run tests (fail)
// TODO: Update instuctions and documentation

/* ROUTINE LOGIC */

const routineResult = jobsUtils.JobsGroupingForTimeLimit({ routine: 'run' })

console.log(JSON.stringify(routineResult))
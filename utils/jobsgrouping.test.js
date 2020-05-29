/* jobsGrouping Routines - TESTS */

/* IMPORTS */
jobsUtils = require('./jobsgrouping.js')
data = require('../in/job-descriptions')

/* TEST DATA */

const input_data_to_test = data.input_data    

const output_data_test_success = 
    [
        [1, 3],
        [2]
    ]

/* TEST IMPLEMENTATION */

test('correct grouping of jobs', () => {
    expect(
        jobsUtils.JobsGroupingForTimeLimit(input_data_to_test)
    ).toEqual(
        output_data_test_success
    )
})
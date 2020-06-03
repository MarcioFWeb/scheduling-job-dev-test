/* jobsGrouping Routines */

/* imports */
dateTime = require('./dateTime')

/* constants */
jobGroupTimeLimit = 8 // (in hours)

/* (Main) implementation of jobs grouping */
function JobsGroupingForTimeLimit(jobsToGrouping) {

    let groupedJobs = []

    /* jobs object decoration */
    let jobsToGroupingWithEstimatedTime = jobsToGrouping.map(job => { 
            let estimatedTimeObject = EstimatedTimeJobExtractToObject(job.estimated_time)
            job.estimated_time = estimatedTimeObject
            return {...job}
        })
    
    numberOfJobs = jobsToGroupingWithEstimatedTime.length
    let jobIdsAlreadyGrouped = []

    while (jobIdsAlreadyGrouped.length < numberOfJobs) {         
        
        groupedJobsEstimatedTimeSlot = EstimatedTimeSlotGrouping(jobsToGroupingWithEstimatedTime, jobIdsAlreadyGrouped)
        groupedJobs.push(groupedJobsEstimatedTimeSlot.idsOfJobsGrouped)
    }

    /* Array of Grouped Jobs in Estimated Slots */
    return groupedJobs

}

/* (Util) Grouping of jobs in defined time slot */
function EstimatedTimeSlotGrouping(jobsToGroup, jobIdsAlreadyGrouped) {

    /* initializations */
    let slotObjectOfJobsGroupedByTime = {}
    slotObjectOfJobsGroupedByTime.jobIdsAlreadyGrouped = jobIdsAlreadyGrouped
    slotObjectOfJobsGroupedByTime.idsOfJobsGrouped = []
    actualSlot = []

    /* starting grouping */    
    let jobsToGroupFiltered = jobsToGroup.filter(job => jobIdsAlreadyGrouped.indexOf(job.id) < 0)
    actualSlot.push(jobsToGroupFiltered.shift())
    
    let remainingTimeLimit = jobGroupTimeLimit - actualSlot[0].estimated_time.value
    slotObjectOfJobsGroupedByTime.jobIdsAlreadyGrouped.push(actualSlot[0].id)
    slotObjectOfJobsGroupedByTime.idsOfJobsGrouped.push(actualSlot[0].id)
    slotObjectOfJobsGroupedByTime.max_execution_date = actualSlot[0].max_execution_date

    /* completing slot array if time is left */
    let arrayOfJobsThatFitInTheEstimatedTime = []
    if (remainingTimeLimit > 0) {
        arrayOfJobsThatFitInTheEstimatedTime = 
            ComplementsSlotUntilSetTime(
                jobsToGroupFiltered, 
                remainingTimeLimit,
                slotObjectOfJobsGroupedByTime.max_execution_date)
        Array.prototype.push.apply(slotObjectOfJobsGroupedByTime.jobIdsAlreadyGrouped, arrayOfJobsThatFitInTheEstimatedTime)
        Array.prototype.push.apply(slotObjectOfJobsGroupedByTime.idsOfJobsGrouped, arrayOfJobsThatFitInTheEstimatedTime)
    }    
    
    /* Jobs array within estimated time */
    return slotObjectOfJobsGroupedByTime

}

/* (Util) Complements slot with jobs within the defined time */
function ComplementsSlotUntilSetTime(jobsToFill, limitTimeLeft, maxExecutionDate) {

    /* initializations */
    let selectedComplementaryJobs = []
    let actualTime = limitTimeLeft    
    let leftJobsToFillArray = jobsToFill
    
    /* Selection of jobs within time */
    for (let index = limitTimeLeft; index > 0; index--) {        
        /* always prioritizes selecting jobs that occupy the longest possible time */
        let jobsMatchTimeArray = leftJobsToFillArray.filter(job =>  job.estimated_time.value == index)
        /* add the job to the slot and follow the selection as long as time is available */
        if ((jobsMatchTimeArray.length > 0) && (actualTime > 0)) {        
            jobsMatchTimeArray.forEach(jobMatchTime => {
                /* verify job time to run comparing to time left in slot */
                if (jobMatchTime.estimated_time.value <= actualTime) {
                    /* verify job max execution date comparing with slot first selected */
                    let dateDif = 
                        dateTime.dateTimeDiferenceInMinutes(jobMatchTime.max_execution_date, maxExecutionDate)
                    /* add job time to max execution date */
                    dateDif -= (jobMatchTime.estimated_time.value * 60)
                    if (dateDif > 0) {
                        selectedComplementaryJobs.push(jobMatchTime.id)
                        actualTime -= jobMatchTime.estimated_time.value
                        leftJobsToFillArray = leftJobsToFillArray.filter(job =>  job.id != jobMatchTime.id)
                    }                    
                }                
            })
        }        
    }

    /* Complementary Jobs Array within left time */
    return selectedComplementaryJobs
}

/* (Util) Extract ESTIMATED TIME object */
function EstimatedTimeJobExtractToObject(estimated_time) {
    let objEstimatedTime = {}
    let estimated_time_array = estimated_time.split(' ')
    objEstimatedTime = estimated_time_array.reduce((acc, cur, idx, array) => ({ type: cur, value: +array[0] }))
    return objEstimatedTime
}

module.exports = {
    /* (Main) implementation of jobs grouping */
    JobsGroupingForTimeLimit
}
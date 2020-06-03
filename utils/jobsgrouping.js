/* jobsGrouping Routines */

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

    /* completing slot array if time is left */
    let arrayOfJobsThatFitInTheEstimatedTime = []
    if (remainingTimeLimit > 0) {
        arrayOfJobsThatFitInTheEstimatedTime = ComplementsSlotUntilSetTime(jobsToGroupFiltered, remainingTimeLimit)
        Array.prototype.push.apply(slotObjectOfJobsGroupedByTime.jobIdsAlreadyGrouped, arrayOfJobsThatFitInTheEstimatedTime)
        Array.prototype.push.apply(slotObjectOfJobsGroupedByTime.idsOfJobsGrouped, arrayOfJobsThatFitInTheEstimatedTime)
    }    
    
    /* Jobs array within estimated time */
    return slotObjectOfJobsGroupedByTime

}

/* (Util) Complements slot with jobs within the defined time */
function ComplementsSlotUntilSetTime(jobsToFill, limitTimeLeft) {

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
                if (jobMatchTime.estimated_time.value <= actualTime) {
                    selectedComplementaryJobs.push(jobMatchTime.id)
                    actualTime -= jobMatchTime.estimated_time.value
                    leftJobsToFillArray = leftJobsToFillArray.filter(job =>  job.id != jobMatchTime.id)
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
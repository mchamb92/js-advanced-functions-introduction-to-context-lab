// Your code here
function createEmployeeRecord(employeeInfo){
    const employeeRecord = {
        firstName : employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayOfRecords){
    const employeeRecords = arrayOfRecords.map(recordArr => {
        const recordObj = createEmployeeRecord(recordArr);
        return recordObj;
    })
    return employeeRecords;
}

function createTimeInEvent(empRecObj, date){
    empRecObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }) 
    
    return empRecObj;
}

function createTimeOutEvent(empRecObj, date){
    empRecObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }) 
    
    return empRecObj;
}

function hoursWorkedOnDate(empRecObj, TimeIndate){

    let timeInEvent = empRecObj.timeInEvents.find(event => {
        return event.date === TimeIndate;
    })
    let timeOutEvent = empRecObj.timeOutEvents.find(event => {
        return event.date === TimeIndate;
    })

    let hoursWorked = Math.abs(timeInEvent.hour - timeOutEvent.hour) / 100;

    return hoursWorked
}

function wagesEarnedOnDate(empRecObj, TimeIndate){
    let hours = hoursWorkedOnDate(empRecObj,TimeIndate)
    return hours * empRecObj.payPerHour;
}

function  allWagesFor(empRecObj){
    let wages = empRecObj.timeInEvents.reduce((acc,event) => {
        return acc + wagesEarnedOnDate(empRecObj, event.date)
    },0) 
    return wages;
}

function findEmployeeByFirstName(empRecords, firstName){
    let empRecord = empRecords.find(record => {
        return record.firstName === firstName;
    })
    return empRecord;
}

function calculatePayroll(empRecords){
    let payrollTotal = empRecords.reduce((acc, record) => {
        return acc + allWagesFor(record);
    },0)
    return payrollTotal;
}
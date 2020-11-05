// Your code here
const createEmployeeRecord = (empArray) => {
  return {
    firstName: empArray[0],
    familyName: empArray[1],
    title: empArray[2],
    payPerHour: empArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (arrayOfEmps) => {
  return arrayOfEmps.map(empArray => {
   return createEmployeeRecord(empArray)
  })
}

const createTimeInEvent = (empRecObj, dateStamp) => {
  let [date, hour] = dateStamp.split(' ')

  empRecObj.timeInEvents.push({ 
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
 // hour: parseInt(dateStamp.slice(11)),
 // date: dateStamp.slice(0,10)
  })
  return empRecObj
}

const createTimeOutEvent = (empRecObj, dateStamp) => {
  let [date, hour] = dateStamp.split(' ')
  empRecObj.timeOutEvents.push({ 
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  })
  return empRecObj
}  

const hoursWorkedOnDate = (empRecObj, date) => {
  let inDate = empRecObj.timeInEvents.find(key => {
    return key.date === date
    })
  let outDate = empRecObj.timeOutEvents.find(key => {
    return key.date === date
    })
  return (outDate.hour - inDate.hour) / 100
}

const wagesEarnedOnDate = (empRecObj, date) => {
  return hoursWorkedOnDate(empRecObj, date) * empRecObj.payPerHour
}

const allWagesFor = (empRecObj) => {
  let eligibleDates = empRecObj.timeInEvents.map(function(e){
    return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
    return memo + wagesEarnedOnDate(empRecObj, d)
  }, 0)

return payable
}

const findEmployeeByFirstName = (arrayOfEmps, firstName) => {
  return arrayOfEmps.find(empRecObj => empRecObj.firstName === firstName)
}

const calculatePayroll = (arrayOfEmps) => {
  return arrayOfEmps.reduce((memo, empRecObj) => {
    return memo + allWagesFor(empRecObj)
  }, 0)
}
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
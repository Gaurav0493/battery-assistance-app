

const data = require('./battery.json')

const allBatteries = [];

const getAllBatteries = () => {

    for (var i = 0; i < data.length; i++) {
        if (allBatteries.includes(data[i].serialNumber)) {
            continue;
        }
        allBatteries.push(data[i].serialNumber)
    }
}



const dailyAverageBatteryConsumption = () => {

    getAllBatteries();
    var filteredBattery
    var batteries = [];
    var batteryAverage = [];

    allBatteries.forEach(singlebattery => {

        filteredBattery = data.filter(battery => battery.serialNumber === singlebattery)

        for (var i = 0; i < filteredBattery.length - 1; i++) {

            if (batteries.includes(filteredBattery[i].serialNumber)) {
                continue;
            }
            batteries.push(filteredBattery[i].serialNumber)


            let currentDate = filteredBattery[i + 1].timestamp.split('T')[0]
            let previousSate = filteredBattery[i].timestamp.split('T')[0]

            if ((currentDate === previousSate) && (filteredBattery[i].serialNumber === filteredBattery[i + 1].serialNumber)) {
                let serialNumber = filteredBattery[i].serialNumber;
                let academyID = filteredBattery[i].academyId
                let firstTimestamp = new Date(filteredBattery[i].timestamp)
                let batteryDiff, minDiff;
                let needReplacement = false;
                for (var j = i + 1; j < filteredBattery.length - 1; j++) {
                    if ((filteredBattery[i].batteryLevel > filteredBattery[j].batteryLevel)) {
                        let secondTimestamp = new Date(filteredBattery[j].timestamp)
                        minDiff = Math.abs((firstTimestamp.getTime() - secondTimestamp.getTime()) / 1000 / 60 / 60);
                        if (minDiff < 1) continue;
                        batteryDiff = parseFloat((filteredBattery[i].batteryLevel - filteredBattery[j].batteryLevel) * 100);
                        break;
                    }
                }
                let averageOfDay = batteryDiff * minDiff * 24;
                if( averageOfDay > 30 ) {
                    needReplacement = true
                }
                batteryAverage.push({serialNumber, batteryDiff, averageOfDay, academyID , needReplacement });
            }
        }

    })
    return batteryAverage;
}



const batteyAtIssue = dailyAverageBatteryConsumption();

const academyWithIssue = () => {

    var academyWithIssue = {};
    batteyAtIssue.forEach(battery => {
        // let batteries = [];
        // let serialNumber = battery.serialNumber;
        if(battery.needReplacement) {
            if(battery.academyID in academyWithIssue ) {
                // academyWithIssue.push({ serialNumber})
                academyWithIssue[battery.academyID] = academyWithIssue[battery.academyID] + 1;
            }
            else {
                academyWithIssue[battery.academyID] = 1;
            }
        }
    })
    return academyWithIssue;
}
 export { dailyAverageBatteryConsumption, academyWithIssue };


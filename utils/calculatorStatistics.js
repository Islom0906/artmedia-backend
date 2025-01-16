export const calculatorStatistics = (location, statistics) => {

    const {
        young,
        middleAge,
        oldAge,
        onFoot,
        bus,
        auto,
        bike,
        otherTransport,
        workingDayStatistics,
        workingDayMonth,
        offDayMonth,
        dayOffStatistics,
        monthViewsSeconds,
        month,
        price
    } = statistics
    const workingSecondsInDay = (Number(location.fromHour.split(":")[0]) - Number(location.toHour.split(":")[0]))*60*60*(workingDayMonth+offDayMonth)

    const allViews = young + middleAge + oldAge
    let sumViewsWorkingDay = 0
    let sumViewsOffDay = 0
    // working day
    workingDayStatistics.map(working => {
        sumViewsWorkingDay += working.viewsNumber * workingDayMonth
    })
    // off day
    dayOffStatistics.map(offDay => {
        sumViewsOffDay += offDay.viewsNumber * offDayMonth
    })
    // working day

    const workingDaysStatistic = workingDayStatistics.map(working => {
        return {
            hour: working.hour,
            viewsNumberDay: working.viewsNumber,
            viewsNumberMonth: working.viewsNumber * workingDayMonth,
            viewsNumberMonthPercent: Math.round((working.viewsNumber * workingDayMonth * 100) / sumViewsWorkingDay),
        }
    })
    // off day
    const offDaysStatistic = dayOffStatistics.map(offDay => {
        return {
            hour: offDay.hour,
            viewsNumberDay: offDay.viewsNumber,
            viewsNumberMonth: offDay.viewsNumber * offDayMonth,
            viewsNumberMonthPercent: Math.round((offDay.viewsNumber * offDayMonth * 100) / sumViewsOffDay),
        }
    })
    return {
        age: {
            young,
            youngPercent: Math.round((young * 100) / allViews),
            middleAge,
            middleAgePercent: Math.round((middleAge * 100) / allViews),
            oldAge,
            oldAgePercent: Math.round((oldAge * 100) / allViews),
        },
        passenger: {
            onFoot,
            onFootPercent: Math.round((onFoot * 100) / allViews),
            bus,
            busPercent: Math.round((bus * 100) / allViews),
            auto,
            autoPercent: Math.round((auto * 100) / allViews),
            bike,
            bikePercent: Math.round((bike * 100) / allViews),
            otherTransport,
            otherTransportPercent: Math.round((otherTransport * 100) / allViews),
        },
        workingDaysStatistic,
        offDaysStatistic,
        allViewsWorkingDay: sumViewsWorkingDay,
        allViewOffDay: sumViewsOffDay,
        viewsMonthSeconds:{
            otherSeconds:workingSecondsInDay-monthViewsSeconds,
            viewSecond:monthViewsSeconds
        },
        allViews,
        month,
        price
    }
}
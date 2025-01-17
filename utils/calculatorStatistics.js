const calculatorStatistics = (location, statistics) => {
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
        price, nightVision
    } = statistics


    const workingSecondsInMonth = (Number(location.fromHour.split(":")[0]) - Number(location.toHour.split(":")[0])) * 60 * 60 * (workingDayMonth + offDayMonth)
    const otherSecondsPercent = Math.round((((workingSecondsInMonth - monthViewsSeconds) * 100) / workingSecondsInMonth) * 10) / 10


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

    const percentMinus = (number, percent) => {
        const percentage = percent / 100;
        const valueToSubtract = number * percentage;
        return number - valueToSubtract
    }


    // working day my views
    const workingDaysStatisticInMyVideo = workingDaysStatistic.map(working => {

        return {
            hour: working.hour,
            viewsNumberDayMyVideo: Math.round(percentMinus(working.viewsNumberDay, otherSecondsPercent)),
            viewsNumberMonthMyVideo: Math.round(percentMinus(working.viewsNumberMonth, otherSecondsPercent))
        }
    })

    // off day my views
    const offDaysStatisticInMyVideo = offDaysStatistic.map(offDay => {

        return {
            hour: offDay.hour,
            viewsNumberDayMyVideo: Math.round(percentMinus(offDay.viewsNumberDay, otherSecondsPercent)),
            viewsNumberMonthMyVideo: Math.round(percentMinus(offDay.viewsNumberMonth, otherSecondsPercent))
        }
    })

    let sumViewsWorkingDayMyVideo = 0
    let sumViewsOffDayMyVideo = 0
    // working day
    workingDaysStatisticInMyVideo.map(working => {
        sumViewsWorkingDayMyVideo += working.viewsNumberMonthMyVideo
    })
    // off day
    offDaysStatisticInMyVideo.map(offDay => {
        sumViewsOffDayMyVideo += offDay.viewsNumberMonthMyVideo
    })
    return {
        timeViews: {
            workingDay: sumViewsWorkingDay,
            workingDayPercent: Math.round((sumViewsWorkingDay*100)/allViews),
            offDay: sumViewsOffDay,
            offDayPercent: Math.round((sumViewsOffDay*100)/allViews),
            nightVision,
            nightVisionPercent: Math.round((nightVision*100)/allViews),
        },
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
            otherSeconds: workingSecondsInMonth - monthViewsSeconds,
            viewSeconds: monthViewsSeconds,
            otherSecondsPercent,
            viewSecondsPercent: Math.round(((monthViewsSeconds * 100) / workingSecondsInMonth) * 10) / 10
        },
        workingDaysStatisticInMyVideo,
        offDaysStatisticInMyVideo,
        allViewsWorkingDayMyVideo: sumViewsWorkingDayMyVideo,
        allViewsOffDayMyVideo: sumViewsOffDayMyVideo,
        allViews,
        month,
        nightVision,
        price,
        monthViewsSeconds,
        monthViewsMyVideo:sumViewsWorkingDayMyVideo+sumViewsOffDayMyVideo,
        oneViewsPrice:Math.round(price/(sumViewsWorkingDayMyVideo+sumViewsOffDayMyVideo))
    }
}

export default calculatorStatistics
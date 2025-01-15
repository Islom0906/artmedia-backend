const translateLanguage=(lang,fields)=>{
    const fieldsObj = {}
    const fieldsSplit=fields.split(' ')
    const addLang=fieldsSplit.map(item=>{
        fieldsObj[item] = `${item}_${lang}`
        return `${item}_${lang}`
    })
    const fieldsString = addLang.join(' ')


    return {fieldsObj, fieldsString}
}

export default translateLanguage
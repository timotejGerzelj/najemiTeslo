module.exports = {
     i18n: (translation, values = {}) => {
        let toTranslate = translation
        Object.keys(values).map((v) => {
        const pattern = new RegExp(`%${v}%`, 'gi') // Regex = %...%
        toTranslate = toTranslate.replace(pattern, values[v]) // replace everything between the % AND the % symbols
    })  

    return toTranslate
  }

}

module.exports.preventSQLInjection = arr => {
    for (let item of arr) {
        item = ""+item
        if (item.includes('; ') || item.toLowerCase().includes(' or ') ||  item.toLowerCase().includes(' and ')) return true
    }
    return false
}
    
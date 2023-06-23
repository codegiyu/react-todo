const formatDateTime = (str) => {
    const datetime = new Date(Number(str))
    const date = datetime.toLocaleDateString()
    const timeAll = datetime.toLocaleTimeString()
    const time = timeAll.slice(0, -6)
    const period = timeAll.slice(-2).toLowerCase()

    return `${date} ${time}${period}`
}

export default formatDateTime
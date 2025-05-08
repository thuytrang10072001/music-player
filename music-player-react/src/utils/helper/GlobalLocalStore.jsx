const setItem = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}

const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export { setItem, getItem }
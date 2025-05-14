const setItem = (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val))
}

const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export { setItem, getItem }
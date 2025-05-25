const formatDuration = (time : string ) => {
    if (time.startsWith("00:")) {
        return time.substring(3);
    }
    return time;
};

export { formatDuration }
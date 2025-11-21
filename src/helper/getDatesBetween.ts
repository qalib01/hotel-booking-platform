const getDatesBetween = (start: string, end: string) => {
    const dates = [];
    let current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
    }

    return dates;
};

export default getDatesBetween;
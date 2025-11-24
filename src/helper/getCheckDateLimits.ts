const getCheckDateLimits = (checkIn?: string) => {
    if (!checkIn) {
        return {
            minCheckoutDate: '',
            maxCheckoutDate: ''
        };
    }

    const base = new Date(checkIn);
    const min = new Date(base);
    min.setDate(min.getDate() + 2);
    const max = new Date(base);
    max.setDate(max.getDate() + 7);

    return {
        minCheckoutDate: min.toISOString().split("T")[0],
        maxCheckoutDate: max.toISOString().split("T")[0],
    };
}

export default getCheckDateLimits;
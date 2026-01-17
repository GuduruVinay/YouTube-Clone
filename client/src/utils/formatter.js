export const formatNumber = (num) => {
    if(num === undefined || num === null) return "0";

    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1
    }).format(num);
};
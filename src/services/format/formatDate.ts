export const formatIsoToMaskedDate = (isoDate: string) => {
    if (!isoDate || typeof isoDate !== 'string' || isoDate.length !== 10) return "";
    
    if (isoDate.indexOf('-') === 4) {
        const parts = isoDate.split('-'); 
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
};
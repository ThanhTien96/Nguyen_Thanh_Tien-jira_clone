// cắt ký tự văn bản
export const truncateText = (text:string, leg:number) => {
    if (text.length >= leg) {
        return text.substr(0, leg);
    }
    return text;
}
export const EmailValidation = (email)=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export const generateRandomString= async (value)=>{
    console.log("o",value)
    return Math.random().toString(36).substring(2,value)
}
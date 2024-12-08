export default function ageCalculation(birthday: string):number{
    const birthDate = new Date(birthday);
    const today = new Date();
    let yearDifference = today.getFullYear() - birthDate.getFullYear();
    if (
    today.getMonth() < birthDate.getMonth() || 
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        yearDifference--;
    }
    return yearDifference
}
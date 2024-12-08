import { Show } from "../../movie-data/cinemas/apollo-types";

export default function narvaPrice(show: Show, age:number):number{
    let price: number = -1;
    const dateTime = new Date(show.dttmShowStart);
    if(dateTime.getDay() == 0){
        if(age <= 12 || age >= 65){
            price = 4.99
        } else if(age <= 18) {
            price = 7.77
        } else {
            price = 8.54
        }
    } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
        if(age <= 12 || age >= 65){
            price = 3.99
        } else if(age <= 18) {
            price = 4.43
        } else {
            price = 5.54
        }
    } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
        if(age <= 12 || age >= 65){
            price = 4.39
        } else if(age <= 18) {
            price = 5.54
        } else {
            price = 6.66
        }
    } else {
        if(age <= 12 || age >= 65){
            price = 4.99
        } else if(age <= 18) {
            price = 7.77
        } else {
            price = 8.54
        }

    }
    if(show.PresentationMethod == "3D"){
        price += 1
    }
    return price
}
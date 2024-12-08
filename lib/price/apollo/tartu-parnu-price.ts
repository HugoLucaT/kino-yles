import { Show } from "../../movie-data/cinemas/apollo-types";

export default function tartuparnuPrice(show: Show, age:number):number{
    let price: number = -1;
    const dateTime = new Date(show.dttmShowStart);
    if(dateTime.getDay() == 0){
        if(age <= 12){
            price = 5.99
        } else if(age <= 18) {
            price = 8.88
        } else {
            price = 9.99
        }
    } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
        if(age <= 12 || age >= 65){
            price = 4.99
        } else if(age <= 18) {
            price = 5.54
        } else {
            price = 7.77
        }
    } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
        if(age <= 12){
            price = 5.39
        } else if(age <= 18) {
            price = 6.66
        } else {
            price = 8.88
        }
    } else {
        if(age <= 12){
            price = 5.99
        } else if(age <= 18) {
            price = 8.88
        } else {
            price = 9.99
        }

    }
    if(show.PresentationMethod == "3D"){
        price += 1
    }
    return price
}
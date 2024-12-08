import { Show } from "../../movie-data/cinemas/apollo-types";


export default function kristiinePrice(show: Show, age:number):number{
    let price: number = -1;
    const dateTime = new Date(show.dttmShowStart);
    if(dateTime.getDay() == 0){
        if(age <= 12){
            price = 7.99
        } else if(age <= 18) {
            price = 10.88
        } else {
            price = 11.99
        }
    } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
        if(age <= 12){
            price = 7.29
        } else if(age <= 18) {
            price = 7.88
        } else {
            price = 10.10
        }
    } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
        if(age <= 12){
            price = 7.69
        } else if(age <= 18) {
            price = 8.99
        } else {
            price = 11.21
        }
    } else {
        if(age <= 12){
            price = 7.99
        } else if(age <= 18) {
            price = 10.88
        } else {
            price = 11.99
        }

    }
    if(show.PresentationMethod == "3D"){
        price += 1
    }
    return price
}
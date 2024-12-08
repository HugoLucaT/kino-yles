
import ageCalculation from "../age/age-calculation";
import { Show } from "../movie-data/cinemas/thule-types";

export default function thulePriceCalculation(show: Show, supabaseData: any):string{
    //const [date, time] = show.dttmShowStart.split('T')
    let price: number = -1;
    const dateTime = new Date(show.dttmShowStart);
    let age = ageCalculation(supabaseData[0].user_data.birth_date)
    let armyOrUniOrTeach = false;
    supabaseData.forEach(element => {
        if(element.membership_id == 1 || element.membership_id == 2 || element.membership_id == 3){
            armyOrUniOrTeach = true
        }
    });
    if(dateTime.getDay() == 0){
        if(age <= 12){
            price = 4.50
        } else if(age >= 65){
            price = 6
        } else if(age <= 18 || armyOrUniOrTeach){
            price = 6.5
        } else {
            price = 7
        }
    } else if(dateTime.getDay() == 4){
        price = 4.50
    } else if(dateTime.getDay() <= 3){
        if(age <= 12){
            price = 4
        } else if(age >= 65){
            price = 4.50
        } else if(age <= 18 || armyOrUniOrTeach){
            price = 5
        } else {
            price = 5.50
        }
    } else {
        if(age <= 12){
            price = 4.50
        } else if(age >= 65){
            price = 6
        } else if(age <= 18 || armyOrUniOrTeach){
            price = 6.5
        } else {
            price = 7
        }
    }

    supabaseData.forEach(element => {
        if(element.membership_id == 10){
            price -= 0.50
        }
        if(element.membership_id == 11){
            price -= 1
        }
        if(element.membership_id == 12){
            price -= 1.50
        }
        if(element.membership_id == 13){
            price -= 2
        }
    });

    if(price == -1){
        return "Hinda ei leitud"
    }
    return price + " €"
}
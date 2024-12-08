"use client"


import ageCalculation from "../age/age-calculation";
import { Show } from "../movie-data/cinemas/artis-types";


export default function artisPriceCalculation(show: Show, supabaseData: any):string{
    let price: number = -1;
    const dateTime = new Date(show.dttmShowStart);
    let age = ageCalculation(supabaseData[0].user_data.birth_date)
    let armyOrUniOrTeach = false;
    let member = 0;
    supabaseData.forEach(element => {
        if(element.membership_id == 5){
            member = 1
        }
        if(element.membership_id == 6){
            member = 2
        }
        if(element.membership_id == 7){
            member = 3
        }
        if(element.membership_id == 1 || element.membership_id == 2 || element.membership_id == 3){
            armyOrUniOrTeach = true
        }
    });
    //Artises on laste seanssid, aga ma ei tea kuidas neid loetakse v
    /*if(show.RatingLabel == "PERE"){
        if(age <= 12){
            return "4.5 €"
        }
        return "7 €"
    }*/
    if(member = 3){
        if(dateTime.getDay() == 0){
            price = 6.50
        } else if(dateTime.getDay() <= 5 && dateTime.getHours() <= 17){
            if(age >= 65){
                price = 4.50
            } else{
                price = 5.50
            }
        } else if(dateTime.getDay() <= 4 && dateTime.getHours() > 17){
            price = 6
        } else {
            price = 6.50
        } 
    } else if(member = 2){
        if(dateTime.getDay() == 0){
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6.80
            } else {
                price = 8.00
            }  
        } else if(dateTime.getDay() <= 5 && dateTime.getHours() <= 17){
            if (age >= 65) {
                price = 4.50
            } else {
                price = 6
            }
        } else if(dateTime.getDay() <= 4 && dateTime.getHours() > 17){
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6
            } else {
                price = 7
            }
        } else {
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6.80
            } else {
                price = 8.00
            }  
        } 
    } else if(member = 1){
        if(dateTime.getDay() == 0){
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6.80
            } else {
                price = 8.50
            }  
        } else if(dateTime.getDay() <= 5 && dateTime.getHours() <= 17){
            if(age >= 65){
                price = 4.50
            }else if(age <= 18 || armyOrUniOrTeach){
                price = 6
            } else {
                price = 6.5
            }
        } else if(dateTime.getDay() <= 4 && dateTime.getHours() > 17){
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6
            } else {
                price = 7.50
            }
        } else {
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6.80
            } else {
                price = 8.50
            }  
        } 
    } else {
        if(dateTime.getDay() == 0){
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6.80
            } else {
                price = 8.90
            }  
        } else if(dateTime.getDay() <= 5 && dateTime.getHours() <= 17){
            if(age >= 65){
                price = 4.50
            }else if(age <= 18 || armyOrUniOrTeach){
                price = 6
            } else {
                price = 7
            }
        } else if(dateTime.getDay() <= 4 && dateTime.getHours() > 17){
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6
            } else {
                price = 8.20
            }
        } else {
            if(age <= 18 || age >= 65 || armyOrUniOrTeach){
                price = 6.80
            } else {
                price = 8.90
            }  
        }

    }
    if(price == -1){
        return "Hinda ei leitud"
    }
    return price + " €"
}
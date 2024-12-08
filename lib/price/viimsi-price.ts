
import ageCalculation from "../age/age-calculation";
import { Show } from "../movie-data/cinemas/viimsi-types";

export default function viimsiPriceCalculation(show: Show, supabaseData: any):string{
    let price: number = -1;
    const dateTime = new Date(show.dttmShowStart);
    let age = ageCalculation(supabaseData[0].user_data.birth_date)
    let member = 0;
    if (age > 18){
        supabaseData.forEach(element => {
            if(element.membership_id == 8){
                member = 1
            }
            if(element.membership_id == 9){
                member = 2
            }
        });
    }
    
    if(member = 2){
        if(show.PresentationMethod == "2D"){
            if(dateTime.getDay() == 0){
                price = 8.50
            } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
                price = 7.10
            } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
                price = 8
            } else {
                price = 8.50
            }
        } else {
            if(dateTime.getDay() == 0){
                price = 9.5
            } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
                price = 7.2
            } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
                price = 8.2
            } else {
                price = 9.5
            }
        }
    } else if (member = 1){
        if(show.PresentationMethod == "2D"){
            if(dateTime.getDay() == 0){
                price = 9
            } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
                price = 7.60
            } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
                price = 8.50
            } else {
                price = 9
            }
        } else {
            if(dateTime.getDay() == 0){
                price = 10
            } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
                price = 7.70
            } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
                price = 8.70
            } else {
                price = 10
            }
        }
    } else {
        if(show.PresentationMethod == "2D"){
            if(dateTime.getDay() == 0){
                if(age <= 12 || age >= 65){
                    price = 6
                } else if (age >= 13 && age <= 18){
                    price = 8
                } else{
                    price = 10
                }
            } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
                if(age <= 12 || age >= 65){
                    price = 5.30
                } else if (age >= 13 && age <= 18){
                    price = 5.80
                } else{
                    price = 8.20
                }
            } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
                if(age <= 12 || age >= 65){
                    price = 5.60
                } else if (age >= 13 && age <= 18){
                    price = 6.70
                } else{
                    price = 9.30
                }
            } else {
                if(age <= 12 || age >= 65){
                    price = 6
                } else if (age >= 13 && age <= 18){
                    price = 8
                } else{
                    price = 10
                }
            }
        } else {
            if(dateTime.getDay() == 0){
                if(age <= 12 || age >= 65){
                    price = 6.60
                } else if (age >= 13 && age <= 18){
                    price = 8.40
                } else{
                    price = 10
                }
            } else if(dateTime.getDay() <= 5 && dateTime.getHours() < 17){
                if(age <= 12 || age >= 65){
                    price = 6.20
                } else if (age >= 13 && age <= 18){
                    price = 6.50
                } else{
                    price = 8.40
                }
            } else if(dateTime.getDay() <= 4 && dateTime.getHours() >= 17){
                if(age <= 12 || age >= 65){
                    price = 6.50
                } else if (age >= 13 && age <= 18){
                    price = 7.30
                } else{
                    price = 9.40
                }
            } else {
                if(age <= 12 || age >= 65){
                    price = 6.60
                } else if (age >= 13 && age <= 18){
                    price = 8.40
                } else{
                    price = 11
                }
            }

        }
    }
    if(price == -1){
        return "Hinda ei leitud"
    }
    return price + " €"
}
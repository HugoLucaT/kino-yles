export interface Holidays {
    date: string, //Date
    title: string,
    notes: string,
    kind: string,
    kind_id: number
}


export function getHolidays(){
    return fetch("https://riigipühad.ee/?output=json", {
      method: "GET",
      cache: "no-store"
    })
      .then(response => response.json());
  }
//this function calls 2 other functions to collect info for event cards
//pass the result as props for event cards component to display events

import { GetEventsFromTicketMaster } from "./ApiCalls/GetEventsFromTicketMaster"

export default async function getMyEvents(){
    let result=[];   
 //fetch request from db - array

 //temp solution
 let dbData= ['Z698xZ2qZaFAa', 'Z698xZ2qZaFpc', 'Z698xZ2qZa6M-', 'Z698xZ2qZa6Ch', 'Z698xZ2qZa6U4', 'Z698xZ2qZaFp2']
 
 //for every item -  call api by event id
 for (let i of dbData){
    let temp= await GetEventsFromTicketMaster("eventId", i);
    if (temp){
        result.push(temp[0]);
    }else {
        console.log("API fetch error, returning 'undefined' for event ID: ", i);
    }
 }
 console.log("Events arrived from Ticketmaster...", result)
    return result;
}

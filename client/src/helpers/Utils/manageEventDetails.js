import ClientAPI from "../ClientAPI";


export default async function manageEventDetails (objectids, object){

    if (objectids.includes(object.id)){
   let eventID= object.id
   let eventExists= await ClientAPI.getEventDetails(eventID)
    if (eventExists.data !== null){
        console.log( "event with id: "  + object.id + " already in db");
        } else{
            console.log("sending event details to database....")
             ClientAPI.addEventDetails( object.id, object.name, object.date , object.time , 
                object.image, object.eventLocation, object.venue,  object.currency, object.startingPrice, object.purchaseLink, object.genre, 
                object.subgenre, object.eventHost, object.eventType)
        }
    }
}

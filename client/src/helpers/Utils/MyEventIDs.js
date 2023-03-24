import ClientAPI from "../ClientAPI"


export default async function MyEventIDs(userID){
 
    //fetch all events of user Id 
 let result= await ClientAPI.getUserEvents(userID)
 let tmIdArr = result.data.map(r => r.ticketmasterid)
    return tmIdArr
    

}
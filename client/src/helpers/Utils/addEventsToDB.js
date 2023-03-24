
import ClientAPI from "../ClientAPI";
// loops through the array, calling a function which prepares them for the database

export default async function addEventsToDB(objectIds, arrayOfObjects, userId) {

let responseArr = [];
if (objectIds.length < 0){
for (let i of arrayOfObjects){
   let eventID= i.id;

    if (objectIds.includes(eventID)){
         let eventExists= await ClientAPI.getEventDetails(eventID)

        if (eventExists.data.length > 2 ){
        
                } else{
                    let evLocation = null;
                    let evCurrency=null;
                    let evStartPrice = null;
                    let pLink = null;
                    let genr= null;
                    let subg = null;
                    let evHost= null;
                    let evType= null;

                    if(i.eventLocation)
                        evLocation= i.eventLocation
                    if(i.currency)
                        evCurrency = i.currency;
                    if (i.startingPrice)
                        evStartPrice = i.startingPrice
                    if (i.purchaseLink)
                        pLink = i.purchaseLink
                    if (i.genre)
                        genr= i.genre
                    if (i.subgenre)
                        subg= i.subgenre
                    if (i.eventHost)
                        evHost= i.eventHost
                    if (i.eventType)
                        evType = i.eventType


                
                let result=  await  ClientAPI.addEventDetails( userId, i.id, i.name, i.date , i.time , 
                        i.image, evLocation, i.venue, evCurrency, evStartPrice, pLink, genr, 
                        subg, evHost,  evType)
                    
                        responseArr.push(result.ok)
                }
        }
    }
    return responseArr;
    }


    else{
        let i =arrayOfObjects;
        let eventID= i.id;
        let userID = userId
       
      
            let eventExists= await ClientAPI.getEventDetails(eventID)
          console.log("eventExists", eventExists)
   
            if (eventExists.ok === true && eventExists.data.length !== 0){
               if  (eventExists.data[0].userId === userId )
                return "event previously added";
                    } else{
                        let evLocation = null;
                        let evCurrency=null;
                        let evStartPrice = null;
                        let pLink = null;
                        let genr= null;
                        let subg = null;
                        let evHost= null;
                        let evType= null;
    
                        if(i.eventLocation)
                            evLocation= i.eventLocation
                        if(i.currency)
                            evCurrency = i.currency;
                        if (i.startingPrice)
                            evStartPrice = i.startingPrice
                        if (i.purchaseLink)
                            pLink = i.purchaseLink
                        if (i.genre)
                            genr= i.genre
                        if (i.subgenre)
                            subg= i.subgenre
                        if (i.eventHost)
                            evHost= i.eventHost
                        if (i.eventType)
                            evType = i.eventType
    

                    let result=  await  ClientAPI.addEventDetails( userId, i.id, i.name, i.date , i.time , 
                            i.image, evLocation, i.venue, evCurrency, evStartPrice, pLink, genr, 
                            subg, evHost,  evType)
                        
                            return result
            }
        
    }
};




//This function is to take info about events without errors for the inconsistent values
// - things that return as null or undefined

export default function takeEventDetails (eventData,location){    

    let result= eventData;
  
  
    let evLocation = null;
    let pLink = null;
    let genr= null;
    let subg = null;
    let evHost= null;
    let evType= null;
    

       //purchase link
        if (result.url){
            pLink = result.url;
        } if (location){
            evLocation = location;
        }
       
        //genre name
        if (result.classifications){
            if(result.classifications["0"]){
                if (result.classifications["0"].genre){
                    if (result.classifications["0"].genre.name){
                    genr = result.classifications["0"].genre.name;
                    }
                } //subgenre
                if (result.classifications["0"].subGenre){
                    if (result.classifications["0"].subGenre.name){
                    subg = result.classifications["0"].subGenre.name;
                    }
                }
            }
            if (result.classifications["0"].segment){
                if(result.classifications["0"].segment.name){
                    evType = result.classifications["0"].segment.name;
                }
            }
        } 

        
        let eventObject= {
            "id": result.id, 
            "name":result.name, 
            "image": result.images["0"].url, 
            "date" : result.dates.start.localDate, 
            "time" : result.dates.start.localTime, 
            "venue" : result._embedded.venues["0"].name,
            "purchaseURL": pLink,
            "genre": genr,
            "subgenre": subg,
            "eventType": evType,
            "eventHost": evHost,
            "eventLocation": evLocation,
            "showAdd": true
        }


            // console.log("take event details object: ", eventObject)
            return eventObject;

}




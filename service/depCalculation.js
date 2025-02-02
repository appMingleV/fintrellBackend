import axios from "axios"
export const depCalculation=async(enterpriseId)=>{

    try{ 
        const response1=await axios.get(`http://46.202.164.93:7000/api/enterprise/${enterpriseId}`)
        const response2=await axios.get(`http://46.202.164.93:7000/api/cma/assumption/${enterpriseId}`)
        const response3=await axios.get(`http://46.202.164.93:7000/api/cma/costOfProject/${enterpriseId}`)
        
        const array= calulateDep(response1?.data?.data?.tenure,response2?.data?.data?.disbursementMonthYear,response3?.data?.data);
       console.log(array);
        return array;
    }catch(err){
 
    
     return undefined;
    }
}

function calulateDep(tenure,startDate,costOfProject){
      const date=startDate.split("-");
      let month=+date[1]<=6?6:12;
      const year=+date[0];  
      let duration=tenure/12;
     
      duration=duration+(month<=6?1:0);
    
      const depArrays=[];
     
      let depStoreObje={
        landAndPlot:{
            dep:costOfProject["landAndPlot"].rateOfDAP,
            depAmount:costOfProject["landAndPlot"].amount
        },
        buildingAndConstruction: {
            dep:costOfProject["buildingAndConstruction"].rateOfDAP,
            depAmount:costOfProject["buildingAndConstruction"].amount
        },
        plantAndMachinery: {
            dep:costOfProject["plantAndMachinery"].rateOfDAP,
            depAmount:costOfProject["plantAndMachinery"].amount
        },
        stock: {
            dep:costOfProject["stock"].rateOfDAP,
            depAmount:costOfProject["stock"].amount
        },
        computers: {
            dep:costOfProject["computers"].rateOfDAP,
            depAmount:costOfProject["computers"].amount
        },
        vehicles: {
            dep:costOfProject["vehicles"].rateOfDAP,
            depAmount:costOfProject["vehicles"].amount
        },
        equipment: {
            dep:costOfProject["equipment"].rateOfDAP,
            depAmount:costOfProject["equipment"].amount
        },
        otherAssets: {
            dep:costOfProject["otherAssets"].rateOfDAP,
            depAmount:costOfProject["otherAssets"].amount
        },
        totalDepreciation: {
            depAmount:0
        }
      }
    //   console.log("dep store --> ",depStoreObje)
    
      while(duration>0){
        const newStoreObje={
            landAndPlot:{
                dep:costOfProject["landAndPlot"].rateOfDAP,
                depAmount:costOfProject["landAndPlot"].amount
            },
            buildingAndConstruction: {
                dep:costOfProject["buildingAndConstruction"].rateOfDAP,
                depAmount:costOfProject["buildingAndConstruction"].amount
            },
            plantAndMachinery: {
                dep:costOfProject["plantAndMachinery"].rateOfDAP,
                depAmount:costOfProject["plantAndMachinery"].amount
            },
            stock: {
                dep:costOfProject["stock"].rateOfDAP,
                depAmount:costOfProject["stock"].amount
            },
            computers: {
                dep:costOfProject["computers"].rateOfDAP,
                depAmount:costOfProject["computers"].amount
            },
            vehicles: {
                dep:costOfProject["vehicles"].rateOfDAP,
                depAmount:costOfProject["vehicles"].amount
            },
            equipment: {
                dep:costOfProject["equipment"].rateOfDAP,
                depAmount:costOfProject["equipment"].amount
            },
            otherAssets: {
                dep:costOfProject["otherAssets"].rateOfDAP,
                depAmount:costOfProject["otherAssets"].amount
            },
            totalDepreciation: {
                depAmount:0
            }
          }
         for(let key in depStoreObje){
            if(key !="totalDepreciation"){
            const amount=depStoreObje[key].depAmount;
            // console.log(costOfProject[key])
            const rate=costOfProject[key].rateOfDAP;
       
            let dep=calculateEachDep(amount,rate,month);
            // console.log(amount)
            // console.log("dep store ",depStoreObje[key], +" "+key);
            // console.log("amount ",amount,"rate ",rate," dep ",dep );        
            newStoreObje[key].dep=dep;
            
            newStoreObje[key].depAmount=+(amount-dep).toFixed(2);

            }
         
         }
       
         month=12;
        
         depStoreObje={
            landAndPlot:{
                dep:newStoreObje["landAndPlot"].dep,
                depAmount:newStoreObje["landAndPlot"].depAmount
            },
            buildingAndConstruction: {
                dep:newStoreObje["buildingAndConstruction"].dep,
                depAmount:newStoreObje["buildingAndConstruction"].depAmount
            },
            plantAndMachinery: {
                dep:newStoreObje["plantAndMachinery"].dep,
                depAmount:newStoreObje["plantAndMachinery"].depAmount
            },
            stock: {
                dep:newStoreObje["stock"].dep,
                depAmount:newStoreObje["stock"].depAmount
            },
            computers: {
                dep:newStoreObje["computers"].dep,
                depAmount:newStoreObje["computers"].depAmount
            },
            vehicles: {
                dep:newStoreObje["vehicles"].dep,
                depAmount:newStoreObje["vehicles"].depAmount
            },
            equipment: {
                dep:newStoreObje["equipment"].dep,
                depAmount:newStoreObje["equipment"].depAmount
            },
            otherAssets: {
                dep:newStoreObje["otherAssets"].dep,
                depAmount:newStoreObje["otherAssets"].depAmount
            },
            totalDepreciation: {
                depAmount:0
            }
          }
         
         depArrays.push(newStoreObje);
        
         duration--;
      }

    //   console.log(depArrays)
    
      return depArrays;
}

function calculateEachDep(amount,rate,month){
  
    const dep=+((((amount*rate/100)/12)*month).toFixed(2));

    return dep;
}


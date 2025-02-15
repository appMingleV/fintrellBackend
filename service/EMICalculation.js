import axios from "axios";

export default async function EMICalculation(enterpriseId){  
    try{
    console.log("Enterprise Id ",enterpriseId)
    const enterprise=await axios.get(`http://46.202.164.93:7000/api/enterprise/${enterpriseId}`)
   
    const tenure=enterprise?.data?.data?.tenure;
    console.log("tenure---> ",tenure)
    if(!tenure){
        return undefined;
    }

    const response2=await axios.get(`http://46.202.164.93:7000/api/cma/assumption/${enterpriseId}`)
    const distbur=response2?.data?.data?.disbursementMonthYear;
   

    const response=await axios.get(`http://46.202.164.93:7000/api/cma/meansOfFinance/${enterpriseId}`);

    const data=response?.data?.data;
    const termLoan=data?.termLoan?.amount;
    const roi=data?.termLoan?.roi;
    if(!termLoan || !roi){
        return undefined;
    }

    const Repayment=+(termLoan/tenure).toFixed(2);
    let arraydata=calculate(Repayment,tenure,distbur,termLoan,roi);

    return arraydata;
    }catch(err){
         console.log(err);
        return undefined;
    }
}


function calculate(Repayment,tenure,startDate,termLoan,roi){
    const date=startDate.split("-");
    let month=+date[1];
    const year=+date[0]; 
    let duration=tenure/12;
    console.log(month," ",year," ",date," ",duration);
    const calculObj=[];
    const interest=calculateInteres(termLoan,roi);
    console.log("interest  ",interest);
    let count=month;
    let objeStore={
        principleAmount:termLoan,
        Repayment,
        interest:interest,
        pricipleOutstanding:termLoan-Repayment
    }
    while(count!=4){
        let newObje={
           principleAmount:objeStore.principleAmount,
           Repayment,
           interest:objeStore.interest,
           pricipleOutstanding:objeStore.pricipleOutstanding
       }
        let priAmount=newObje.pricipleOutstanding;
        let interest=calculateInteres(priAmount,roi);
        let pricipleOutstanding=priAmount-Repayment;
        calculObj.push(newObje);
        objeStore={
            principleAmount:priAmount,
            Repayment,
            interest:interest,
            pricipleOutstanding
        }
        count=(count+1)%12;
    }
    let lengthObj=calculObj.length
    let remainingMonth=tenure-lengthObj;
    
    console.log(remainingMonth," object ",calculObj[lengthObj-1].principleAmount);
    let pricilOutStanding=calculObj[lengthObj-1].pricipleOutstanding-Repayment;
    let  remainObj={
            principleAmount:calculObj[lengthObj-1].pricipleOutstanding,
            Repayment,
            interest:calculateInteres(calculObj[lengthObj-1].pricipleOutstanding,roi),
            pricipleOutstanding:pricilOutStanding
    }
    while(remainingMonth>0){
        let newObje={
            principleAmount:remainObj.principleAmount,
            Repayment,
            interest:remainObj.interest,
            pricipleOutstanding:remainObj.pricipleOutstanding
        }
         let priAmount=newObje.pricipleOutstanding;
         let interest=calculateInteres(priAmount,roi);
         let pricipleOutstanding=priAmount-Repayment;
         calculObj.push(newObje);
         remainObj={
             principleAmount:priAmount,
             Repayment,
             interest:interest,
             pricipleOutstanding
         }
         remainingMonth--;
    }
    
 return calculObj;
}


function calculateInteres(Amount,roi){
    return +(((Amount*roi)/100)/12).toFixed(2);
}
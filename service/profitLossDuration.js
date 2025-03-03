import axios from "axios";

export const calculateProfitLoss=async(enterpriseId,financialDataObj)=>{
    try{
      
        const enterprise=await axios.get(`http://46.202.164.93:7000/api/enterprise/${enterpriseId}`)
        const termLoanresponse=await axios.get(`http://46.202.164.93:7000/api/cma/emiCalc/${enterpriseId}`)
        const assuptionResponse=await axios.get(`http://46.202.164.93:7000/api/cma/assumption/${enterpriseId}`);
        const depreciationResponse=await axios.get(`http://46.202.164.93:7000/api/cma/depreciation/${enterpriseId}`)
        
        // console.log(termLoanresponse?.data?.data);
        const dataAssum=assuptionResponse?.data?.data
        const dataTermLoan=termLoanresponse?.data?.data;
        const dataDepreciation=depreciationResponse?.data?.data;

        const split=+dataAssum?.disbursementMonthYear?.split("-")[1];
        const startingTermYear=split>=4?(12-split+4):4-split;
        const tenure=enterprise?.data?.data?.tenure/12;
        
        let domesticRevenue=calculatePercentage(financialDataObj.domesticRevenue || 0);
        
        const arrayData=[];
        
        // openingStock: 100,
        // purchases: 300,
        // labourAndTransport: 50,
        // powerAndFuel: 40,
        // otherPriceCost: 30,
        // closingStock: 80,
        // indirectExpenses: 20
        // otherIncome: 200,
        // cost: {
        //   openingStock: 100,
        //   purchases: 300,
        //   labourAndTransport: 50,
        //   powerAndFuel: 40,
        //   otherPriceCost: 30,
        //   closingStock: 80,
        //   indirectExpenses: 20
        // },
        // otherIncomeEBI: 12,
        // interestAndFinancialCharge: {
        //   cashCredit: 10,
        //   termLoan: 15,
        //   existingLoan: 5,
        //   Depreciation: 25,
        //   profitBeforeTax: 300,
        //   provisionIncomeTax: 50,
        //   profitAfterTax: 250
        // }
        let objetPrevious={
            domesticRevenue:financialDataObj.domesticRevenue,
            otherIncome: financialDataObj.otherIncome || 0,
            cost: {
              openingStock: financialDataObj.cost.openingStock || 0,
              purchases: financialDataObj.cost.purchases || 0,
              labourAndTransport: financialDataObj.cost.labourAndTransport || 0,
              powerAndFuel:financialDataObj.cost.powerAndFuel || 0,
              otherPriceCost: financialDataObj.cost.otherPriceCost || 0,
              closingStock:financialDataObj.cost.closingStock || 0,
              indirectExpenses:financialDataObj.cost.indirectExpenses || 0,
            },
            otherIncomeEBI: financialDataObj.otherIncomeEBI || 0,
            grossProfit: financialDataObj.grossProfit,
            EBITDA: financialDataObj.EBITDA,
            interestAndFinancialCharge: {
              cashCredit: financialDataObj?.interestAndFinancialCharge?.cashCredit || 0,
              termLoan:financialDataObj?.interestAndFinancialCharge?.termLoan ||0 ,
              existingLoan: financialDataObj?.interestAndFinancialCharge?.existingLoan || 0,
              Depreciation: financialDataObj?.interestAndFinancialCharge?.depreciation || 0,
              profitBeforeTax: financialDataObj?.interestAndFinancialCharge?.profitBeforeTax || 0,
              provisionIncomeTax:financialDataObj?.interestAndFinancialCharge?.provisionIncomeTax || 0,
              profitAfterTax: financialDataObj?.interestAndFinancialCharge?.profitAfterTax || 0,
            }
        }
        arrayData.push(objetPrevious);
        for(let i=1;i<tenure;i++){
          
           const otherIncome=objetPrevious.otherIncome || 0;
           const openingStock=objetPrevious.cost.closingStock || 0;
           const purchases=+((domesticRevenue*65)/100).toFixed(2)  || 0;
           const labourAndTransport=+((domesticRevenue*12)/100).toFixed(2) || 0;
           const powerAndFuel=+((domesticRevenue*2)/100).toFixed(2) || 0;
           const otherPriceCost=+((domesticRevenue*4)/100).toFixed(2) || 0;
           const closingStock=+((domesticRevenue*60)/365).toFixed(2) || 0
           const indirectExpenses=+((domesticRevenue*12)/100).toFixed(2) || 0; 
           const grossProfit=calculateGrossProfit(domesticRevenue,otherIncome,openingStock,purchases,labourAndTransport,powerAndFuel,otherPriceCost)
           console.log(domesticRevenue,grossProfit);
           const EBITDA=calculateEBITDA(grossProfit,indirectExpenses)
           const otherIncomeEBI=objetPrevious.otherIncome || 0
           const cashCredit= objetPrevious.interestAndFinancialCharge.cashCredit || 0;
           const termLoan=dataTermLoan[startingTermYear+12].Repayment || 0
           const existingLoan=objetPrevious.interestAndFinancialCharge.existingLoan || 0;
           const Depreciation=calculateDepreciton(dataDepreciation[i]) || 0;
           console.log(Depreciation);
           const profitBeforeTax=(Depreciation+termLoan+cashCredit+existingLoan) || 0;
           const provisionIncomeTax=profitBeforeTax*0.20 || 0;
           const profitAfterTax=(profitBeforeTax-provisionIncomeTax) || 0 
          //  const termLoan  
           const newObject={
            domesticRevenue,
            otherIncome: otherIncome ,
            cost: {
              openingStock: +openingStock,
              purchases: +purchases,
              labourAndTransport: +labourAndTransport,
              powerAndFuel:+powerAndFuel,
              otherPriceCost: +otherPriceCost,
              closingStock:+closingStock,
              indirectExpenses:+indirectExpenses,
            },
            grossProfit:+grossProfit,
            EBITDA:+EBITDA,
            otherIncomeEBI: +otherIncomeEBI*1.1,
            interestAndFinancialCharge: {
              cashCredit: +cashCredit,
              termLoan:+termLoan,
              existingLoan: +existingLoan,
              Depreciation: +Depreciation,
              profitBeforeTax: +profitBeforeTax,
              provisionIncomeTax:+provisionIncomeTax,
              profitAfterTax:+profitAfterTax,
            }
           }
           arrayData.push(newObject);

          objetPrevious={
            otherIncome: +newObject.otherIncome || 0,
            cost: {
              openingStock: +newObject.cost.openingStock || 0,
              purchases: +newObject.cost.purchases || 0,
              labourAndTransport: +newObject.cost.labourAndTransport || 0,
              powerAndFuel:+newObject.cost.powerAndFuel || 0 ,
              otherPriceCost: +newObject.cost.otherPriceCost || 0,
              closingStock: +newObject.cost.closingStock || 0,
              indirectExpenses:+newObject.cost.indirectExpenses || 0,
            },
            otherIncomeEBI: +newObject.otherIncomeEBI || 0,
            interestAndFinancialCharge: {
              cashCredit: +newObject.interestAndFinancialCharge.cashCredit || 0,
              termLoan:+newObject.interestAndFinancialCharge.termLoan ||0 ,
              existingLoan: +newObject.interestAndFinancialCharge.existingLoan || 0,
              Depreciation: +newObject.interestAndFinancialCharge.Depreciation || 0,
              profitBeforeTax: +newObject.interestAndFinancialCharge.profitBeforeTax || 0,
              provisionIncomeTax:+newObject.interestAndFinancialCharge.provisionIncomeTax || 0,
              profitAfterTax: +newObject.interestAndFinancialCharge.profitAfterTax || 0,
            }
        }
        domesticRevenue=calculatePercentage(domesticRevenue);
        }

         console.log(arrayData)
        return "now is pending"
     
    }catch(err){
      console.log(err);
        return undefined;
    }
}
function calculateGrossProfit(domesticRevenue,otherIncome,openingStock,purchases,labourAndTransport,powerAndFuel,closingStock,otherPriceCost){
    const sum=domesticRevenue+(otherIncome || 0);
    let sumCost=(openingStock || 0)+(purchases || 0)+(labourAndTransport|| 0)+(powerAndFuel ||0 )+(otherPriceCost || 0);
    return ((closingStock || 0)+sum)-sumCost;
}

function calculateDepreciton(depreciation){
   let sumDep=0;
   for(let  key in  depreciation){
       sumDep+=depreciation[key].dep || 0;
   }  
   return sumDep;
}
function calculateEBITDA(grossProfit,indirectExpenses){
  return  (grossProfit || 0)-(indirectExpenses || 0)
}

function calculatePercentage(val){
     const domestic=+(val*0.15);
     return +(val+domestic).toFixed(2);
}
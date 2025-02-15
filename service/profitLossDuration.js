import axios from "axios";

export const calculateProfitLoss=async(enterpriseId,financialDataObj)=>{
    try{
        console.log("financial object  is   ",financialDataObj);
        const enterprise=await axios.get(`http://46.202.164.93:7000/api/enterprise/${enterpriseId}`)
        console.log()
        const tenure=enterprise?.data?.data?.tenure/12;
        console.log("tenure is ",tenure)
        let domesticRevenue=calculatePercentage(financialDataObj.domesticRevenue || 0);
        console.log("domestic", domesticRevenue);
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
            otherIncome: financialDataObj.otherIncome,
            cost: {
              openingStock: financialDataObj.cost.openingStock,
              purchases: financialDataObj.cost.purchases,
              labourAndTransport: financialDataObj.cost.labourAndTransport,
              powerAndFuel:financialDataObj.cost.powerAndFuel,
              otherPriceCost: financialDataObj.cost.otherPriceCost,
              closingStock:financialDataObj.cost.closingStock,
              indirectExpenses:financialDataObj.cost.indirectExpenses,
            },
            otherIncomeEBI: financialDataObj.otherIncomeEBI,
            interestAndFinancialCharge: {
              cashCredit: financialDataObj.cashCredit,
              termLoan:financialDataObj.termLoan,
              existingLoan: financialDataObj.existingLoan,
              Depreciation: financialDataObj.depreciation,
              profitBeforeTax: financialDataObj.profitBeforeTax,
              provisionIncomeTax:financialDataObj.provisionIncomeTax,
              profitAfterTax: financialDataObj.profitAfterTax,
            }
        }
        arrayData.push(objetPrevious);
        for(let i=0;i<tenure;i++){
           const newObject={
            otherIncome: objetPrevious.otherIncome,
            cost: {
              openingStock: objetPrevious.cost.closingStock,
              purchases: ((domesticRevenue*65)/100).toFixed(2),
              labourAndTransport: ((domesticRevenue*12)/100).toFixed(2),
              powerAndFuel:((objetPrevious.cost.powerAndFuel*2/100)).toFixed(2),
              otherPriceCost: ((objetPrevious.cost.otherPriceCost*4)/100).toFixed(2),
              closingStock:((objetPrevious.cost.closingStock*60)/100).toFixed(2),
              indirectExpenses:((objetPrevious.cost.indirectExpenses*12)/100).toFixed(2),
            },
            grossProfit:()=>{
                  const sum=domesticRevenue+this.otherIncome;
                  let sumCost=this.objetPrevious.cost.openingStock+this.objetPrevious.cost.purchases+this.objetPrevious.cost.labourAndTransport+this.objetPrevious.cost.powerAndFuel;
                  return (this.objetPrevious.cost.closingStock+sum)-sumCost;
            },
            EBITDA:function(){
                return  domesticRevenue.EBITDA-this.indirectExpenses
            },
            otherIncomeEBI: objetPrevious.otherIncomeEBI,
            interestAndFinancialCharge: {
              cashCredit: objetPrevious.cashCredit,
              termLoan:objetPrevious.termLoan,
              existingLoan: objetPrevious.existingLoan,
              Depreciation: objetPrevious.depreciation,
              profitBeforeTax: objetPrevious.profitBeforeTax,
              provisionIncomeTax:objetPrevious.provisionIncomeTax,
              profitAfterTax: objetPrevious.profitAfterTax,
            }
           }

        }
        return "now is pending"
     
    }catch(err){
        return undefined;
    }
}


function calculatePercentage(val){
     return val*1.15
}
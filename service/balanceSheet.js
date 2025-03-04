import axios from 'axios';


export const balanceSheet=async(enterpriseId,balanceSheet)=>{
     try{
       
        const enterprise=await axios.get(`http://46.202.164.93:7000/api/enterprise/${enterpriseId}`)
        const termLoanresponse=await axios.get(`http://46.202.164.93:7000/api/cma/emiCalc/${enterpriseId}`)
        const assuptionResponse=await axios.get(`http://46.202.164.93:7000/api/cma/assumption/${enterpriseId}`);
        const depreciationResponse=await axios.get(`http://46.202.164.93:7000/api/cma/depreciation/${enterpriseId}`)
        const ResProfitLoss = await axios.get(`http://46.202.164.93:7000/api/cma/tenure/profitLoss/${enterpriseId}`)
        
        // console.log(termLoanresponse?.data?.data);
        const dataAssum=assuptionResponse?.data?.data
        const dataTermLoan=termLoanresponse?.data?.data;
        const dataDepreciation=depreciationResponse?.data?.data;

        const split=+dataAssum?.disbursementMonthYear?.split("-")[1];
        const startingTermYear=split>=4?(12-split+4):4-split;
        const tenure=enterprise?.data?.data?.tenure/12;
      
        for (let year = 0; year < tenure; year++) {
           let purchase = ResProfitLoss?.data?.data[year]?.cost?.purchases;  // Assuming 5% annual increase
           let  stockInHand =ResProfitLoss?.data?.data[year]?.cost?.closingStock;  // Assuming 3% inventory growth
           let sundryCreditor = (purchase * 30) / 365;
           let surplusOrDeficit = (ResProfitLoss?.data?.data[year]?.interestAndFinancialCharge?.profitAfterTax);  // Assuming 7% annual increase
           let sundryDebtors = +((ResProfitLoss?.data?.data[year]?.domesticRevenue * 60) / 365).toFixed(2);;  // Assuming 4% increase in debtor cycle
           let  sumDep = (sumDep * 0.02);  // Assuming 2% increase in depreciation
            let yearData = calculation(exclouding, sumDep, purchase, cashCredit, surplusOrDeficit, stockInHand, sundryDebtors, ownContribution, additionSum, year);
            formDataArray.push(yearData);

            // Simulating future growth
          
        }

        function calculation(exclouding, sumDep, purchase, cashCredit, surplusOrDeficit, stockInHand, sundryDebtors, ownContribution, additionSum, year) {
            console.log(`Calculating year ${year + 1}...`);
        
            const excludingInstallment = +exclouding.toFixed(2);
            const totalSecureLoan = excludingInstallment + (formData?.existingLoan || 0);
            const unsecuredLoan = formData?.unsecuredLoan || 0;
            const governmentFund = formData?.governmentFund || 0;
            const totalUnsecureLoan = unsecuredLoan + governmentFund;
            const totalOutsideLibilities = totalSecureLoan + totalUnsecureLoan;
        
            const sundryCreditor = +((purchase) * 30 / 365).toFixed(2);
            const provisions = +(sundryCreditor * 0.2).toFixed(2);
            const otherCurrentLiabilities = 2.5;
            const totalCurrentLiabilities = +(cashCredit + sundryCreditor + otherCurrentLiabilities + provisions).toFixed(2);
        
            const totalOutsideCurrentLiabilities = +(+totalOutsideLibilities + (+totalCurrentLiabilities)).toFixed(2);
        
            const openingBalance = 20;
            const drawing = 0;
            const anyOtherItems = 0;
            const subTotal = +(openingBalance + anyOtherItems + ownContribution + surplusOrDeficit + drawing).toFixed(2);
            const totalLibilitiesNet = +(totalOutsideCurrentLiabilities + subTotal).toFixed(2);
        
            const cashBank = formData?.cashBank || 0;
            const loanAndAdvance = +((sundryCreditor * 10) / 100).toFixed(2);
            const deposit = formData?.deposit || 0;
            const securityDeposit = +(loanAndAdvance * 4.5).toFixed(2);
            const exportOtherRecievable = formData?.exportOtherRecievable || 0;
            const otherCurrentAssets = +(sundryCreditor / 40).toFixed(2);
        
            const currentSubTotal = +(cashBank + otherCurrentAssets + stockInHand + deposit + securityDeposit + sundryDebtors + exportOtherRecievable).toFixed(2);
            const otherNonCurrentAssets = 0;
            const investments = 0;
            const grossBlock = formData?.grossBlock || 0;
            const addition = additionSum;
            const depreciation = sumDep;
            const netBlock = +((grossBlock + addition) - depreciation).toFixed(2);
            const totalAssets = +(currentSubTotal + investments + otherNonCurrentAssets + netBlock).toFixed(2);
        
            return {
                excludingInstallment,
                totalSecureLoan,
                unsecuredLoan,
                governmentFund,
                stockInHand,
                surplusOrDeficit,
                totalOutsideCurrentLiabilities,
                totalCurrentLiabilities,
                totalUnsecureLoan,
                ownContribution,
                totalOutsideLibilities,
                cashCredit,
                sundryCreditor,
                provisions,
                otherCurrentLiabilities,
                openingBalance,
                drawing,
                anyOtherItems,
                subTotal,
                totalLibilitiesNet,
                cashBank,
                deposit,
                securityDeposit,
                exportOtherRecievable,
                otherCurrentAssets,
                currentSubTotal,
                loanAndAdvance,
                otherNonCurrentAssets,
                investments,
                grossBlock,
                addition,
                depreciation,
                netBlock,
                totalAssets,
                sundryDebtors
            };
        }
     }catch(e){
         console.log("Error in balance sheet",e);
     }
} 


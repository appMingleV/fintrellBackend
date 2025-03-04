import axios from 'axios';


export const balanceSheet=async(enterpriseId)=>{
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
     }catch(e){
         console.log("Error in balance sheet",e);
     }
} 


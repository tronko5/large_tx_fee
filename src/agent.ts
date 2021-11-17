import BigNumber from "bignumber.js";

import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,


} from 'forta-agent'


const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  const txFee = new BigNumber(txEvent.transaction.gas).dividedBy(new BigNumber(txEvent.transaction.gasPrice))
  if (txFee.isGreaterThan(10**18)){
      findings.push(
        Finding.fromObject({
          name: "T00 Large FEE",
          description: `Large TX FEE`,
          alertId: "FORTA-500",
          severity: FindingSeverity.High,
          type: FindingType.Suspicious,
          metadata:{
            txHash:txEvent.hash,
            fee:txFee.toString(16)
          }
  
        })
       )

    
  }    
    

  return findings;
}

export default {
  handleTransaction
}
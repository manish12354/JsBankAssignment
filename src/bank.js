const Account = require("./account.js");
const Bank = function(bankName){
  this.bankName = bankName;
  this.allAccounts = {};
  this.accList = [];
  this.accountNumber = 339500965;
};

Bank.prototype = {
  createAccount: function(holderName,initialBalance){
    let accountNumber = this.accountNumber;
    let account = new Account(holderName,accountNumber,initialBalance);
    this.accList.push(account);
    this.allAccounts[accountNumber]=account;
    this.accountNumber++;
    // console.log(account);
    return account;
  },


  getBalance: function(accountNumber){
    return this.allAccounts[accountNumber].getBalance();
  },


  countAccounts: function(){
    return this.accList.length;
  },


  credit: function(accountNumber,amount){
    this.allAccounts[accountNumber].credit(amount);
    return this.allAccounts[accountNumber].initialBalance;
  },


  debit: function(accountNumber,amount){
    this.allAccounts[accountNumber].debit(amount);
    return this.allAccounts[accountNumber].initialBalance;
  },


  transfer: function(payerAccNum,payeeAccNum,amount) {
    this.allAccounts[payerAccNum].transfer(this.allAccounts[payeeAccNum],amount);
  },


  getTotalAmount: function(){
    let bal =this.initialBalance;
    return this.accList.reduce(function(wholeAmount,secondAccount){
      return wholeAmount+secondAccount.getBalance();
    },0);

    // let wholeAmount = 0;
    // this.accList.forEach(function(element){
    //    wholeAmount += element.getSummary().balance;
    // })
    // return wholeAmount;
  },

  getSummary: function(accountNumber){
    return this.allAccounts[accountNumber].getSummary();
  },

  getStatement: function(accountNumber){
    return this.allAccounts[accountNumber].getStatement();
  },


  getAllCreditsAbove: function(limit,accountNumber){
    return this.allAccounts[accountNumber].getAllCreditsAbove(limit);
  },


  getAllDebitsAbove: function(limit,accountNumber){
    return this.allAccounts[accountNumber].getAllDebitsAbove(limit);
  },

  getAllCreditsBelow: function(limit,accountNumber){
    return this.allAccounts[accountNumber].getAllCreditsBelow(limit);
  },

  getAllDebitsBelow: function(limit,accountNumber){
    return this.allAccounts[accountNumber].getAllDebitsBelow(limit);
  },

  getAllCreditTransaction: function(accountNumber,transactionType){
    return this.allAccounts[accountNumber].getAllCreditTransaction(transactionType);
  },

  getAllDebitTransaction: function(accountNumber,transactionType){
    return this.allAccounts[accountNumber].getAllDebitTransaction(transactionType);
  },

  getAllTransferTransaction: function(accountNumber,transactionType){
    return this.allAccounts[accountNumber].getAllTransferTransaction(transactionType);
  },

  getAllTransfersTo: function(payeeAccNum,payerAccNum){
    return this.allAccounts[payerAccNum].getAllTransfersTo(payeeAccNum);
  },

  getAllTransfersFrom: function(payerAccNum,payeeAccNum){
    return this.allAccounts[payeeAccNum].getAllTransfersFrom(payerAccNum);
  }
}

module.exports = Bank;

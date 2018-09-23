const CreditTransaction = function(amount){
  this.transactionType = "credit";
  this.amount = amount;
};

CreditTransaction.prototype = {
  isCreditTransaction: function(){
    return true;
  },

  isTransferTransaction: function(){
    return false;
  },


  isDebitTransaction: function(){
    return false;
  },

  isTransferedFrom: function(payer){
    return false;
  },


  isCreditAbove: function(limit){
    return this.amount > limit;
  },

  isCreditBelow: function(limit){
    return this.amount < limit;
  },


  isTransferedTo: function(payee){
      return false;
    }
}


const DebitTransaction = function(amount){
  this.transactionType = "debit";
  this.amount = amount;
};

DebitTransaction.prototype = {
  isDebitTransaction: function(){
    return true;
  },

  isCreditTransaction: function(){
    return false;
  },

  isTransferTransaction: function(){
    return false;
  },

  isTransferedFrom: function(payer){
    return false;
  },

  isDebitAbove: function(limit){
    return this.amount > limit;
  },

  isDebitBelow: function(limit){
    return this.amount < limit;
  },


  isTransferedTo: function(payee){
    return false;
  }

}


const TransferedTo = function(payee,amount){
  this.transactionType = "transfer";
  this.amount = amount;
  this.transferedTo = payee;
}

TransferedTo.prototype = {
  isTransferedTo: function(payee){
    return this.transferedTo==payee;
  },

  isTransferedFrom: function(payer){
    return false;
  },


  isTransferTransaction: function(){
    return true;
  },

  isCreditTransaction: function(){
    return false;
  },


  isDebitTransaction: function(){
    return false;
  },

  isTransferAbove: function(limit){
    return this.amount > limit;
  },

  isTransferBelow: function(limit){
    return this.amount < limit;
  }
}



const TransferedFrom = function(payer,amount){
  this.transactionType = "transfer";
  this.amount = amount;
  this.transferedFrom = payer;
}


TransferedFrom.prototype = {
  isTransferedFrom: function(payer){
    return this.transferedFrom==payer;
  },


  isTransferTransaction: function(){
    return true;
  },

  isCreditTransaction: function(){
    return false;
  },


  isDebitTransaction: function(){
    return false;
  },

  isTransferAbove: function(limit){
    return this.amount > limit;
  },

  isTransferBelow: function(limit){
    return this.amount < limit;
  },


  isTransferedTo: function(payee){
    return false;
  }
}


exports.CreditTransaction = CreditTransaction;
exports.DebitTransaction = DebitTransaction;
exports.TransferedTo = TransferedTo;
exports.TransferedFrom = TransferedFrom;

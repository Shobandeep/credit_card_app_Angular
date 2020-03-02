export interface User {
    firstName: string;
    lastName: string;
    // JWT token used to authenticate a user
    authToken: string;
    // used by (admin)cardtransactions component to fetch transactions
    card: any;
    // used by (admin)transactiondetails component to fetch transaction details
    transactionId: string;

    // the following is exclusive to admin
    isAdmin: boolean;
    currentClient: any;
    // since we want /admin_card_transaction_details to still work (is user manually
    // navigates there, it should show the last thing they were looking at so we can't overwrite the values
    // that component is using), which is why this object is needed
    vendorTransactionDetails: any;
}


// used by the register component to register a user
export interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}




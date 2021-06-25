
// Handling Products AppState

import AuthModel from "../Models/AuthModel";
import CustomerModel from "../Models/CustomerModel";

// Products AppState - המידע ברמת האפליקציה הקשור למוצרים - אלו בעצם כל המוצרים:
export class AuthState {
    public auth: CustomerModel = new CustomerModel(); // We're going to create initial object
    public constructor() {
        const stored = JSON.parse(localStorage.getItem("auth"));
        if(stored) {
            this.auth = stored;
        } 
    }
}

// ----------------------------------------------------------------------------------

// Products Action Types - אלו פעולות ניתן לבצע על המידע ברמת האפליקציה:
export enum AuthActionType {
    SetAuth="SetAuth",
    RemoveAuth="RemoveAuth", 
}

// ----------------------------------------------------------------------------------

// Product Action - אובייקט המכיל את המידע עבור הפעולה שאנו מבצעים על המידע ברמת הפליקציה
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // payload?: any; if the payload can be empty.
}

// ----------------------------------------------------------------------------------

// Products Action Creators - מתאים עבור כל פעולה Action ומחזירות אובייקט payload-פונקציות המקבלות את ה

export function setAuthAction(auth: AuthModel): AuthAction {
    return { type: AuthActionType.SetAuth, payload: auth };
}

export function removeAuthAction(): AuthAction {
    return { type: AuthActionType.RemoveAuth};
}

// ----------------------------------------------------------------------------------

// Products Reducer - פונקציה המבצעת את הפעולה בפועל
export function AuthReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    
    const newState = {...currentState}; // Spread Operator - שכפול אובייקט

    switch(action.type) {
        case AuthActionType.SetAuth:
            newState.auth = action.payload; 
            localStorage.setItem("auth", JSON.stringify(newState.auth));
            break;
        case AuthActionType.RemoveAuth:
            newState.auth = new CustomerModel();
            localStorage.removeItem("auth"); // clear user from the local storage.
            break;
    }

    return newState;
}

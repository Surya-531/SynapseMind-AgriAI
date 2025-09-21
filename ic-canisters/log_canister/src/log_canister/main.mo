// src/log_canister/main.mo
actor LogCanister {


public type Record = {
id: Nat;
user : Text; // principal (as text)
inputHash : Text; // hashed JSON or base64 string
prediction : Text; // predicted value or recommended crop
ts : Int; // unix timestamp in seconds
};


stable var nextId : Nat = 0;
stable var records : [Record] = [];


public query func getRecords() : async [Record] {
return records;
};


public func addRecord(user : Text, inputHash : Text, prediction : Text, ts : Int) : async Nat {
let id = nextId;
nextId += 1;
let r : Record = { id = id; user = user; inputHash = inputHash; prediction = prediction; ts = ts };
records := Array.append(records, [r]);
return id;
};
};
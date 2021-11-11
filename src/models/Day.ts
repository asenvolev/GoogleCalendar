export interface Event {
    date:string;
    event:string;
}

export interface Day { 
    date:number,
    events:Event[]
}

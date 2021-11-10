export interface Event {
    date:string;
    event:string;
}

export interface Day { 
    date:number,
    isToday:boolean,
    isChosen:boolean,
    events:Event[]
}

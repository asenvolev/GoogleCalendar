export interface DateEvent {
    date: string;
    event: string;
}

export interface EventsResponse { 
    events: DateEvent[];
}

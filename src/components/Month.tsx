import { FC } from "react";
import styled from 'styled-components'
import Day from "./Day";

interface Props{
}

const Month : FC<Props> = () => {

    const getDaysOfMonth = (month: number,year: number): number => {
        return new Date(year, month, 0).getDate();
    };

    const daysFromMonth = Array.from({length: getDaysOfMonth(11,2021)}, (val, key) => { return <Day id={key+1}/>});

    return <MonthContainer>{daysFromMonth}</MonthContainer>;
};

export default Month;

const MonthContainer = styled.div`
    display: flex;
    flex-wrap:wrap;
    max-width:210px;
`;
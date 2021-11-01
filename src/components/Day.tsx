import { FC } from "react";
import styled from 'styled-components'

interface Props{
    id: number
}

const Day : FC<Props> = ({id}) => {

    return <DayContainer>{id}</DayContainer>;
};

export default Day;

const DayContainer = styled.div`
    width:30px;
    height:30px;
    text-align:center;
`;
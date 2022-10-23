import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import DayWeekButton from "./DayWeekButton"
import Footer from "../../components/Footer"
import GenericInput from "../../components/GenericInput"
import Header from "../../components/Header"
import MyContext from "../../context/MyContext"
import createNewHabit from "./createNewHabit"
import textButtonSave from "./textButtonSave"
import axios from "axios"
import MyHabit from "./MyHabit"


export default function HabitsPage() {
    const daysWeek = [{ day: "D", id: 0 }, { day: "S", id: 1 }, { day: "T", id: 2 }, { day: "Q", id: 3 }, { day: "Q", id: 4 }, { day: "S", id: 5 }, { day: "S", id: 6 }]
    const [newHabitData, setNewHabitData] = useState({ name: "", days: [] })
    const [stateNewHabit, setStateNewHabit] = useState(false)
    const { inputState, setInputState, config, myHabitsList, setMyHabitsList } = useContext(MyContext)
    const habitsListIsEmpty = myHabitsList.length

    useEffect(() => {
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config)
            .then((response) => (setMyHabitsList(response.data)))

    }, [stateNewHabit])

    return (
        <Container>
            <Header />

            <HabitsContainer stateNewHabit={stateNewHabit} inputState={inputState} habitsListIsEmpty={habitsListIsEmpty}>
                <div className="myHabitsHeaderContainer">
                    <div>Meus Hábitos</div>
                    <button onClick={() => setStateNewHabit(!stateNewHabit)}>+</button>
                </div>

                <div className="newHabitsContainer">

                    <GenericInput text="nome do hábito" type="text" value={newHabitData.name} onchange={(e) => (setNewHabitData({ ...newHabitData, name: e.target.value }))} />

                    {daysWeek.map((obj, index) => (<DayWeekButton key={index} day={obj.day} id={obj.id} newHabitData={newHabitData} setNewHabitData={setNewHabitData} />))}

                    <div className="buttonsNewHabits">
                        <button className="cancelButton" onClick={() => (setStateNewHabit(false))} disabled={inputState}>Cancelar</button>
                        <button className="saveButton" onClick={() => createNewHabit(setInputState, setNewHabitData, setStateNewHabit, config, newHabitData, inputState)} disabled={inputState}>{textButtonSave(inputState)}</button>
                    </div>

                </div>

                <div className="messageNoneHabitContainer">
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </div>

                <div className="habitsList">
                  {myHabitsList.map((habit) => (<MyHabit key={habit.id} daysWeek={daysWeek} name={habit.name} id={habit.id}/>))}
                </div>
            </HabitsContainer>

            <Footer />
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const HabitsContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 80vh;
    @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&family=Righteous&display=swap');
    font-family: 'Lexend Deca', sans-serif;

    .myHabitsHeaderContainer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        font-size: 25px;
        background-color: yellow;
        padding: 0 20px;

        div{
            color: #126BA5;
        }

        button{
            background-color: #52B6FF;
            color: #FFFFFF;
            border: none;
            border-radius: 5px;
            font-size: 27px;
            padding:5px 15px;
        }
    }

    .newHabitsContainer{
        display: ${props => props.stateNewHabit === false ? "none" : ""};
        background-color: #FFFFFF;
        width: 90vw;
        height: auto;
        border-radius: 5px;
        margin-top: 2vh;
        padding: 15px;

        .buttonsNewHabits{
            display: flex;
            justify-content: end;
            margin-top: 25px;

            .cancelButton{
            font-size: 16px;
            background-color: #FFFFFF;
            color: #52B6FF;
            border: none;
            border-radius: 5px;
            height: 35px;
            width: 85px;
            display: flex;
            align-items: center;
          
        }

        .saveButton{
            font-size: 16px;
            background-color: ${props => props.inputState === false ? "#52B6FF" : "#86CCFF"};
            color: #FFFFFF;
            border: none;
            border-radius: 5px;
            height: 35px;
            width: 85px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        }

        
    }

    .messageNoneHabitContainer{
        padding: 0 20px;
        margin-top: 3vh;
        font-size: 18px;
        text-align: justify;
        color: #666666;
        display: ${props => props.habitsListIsEmpty === 0 ? "" : "none"};
    }

    .habitsList{
        background-color: red;
        width: 100vw;
        margin-top: 3vh;
        height: 80vh;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 30px;
    }

`
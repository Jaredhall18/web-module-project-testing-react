import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from '../Display';

import fetchShow from '../../api/fetchShow'

//Setting a mock for our fetchShow API call
jest.mock('../../api/fetchShow')

const show = {
    name: "Stranger Things",
    summary: "Test Summary",
    seasons: [
        {
            id:"1",
            name: "Season 1",
            episodes: [],
        },
        {
         id:"2",
         name: "Season 2",
         episodes: [],
     },
     {
         id:"3",
         name: "Season 3",
         episodes: [],
     },
    ]
 }


test("Render Display Component", () => {
    render(<Display/>)
})


test("Does data display on button click", async () => {
    
    fetchShow.mockResolvedValueOnce(show)
    //Arrange: render our component
    render(<Display />)

    //Act
    const showButton = screen.getByRole("button")
    userEvent.click(showButton)
    //Assert

    const showContainer = await screen.findByTestId("show-container")

    expect(showContainer).toBeInTheDocument();
})

test("Do the seasons appear after fetch button is pressed", async () => {
    
    fetchShow.mockResolvedValueOnce(show)
    //Arrange: render our component
    render(<Display  />)

    //Act
    const showButton = screen.getByRole("button")
    userEvent.click(showButton)
    const seasonOptions= await screen.findAllByTestId("season-option")
    
    //Assert
    expect(seasonOptions).toHaveLength(3);
})

test("Do the seasons appear after fetch button is pressed", async () => {
    const displayFunction = jest.fn();
    fetchShow.mockResolvedValueOnce(show)
    //Arrange: render our component
    render(<Display displayFunc={displayFunction} />)

    //Act
    const showButton = screen.getByRole("button")
    userEvent.click(showButton)

    //Assert
    await waitFor(()=>expect(displayFunction).toHaveBeenCalledTimes(1));
    
})






///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
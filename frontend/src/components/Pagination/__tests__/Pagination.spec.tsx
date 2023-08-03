import { render, screen } from "@testing-library/react";
import Pagination from "..";
import "@testing-library/jest-dom/extend-expect"; // Importe esta linha para usar a função toBeInTheDocument()
import userEvent from "@testing-library/user-event";
import { debug } from "console";

describe('Pagination tests', () => {

    test('Should render pagination', () => {
        //ARRANGE
        const pageCount = 3;
        const range = 3;
    
        //ACT
        render(
            <Pagination pageCount={pageCount} range={range} />
        );
        
        //ASSERT

        const page1 = screen.getByText('1');
        const page2 = screen.getByText('2');
        const page3 = screen.getByText('3');
        const page4 = screen.queryByText('4');

        expect(page1).toBeInTheDocument();
        expect(page1).toHaveClass("pagination-link-active");

        expect(page2).toBeInTheDocument();
        expect(page2).not.toHaveClass("pagination-link-active");

        expect(page3).toBeInTheDocument();
        expect(page3).not.toHaveClass("pagination-link-active");

        expect(page4).not.toBeInTheDocument();
    }); 

    test('next arrow should call onChange', () => {
        //ARRANGE
        const pageCount = 3;
        const range = 3;
        const onChange = jest.fn();
    
        //ACT
        render(
            <Pagination 
                pageCount={pageCount} 
                range={range} 
                onChange={onChange}
            />
        );

        screen.debug();
        
        //ASSERT
        const arrowNext = screen.getByTestId("arrow-next");
        userEvent.click(arrowNext);

        expect(onChange).toHaveBeenCalledWith(1);

    }); 

    test('previous arrow should call onChange', () => {
        //ARRANGE
        const pageCount = 3;
        const range = 3;
        const onChange = jest.fn();
        const forcePage = 1;
    
        //ACT
        render(
            <Pagination 
                pageCount={pageCount} 
                range={range} 
                onChange={onChange}
                forcePage={forcePage}
            />
        );

        screen.debug();
        
        //ASSERT
        const arrowPrevious = screen.getByTestId("arrow-previous");

        userEvent.click(arrowPrevious);
        expect(onChange).toHaveBeenCalledWith(0);

    }); 

})
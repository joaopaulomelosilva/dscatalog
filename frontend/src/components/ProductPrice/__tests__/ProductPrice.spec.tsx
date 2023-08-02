import { render, screen } from "@testing-library/react";
import ProductPrice from "..";
import "@testing-library/jest-dom/extend-expect"; // Importe esta linha para usar a função toBeInTheDocument()


test('should render ProductPrice', () => {

     //ARRANGE
     const price = 10.1;
     const textRS = "R$";

     //ACT
     render(
         <ProductPrice price={price} />
     );

     //ASSERT
     expect(screen.getByText(textRS)).toBeInTheDocument();
     expect(screen.getByText('10,10')).toBeInTheDocument();

})
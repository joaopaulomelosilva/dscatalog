import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Importe esta linha para usar a função toBeInTheDocument()
import Catalog from "..";
import { Router } from 'react-router-dom';
import history from 'Util/history';
import { server } from './fixtures';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Should render Catalog with products', async() => {
    //ARRANGE
    
    //ACT
    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );
    
    //ASSERT
    expect(screen.getByText("Catálogo de Produtos")).toBeInTheDocument();
    
    await waitFor(() => {
        expect(screen.getByText('Macbook Pro')).toBeInTheDocument();
    })
    
    screen.debug;

}); 
import { act, render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import "@testing-library/jest-dom/extend-expect"; // Importe esta linha para usar a função toBeInTheDocument()
import { Router, useParams } from "react-router-dom";
import history from 'Util/history';
import userEvent from "@testing-library/user-event";
import { productResponse, server } from "./fixtures";
import selectEvent from "react-select-event";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('Product Form create tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    })

    test('Should show toast and redirect when submit form correctly', async() => {

        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

         const nameInput = screen.getByTestId("name");
         const priceInput = screen.getByTestId("price");
         const imgUrlInput = screen.getByTestId("imgUrl");
         const descriptionInput = screen.getByTestId("description");

         const submitButton = screen.getByRole("button", { name: /salvar/i});

         //No caso de simular um select, precisa instalar o selectEvent
         //Deve ser mocado com o backend para pegar as categorias

         await waitFor(() => {
            const categoriesInput = screen.getByLabelText("Categorias");
            selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
         })
         

         //Simulação de digitação

         userEvent.type(nameInput, 'Computador');
         userEvent.type(priceInput, '5000.12');
         userEvent.type(imgUrlInput, 'https://www.lg.com/br/images/computadores/md07571821/DZ-01.jpg');
         userEvent.type(descriptionInput, 'Computador muito bom');
        
         // Clique no Botão
         userEvent.click(submitButton);

         // como verificar se o Toast apareceu
         await waitFor(() => {
            const toastElement = screen.getByText("Produto Cadastrado com Sucesso!");
            expect(toastElement).toBeInTheDocument();
         })

         // Verificar se foi redirecionado
         expect(history.location.pathname).toEqual('/admin/products');
         
    }); 



    test('Should show 5 validation messages when just clicking submit', async() => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        );

         const submitButton = screen.getByRole("button", { name: /salvar/i});

         // Clique no Botão
         userEvent.click(submitButton);

         await waitFor(() => {
            const messages = screen.getAllByText('Campo obrigatório');
            expect(messages).toHaveLength(5);
         })
         
    }); 



    test('Should clear validation messages when filling out the form correctly', async() => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        );

        // Parte 1 - Provocar os erros 
         const submitButton = screen.getByRole("button", { name: /salvar/i});

         // Clique no Botão
         userEvent.click(submitButton);

         await waitFor(() => {
            const messages = screen.getAllByText('Campo obrigatório');
            expect(messages).toHaveLength(5);
         });

        // Parte 2 - preencher o formulário
        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://www.lg.com/br/images/computadores/md07571821/DZ-01.jpg');
        userEvent.type(descriptionInput, 'Computador muito bom');

        await waitFor(() => {
            const messages2 = screen.queryAllByText('Campo obrigatório');
            expect(messages2).toHaveLength(0);
         });
         
    }); 

})


describe('Product form update tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: '1'
        })
    })

    test('Should show toast and redirect when submit form correctly', async() => {

        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );
        
        await waitFor(() => {
            const nameInput = screen.getByTestId("name");
            const priceInput = screen.getByTestId("price");
            const imgUrlInput = screen.getByTestId("imgUrl");
            const descriptionInput = screen.getByTestId("description");
            const formElement = screen.getByTestId("form");
   
            expect(nameInput).toHaveValue(productResponse.name);
            expect(priceInput).toHaveValue(String(productResponse.price));
            expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
            expect(descriptionInput).toHaveValue(productResponse.description);

            const ids = productResponse.categories.map(x =>String(x.id));
            expect(formElement).toHaveFormValues({categories: ids});
        });
        
        const submitButton = screen.getByRole("button", { name: /salvar/i});

          // Clique no Botão
          userEvent.click(submitButton);

          // como verificar se o Toast apareceu
          await waitFor(() => {
             const toastElement = screen.getByText("Produto Cadastrado com Sucesso!");
             expect(toastElement).toBeInTheDocument();
          })
 
          // Verificar se foi redirecionado
          expect(history.location.pathname).toEqual('/admin/products');
    }); 
});

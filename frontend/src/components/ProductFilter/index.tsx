import './styles.css';
import { ReactComponent as SearchIcon } from '../../assets/images/Union.svg';
import { Category } from 'types/category';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { requestBackend } from 'Util/requests';

export type productFilterData = {
    name: string;
    category: Category | null;
}

type Props = {
    onSubmitFilter : (data: productFilterData) => void;
}

const Productfilter = ( {onSubmitFilter} : Props) => {

    const [selectCategories, setSelectCategories] = useState<Category[]>([]);

    const { register, handleSubmit, setValue, getValues, control } = useForm<productFilterData>();

    
        const onSubmit = (formData : productFilterData) => {
            onSubmitFilter(formData);
        };

        const handleFormClear = () => {
            setValue('name', '');
            setValue('category', null)
        }

        const handleChangeCategory = (value : Category)=>{
            

            const obj : productFilterData ={
                name: getValues('name'),
                category: getValues('category')
            }
            onSubmitFilter(obj);
        }

        useEffect(() => {
            requestBackend({url: '/categories'})
            .then(response => {
                setSelectCategories(response.data.content);
            })
        }, []);


    return (
        <div className='base-card product-filter-container'>
            
            <form onSubmit={handleSubmit(onSubmit)} className='product-filter-form'>
                <div className='product-filter-name-container'>
                    <input
                        {...register("name", {
                            required: 'Campo obrigatório',
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Nome do produto"
                        name="name"
                    />

                    <button className='product-filter-search-icon'>
                        <SearchIcon />
                    </button>

                </div>
                <div className='product-filter-bottom-container'>
                    <div className='product-filter-catergory-container' >
                        <Controller
                            name='category'
                            control={control}
                            render={({field}) => (

                                <Select {...field}
                                options={selectCategories}
                                isClearable
                                placeholder="Categoria"
                                classNamePrefix="product-filter-select"

                                onChange={value => handleChangeCategory(value as Category)}

                                getOptionLabel={(category: Category) => category.name}
                                getOptionValue={(category: Category) => String(category.id)}
                                />

                            )}
                        />
                    </div>

                    <button className='btn btn-outline-secondary btn-product-filter-clear' onClick={handleFormClear}>LIMPAR <span className='btn-product-filter-word'>FILTRO</span></button>
                </div>
            </form>
        </div>
    );
}

export default Productfilter;
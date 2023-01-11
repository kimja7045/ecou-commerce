import { render } from '@testing-library/react'

// import BasketListPage from "../pages/baskets/index";
import BasketListPage from "@pages/baskets";

describe('BasketListPage', ()=> {
    it('renders tasks', ()=>{
        if(typeof window !== 'object') return;
        render((
            <BasketListPage/>
        ))
    })
})

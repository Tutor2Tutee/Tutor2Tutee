import React from 'react';
import {BrowserRouter} from "react-router-dom";
import App from '../shared/App';

const Root = () => {
    // 추후에 리덕스는 여기에 적용하기!
    return <>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </>
};
export default Root
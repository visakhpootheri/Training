import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page1 from "./component/Headersample";
import Page2 from './component/Winners';
export default function Navigation(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Page1/>}></Route>
            <Route path="/Winners" element={<Page2/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
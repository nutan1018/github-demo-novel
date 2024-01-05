import {HashRouter, Routes, Route} from "react-router-dom"
import MyDashboard from "./dashboard";
import MyProduct from "./productlist";
import MyOrder from "./orderlist";
import NewProduct from "./newproduct";
import SellerHeader from "./sellerheader";



const SellerModule = () =>{
    return(
        <HashRouter>
            <SellerHeader/>
            <Routes>
                <Route exact path="/" element={<MyDashboard/>} />
                <Route exact path="/productlist" element={<MyProduct/>} />
                <Route exact path="/newproduct" element={<NewProduct/>} />
                <Route exact path="/order" element={<MyOrder/>} />
            </Routes>
        </HashRouter>
    )
}

export default SellerModule;
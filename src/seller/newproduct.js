
import { useState } from "react";
import swal from "sweetalert";

const NewProduct = () =>{
    
    let [pname, pickName] = useState("");
    let [pprice, pickPrice] = useState("");
    let[pphoto, pickPhoto] = useState("");
    let [pdetails, pickDetails] = useState("");

    //state variable for error message

    let [nameError, updateNameError] = useState("");
    let [priceError, updatePriceError] = useState("");
    let [photoError, updatePhotoError] = useState("");
    let [detailsError, updateDetailsError] = useState("");
 

   const save =() =>{

    let formStatus = true;

    if(pname==""){
        formStatus=false;
        updateNameError("invalid product name!");
    }else{
        updateNameError("");
    
    }

    if( isNaN(pprice) || pprice=="")
    {
        formStatus = false;
        updatePriceError("Invalid price!");
    } else{
            updatePriceError("")
         }

    if (pphoto=="")
    {
        formStatus=false;
        updatePhotoError("invalid Photo url!");
    }else{
        updatePhotoError("");  
    }


    if (pdetails.length < 15 || pdetails.length > 100)
    {
        formStatus=false;
        updateDetailsError("Enter details between 15 to 100 chars !");
    }else{
        updateDetailsError("");  
    }


    //API fetching

    if(formStatus==true){
      let newproduct = {
        name:pname,
        price:pprice,
        photo : pphoto,
        details:pdetails,
        seller: localStorage.getItem("sellerid")
      };

//send data from client to server--i am comming request

    let url = "http://localhost:1234/product";
    let postdata = {
        headers:{'Content-Type':'application/json'},
        method:'POST',
        body:JSON.stringify(newproduct)
    }


    //fetch data from server

    fetch(url, postdata)
    .then(response=> response.json())   
    .then(pinfo=>{
        swal(pname, " Save Successfully...", "success");
        pickName(""); pickPrice(""); pickPhoto(""); pickDetails("");
    })

   }else{
    swal("invalid Input", "Please Enter Product Details", "warning")
   }
}




    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center mb-4">
                    <h1 className="text-primary"> 
                    <i className="fa fa-plus"></i> Enter Product Details
                    </h1>
                </div>
                <div className="col-lg-4 mb-3">
                    <label> Enter Product Name </label>
                    <input type="text" className="form-control" value={pname}
                    onChange={obj=>pickName(obj.target.value)}
                    />
                    <small className="text-danger">{nameError}</small>
                </div>
                <div className="col-lg-4 mb-3">
                    <label> Enter Product Price </label>
                    <input type="number" className="form-control" value={pprice}
                    onChange={obj=>pickPrice(obj.target.value)}/>
                    <small className="text-danger">{priceError}</small>
                    
                    
                </div>
                <div className="col-lg-4 mb-3">
                    <label> Enter Product Photo </label>
                    <input type="text" className="form-control" value={pphoto}
                    onChange={obj=>pickPhoto(obj.target.value)}/>
                    <small className="text-danger">{photoError}</small>
                </div>

                
                <div className="col-lg-9 mb-3">
                    <label> Enter Product Details </label>
                    <textarea className="form-control" value={pdetails}
                    onChange={obj=>pickDetails(obj.target.value)}></textarea>
                    <small className="text-danger">{detailsError}</small>
                </div>
                <div className="col-lg-3 mb-3 text-center">
                    <br/>
                    <button className="btn btn-danger" onClick={save}> Save Product</button>
                </div>
            </div>
        </div>
    )
   }


export default NewProduct;
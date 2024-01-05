
import { useState , useEffect } from "react";
import swal from "sweetalert";



const Myhome = () =>{
    let[allproduct, updateProduct] = useState( [] );
let sellerid = localStorage.getItem("sellerid");

const getProduct = () =>{
    let url = "http://localhost:1234/product";
    fetch(url)
    .then(response=>response.json())
    .then(productArray=>{
        updateProduct( productArray.reverse() );
    })
}

useEffect(()=>{
    getProduct();
},[1]);

const addtocart = async (productinfo)=>{
    productinfo["qty"]=1;
    let url = "http://localhost:1234/cart";
    let postdata = {
        headers:{'content-Type':'application/json'},
        method:"POST",
        body:JSON.stringify(productinfo)
    }
     try{
    await fetch(url,postdata)
    .then(response=>response.json())
    .then(pinfo=>{
        swal(productinfo.name, "Added in your cart", "success");
    })
     }
     catch(error){
        swal(productinfo.name, "Already in your cart", "warning");
     }

}
return(
    <>
    <div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="apple.jfif" class="d-block w-100" height="400" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Shop from Home</h5>
        <p>The online shop is open 24*7 all the days.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="car.jfif" className="d-block w-100" height="400" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>50% Discount on All Items</h5>
        <p>If you can buy 4 you will get 8</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="grapes.jfif" class="d-block w-100" height="400" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Kids, Femail, Male, All Type of foods</h5>
        <p>You can return in instantly if you are not okay with food</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    <div className="container-fluid mt-4">
       <div className="row">
        <div className="col-lg-8"></div>
        <div className="col-lg-4">
            <input type="text" className="form-control" placeholder="search.."/>
        </div>


       </div>
       <div className="row mt-4 mb-5">
          {
            allproduct.map((product,index)=>{
                return(
                    <div className="col-lg-3 mb-5" key={index}>
                        <div className="p-4">
                            <h4 className="text-center text-primary">{product.name}</h4>
                            <img src={product.photo} className="ronded" height="200" width="100%"/>
                            <p className="mt-2 mb-2"> {product.details}</p>
                            <p className="p-2 rounded border text-primary text-center"> 
                            Rs. {product.price}
                            </p>
                            <p className="text-center d-grid">
                                <button className="btn btn-danger btn-sm" onClick={addtocart.bind(this, product)}>
                                    <i className="fa fa-plus"></i> Add to cart
                                </button>
                            </p>

                        </div>
                    </div>
                )
            })
          }
       </div>
    </div>
    </>
)
}

export default Myhome;
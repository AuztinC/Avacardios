import React, { useState } from "react";

const CreateProduct = ()=>{
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(5)
    const [units, setUnits] = useState('')
    
    function submit(ev){
        ev.preventDefault()
    }
    
    return (
    <div className="create-product">
        <form onSubmit={ submit }>
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" value={ name } onChange={ (ev)=>setName(ev.target.value) }/>
            
            <label htmlFor="desc">Product Description</label>
            <input type="text" id="desc" value={ desc  } onChange={ (ev)=>setDesc(ev.target.value) }/>
            
            <label htmlFor="price">Product Price</label>
            <input type="number" id="price" value={ price } onChange={ (ev)=>setPrice(ev.target.value) }/>
            
            <label htmlFor="units">Sold Units</label>
            <input type="text" id="units" value={ units } onChange={ (ev)=>setUnits(ev.target.value) }/>
            
            
            <button><label htmlFor="file">Product Image</label></button>
            <input type="file" accept="image/*" id="file"/>
            <button>Submit Product</button>
        </form>
    </div>)
}
export default CreateProduct
import React, { useState, useRef, useEffect } from "react";

const CreateProduct = ({ createProduct })=>{
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(5)
    const [units, setUnits] = useState('')
    const [imgStr, setImgStr] = useState('../assets/newProduct.png')
    const [vip, setVip] = useState(false)
    const fileEl = useRef()
    const imgEl = useRef()
    
    function updateFile(ev){
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', ()=>{
            setImgStr( reader.result )
        })
    }
    
    function submit(ev){
        ev.preventDefault()
        const product = {
            name,
            price,
            description: desc,
            amount: units,
            image: imgStr,
            vip
        }
        createProduct(product)
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
            
            <label htmlFor="vip">Vip Product?
            <input type="checkbox" value={ vip } onChange={ ()=> setVip(!vip) } id="vip"/>
            </label>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <img style={{maxHeight: '200px', maxWidth: '200px', textAlign: 'center', marginBottom: '10px'}} src={imgStr} alt='Product Image' ref={ imgEl }/>
                
                <button style={{maxWidth: 'fit-content'}}><label  htmlFor="file">Product Image</label></button>
                <input type="file" accept="image/*" id="file" ref={ fileEl } onChange={ updateFile }/>
            
            </div>
            <button disabled={ !name || !price || !desc || !units || imgStr.includes('newProduct') ? true: false}>Submit Product</button>
        </form>
    </div>)
}
export default CreateProduct
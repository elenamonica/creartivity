import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listProducts, saveProduct } from '../actions/productActions';

function ProductsScreen(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [seller, setSeller] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} =  productSave;
    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;
    const dispatch = useDispatch();

    useEffect (() => 
    {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave]);

    const openModal = (product) => {
            setModalVisible(true);
            setId(product._id);
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setSeller(product.seller);
            setDescription(product.description);
            setCategory(product.category);
            setCountInStock(product.countInStock);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id: id,name, price, image, 
            seller, category, description, countInStock}));
    }

    return <div className = "content content-margined">
        <div className = "product-header">
            <h3>Products</h3>
            <button onClick={() =>openModal({})}>Create Product</button>
        </div>
        {modalVisible && <div className="form">
        <form onSubmit = {submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2>Create Product</h2>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Product name
                    </label>
                    <input type = "text" value = {name} name = "name" id = "name" onChange ={(e) => setName(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="price">
                        Product price
                    </label>
                    <input type = "text" value = {price} name = "price" id = "price" onChange ={(e) => setPrice(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="image">
                        Product image
                    </label>
                    <input type = "text" value = {image} name = "image" id = "image" onChange ={(e) => setImage(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="seller">
                        Product seller
                    </label>
                    <input type = "text" value = {seller} name = "seller" id = "seller" onChange ={(e) => setSeller(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="category">
                        Product category
                    </label>
                    <input type = "text" value = {category} name = "category" id = "category" onChange ={(e) => setCategory(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="countInStock">
                        Product count in stock
                    </label>
                    <input type = "text" value = {countInStock} name = "countInStock" id = "countInStock" onChange ={(e) => setCountInStock(e.target.value)}/>
                </li>
                <li>
                    <label htmlFor="description">
                        Product description
                    </label>
                    <textarea type = "text" value = {description} name = "description" id = "description" onChange ={(e) => setDescription(e.target.value)}/>
                </li>
                <li>
                    <button type = "submit" className = "button primary">
                        { id ? "Update":"Create"}
                    </button>
                </li>
                <li>
                    <button type = "button" onClick = {() => setModalVisible(false)} className = "button secondary">
                        Back
                    </button>
                </li>
            </ul>
        </form>
    </div>} 
    
    <div className ="product-list">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {products.map(product => (<tr>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>{product.seller}</td>
                                            <td>
                                                <button onClick={()=> openModal(product)}>
                                                    Edit
                                                </button>
                                                <button>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
}
export default ProductsScreen;
import React from 'react'
import { useCart, useDispatchContext } from '../Components/ContextReducer'
import trash from "../imggg/860829.png"

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchContext();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail")
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        }
        );
        console.log("Order Response:",response)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type='button' className='btn p-0'><img src={trash} alt='Delete' style={{ width: "18px", filter: "invert(1)" }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /> </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>TotalPrice:{totalPrice}/-</h1></div>
                <div>
                    <button className='btn btn-success mt-5' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
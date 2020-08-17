import React, {useState,useEffect} from 'react'
import { loadCart, cartEmpty } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import {getmeToken ,processPayment } from './helper/paymentbhelper'
import {createOrder} from './helper/orderHelper'
import { isAutheticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react' 

const Paymentb = ({products,setReload = f => f, reload = undefined}) => {

  const [info,setInfo] = useState({
   loading:false,
   success:false,
   clientToken:null, 
   error:"",
   instance:{}
  })

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const getToken = (userId,token) => {
    getmeToken(userId,token).then(info => {
      //console.log("INFORMATION ",info)
      if(info.error){
        setInfo({...info,error:info.error});
      } else {
        const clientToken = info.clientToken
        setInfo({clientToken});
      }
    })
  }

  useEffect(() => {
    getToken(userId,token)
  },[])

  const onPurchase = () => {
    setInfo({loading: true});
    let nonce;
    let gteNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce
      const paymentData = {
        paymentMethodNounce: nonce,
        amount:getAmount()
      };
      processPayment(userId,token,paymentData).then(response => {
        
        setInfo({...info,loading:false,success:response.success})
        const orderData = {
          products:products,
          transaction_id:response.transaction.id,
          amount:response.transaction.amount
        }
        console.log(orderData)
        createOrder(userId,token,orderData);
        cartEmpty(() => {})
        setReload(!reload);
      }).catch(err => setInfo({loading:false,success:false}))
    })
  }

  const getAmount = () => {
    let amount = 0;
    products.map(porduct => {
      amount += porduct.price;
    })
    return amount;
  }


  const showBTdropIn = () => {
    return(
      <div>
        {info.clientToken !== null && products.length > 0 ? (<div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button onClick={onPurchase} className='btn btn-block btn-success'>Buy</button>
        </div>) : (
          <h3>Please Login or add something to cart</h3>
        )}
      </div>
    )
  }

  return (
    <div>

      {showBTdropIn()}
    </div>
  )
}

export default Paymentb;
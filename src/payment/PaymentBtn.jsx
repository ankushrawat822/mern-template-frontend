import { Button } from '@material-tailwind/react'
import React , {useState} from 'react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const PaymentBtn = ({email}) => {

    const [amount, setamount] = useState(500)

    const navigate = useNavigate()

    const handlePayment = async () =>{
      try {
        const res = await fetch(`http://localhost:8080/api/order` , {
          method : 'POST',
          headers : {
             'content-type' : 'application/json',  
          },
          body : JSON.stringify({
            amount
          })
        })

        const data = await res.json();
        console.log(data)
        handleVerifyPayment(data.data)
      } catch (error) {
          console.log(error)
      }
    }

    const handleVerifyPayment = async (data)=>{
      const options = {
        key : import.meta.env.RAZORPAY_KEY_ID,
        amount : data.amount,
        currency : data.currency,
        name : 'Ankush Rawat',
        description : 'Test Transaction',
        order_id : data.id,
        handler: async (response)=>{
          console.log("response" , response)

          try{
            const res = await axios.post("http://localhost:8080/api/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: email // Include the email in the request body
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              console.log(res)

            if(res){
              console.log("payment successfull")
              toast.success("Payment Successfull")


            //   navigate('/payment-success')
            }
             
          }catch(err){
            console.log(err)
          }
        }



      }


      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    }

  return (
     <>
        <Toaster richColors  position="bottom-center" />
         <Button onClick={handlePayment}>Pay</Button>
     </>
  )
}

export default PaymentBtn
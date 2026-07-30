import { useState } from "react"
import {CommonForm} from "@/components/common/CommonForm.jsx";
import { registerFormControls } from "../../config/form_controller.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { registerUser } from "@/features/auth/authThunk.js";

const initialRegisterState = {
  username: "",
  email: "",
  password: ""
}

function Register() {
  const [formData, setFormData] = useState(initialRegisterState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  function handleRegSubmit(event){
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      console.log(formData);
      
      if(data?.payload?.success){
        toast.success(data?.payload?.message)
        navigate("/auth/login");
      }
      else {
       toast.error(data?.payload?.message)
      }
    })
  }
  // console.log(formData);
  
  return (
    <div className="mx-auto w-max max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign up for shopping
        </h1>
        <p className="mt-2">
          Already have an account
          <Link className="font-medium ml-2 text-primary hover:underline"
          to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleRegSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
}

export default Register
import { loginFormControls } from "@/config/form_controller.js";
import { Link } from "react-router-dom";
import {CommonForm} from "@/components/common/CommonForm.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import  {useNavigate} from "react-router-dom"
import { loginUser } from "@/features/auth/authThunk";
import { toast } from "sonner";

const loginInitialState = {
    email: "",
    password: ""
}

function Login() {
  const [formData, setFormData] = useState(loginInitialState);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function onSubmit(event){
    event.preventDefault();
    dispatch(loginUser(formData))
      .then((data) => {
        // console.log("Full thunk action data",data);
        // console.log("Backend response metada",data.payload);
        // console.log("User object From response payload", data.payload.data);
        
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          // navigate();
        } 
        else {
          toast.error(data?.payload?.message);
        }
      })
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Log into Shopingram
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register">
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
      />
    </div>
  );
}

export default Login

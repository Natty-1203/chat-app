import { ToastContainer } from "react-toastify"

export function Notification(){
    return(
        <div className="notification">
           <ToastContainer position= "bottom-right" />
        </div>
    )
}
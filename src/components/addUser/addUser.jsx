import "./addUser.css"

export function AddUser(){
    return(
        <div className="addUser">
             <form>
                <input type="text" placeholder="user name" name="userName" />
                <button>search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Jane Doe</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    )
}

import "./detail.css"

export function Detail(){
    return(
        <div className="detail"> 
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>user name</h2>
                <p>user description</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>chat settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                 <div className="option">
                    <div className="title">
                        <span>privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                 <div className="option">
                    <div className="title">
                        <span>shared photo</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                 <img src="" alt="" />
                            <span>photo_2024_2.png</span>
                            </div>
                           <img src="./download.png" alt="" className="icons" />
                        </div>
                        
                    </div>

                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                 <img src="" alt="" />
                            <span>photo_2024_2.png</span>
                            </div>
                           <img src="./download.png" alt="" className="icons" />
                        </div>
                        
                    </div>

                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                 <img src="" alt="" />
                            <span>photo_2024_2.png</span>
                            </div>
                           <img src="./download.png" alt="" className="icons" />
                        </div>
                        
                    </div>
                    
                </div>

                 <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                <button>Block User</button>
                <button className="logout">Log out</button>
                
            </div>
        </div>
        
        
    )
}
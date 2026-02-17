import {Link } from "react-router-dom";

function Layout({children}){
    return(
        <div style={{display:"flex", minHeight:"100vh"}}>

            {/* Sidebar */}

            <div 
            style={{
                width: "220px",
                backgroundColor:"#1e1e2f",
                color: "white",
                padding: "20px",
            }}
            >
                <h2>CV Builder</h2>

                <nav style={{marginTop:"30px"}}>
                    <p>
                        <Link to="/editor" style={{color:"white", textDecoration: "none"}} >
                            Editor
                        </Link>
                    </p>
                    <p>
                    <Link to="/preview" style={{ color: "white", textDecoration: "none" }}>
                    Preview
                    </Link>
                    </p>
                </nav>
            </div>

             {/* Main Content */}

             <div
             style={{
                flex:1,
                padding:"40px",
                backgroundColor: "#f4f6f8",
             }}
             >
                {children}
             </div>
        </div>
    )
}

export default Layout
import React from "react";  //Navbar componenet
import "../index.css";

const Navbar = () => {
    return ( //a simple list with links to each page
    
<ul>
<li><a href="/">Home</a></li>
<li><a href="/Artists">Artists</a></li>
<li><a href="/Albums">Albums</a></li>
<li><a href="/Songs">Songs</a></li>
</ul>

    );
};

export default Navbar;



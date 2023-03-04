import React from 'react';
import bookmarkLogo from "../../../assets/images/bookmark-logo.png";

function Snackbar({title, status}) {
    return (
        <div style={{height: 32, width: "100%", backgroundColor: status === "addBookmark" ? "#388E3C" : "#D32F2F",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.06)",
            display: "flex", alignItems: "center", justifyContent: "center"}}>
                <img style={{height: 18, width: 20, marginTop: 2, marginRight: "0.2em", objectFit: "contain"}}
                     src={bookmarkLogo} alt="searchLogo"/>
                <p style={{
                    fontStyle: "Roboto", fontWeight: 500, fontSize: 14, color: "#FFFFFF"
                }}>
                    {title}
                </p>
        </div>
    );
}

export default Snackbar;
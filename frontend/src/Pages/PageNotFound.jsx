import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


const Pagenotfound = () => {
    return (
        <>
            <Header />
            <div className="pnf">
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading">Oops ! Page Not Found</h2>
                <Link to="/" className="pnf-btn">
                    Go Back
                </Link>
            </div>
            <Footer />
        </>
    );
};

export default Pagenotfound;
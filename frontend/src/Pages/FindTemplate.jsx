import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TemplateSelector from "./TempComponent/TemplateSelector";
import './TempComponent/Style.css';

const FindTemplate = () => {
    return (
        <>
            <Header />
            <div className="find-template-container">
                <div className="mt-5">
                    <h1>All Templates</h1>
                    <div className="template-selector-wrapper">
                        <TemplateSelector />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default FindTemplate;

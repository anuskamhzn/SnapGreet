import React from "react";
import { Link } from "react-router-dom";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Contactus from "./js/ContactUsForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Contact = () => {
    return (
        <>
            <Header />
            <Contactus></Contactus>
            <Footer />
        </>

    );
};

export default Contact;
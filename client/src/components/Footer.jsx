import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-3">
                <p className="text-sm">
                    &copy; Blink Commerce Private Limited, 2016-2025
                </p>
                <div className="flex items-center gap-6 justify-center text-2xl">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-transform hover:scale-110">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-transform hover:scale-110">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-transform hover:scale-110">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-transform hover:scale-110">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

import React from "react";

const Footer = () => {
  return (
    // <!-- Footer section with social media icons and newsletter sign-up -->
    <footer className="dark:bg-dark dark:text-white bg-light text-dark h-10 -bottom-full w-full m-0 p-0">
      <div className=" container px-6 flex-grow">
        {/* Social media icons and newsletter sign-up */}
        {/* ... */}

        {/* Copyright section */}
        <div className="w-full text-center mt-4">
          © 2023 Copyright :
          <a className="text-white px-2" href="https://tailwind-elements.com/">
            Vanamala
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

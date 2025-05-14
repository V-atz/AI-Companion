import React from "react";

function Contact() {
  return (
    <div className="flex h-[605.5px] flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-playfair font-semibold text-[#1a1a1a] mb-4">
        Contact Us
      </h1>
      <p className="text-base sm:text-lg text-[#4b4b4b] mb-8 max-w-xl">
        Have any questions or feedback? We'd love to hear from you.
      </p>
      <a
        href="mailto:developervatsal7@gmail.com"
        className="px-6 py-3 bg-[#1a1a1a] text-white font-medium rounded-full shadow-md hover:bg-[#333] transition"
      >
        Send an Email
      </a>
    </div>
  );
}

export default Contact;
import React from "react";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import Header from "../Components/Header";
import Layout from "../Layout/Layout";

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Email Our Team",
      info: "If you are an investor and ready to fund this dream, email us right away.",
      icon: FiMail,
      contact: "info@conestoga14.com",
    },
    {
      id: 2,
      title: "Call Us",
      info: "Call us if you need updates on the App.",
      icon: FiPhoneCall,
      contact: "+1-416-564-8594",
    },
    {
      id: 3,
      title: "Location",
      info: "Conestoga--HomerWatson-Ontario-Canada",
      icon: FiMapPin,
      contact: "",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Header title="Contact Us" />
        <div className="flex justify-center my-10">
          <form className="w-full max-w-lg bg-dry border border-border shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 ">
              <label
                className="block text-bright text-sm font-bold mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className="shadow appearance-none border bg-border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                rows="5"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                className="bg-subMain hover:bg-subMainHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-col p-6 bg-dry rounded-lg text-center"
            >
              <span className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-main text-bright">
                <item.icon />
              </span>
              <h5 className="text-lg font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-6">
                {item.info}
                <br />
                {item.contact && (
                  <a href={`mailto:${item.contact}`} className="text-bright">
                    {item.contact}
                  </a>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;

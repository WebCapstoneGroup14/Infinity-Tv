import React from "react";
import Header from "../Components/Header";
import Layout from "./../Layout/Layout";

function AboutUs() {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Header title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to Infinity TV!
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Infinity TV was created by Patrick, Smeet, and Manthan as part
                  of our Capstone project in Web Development. Our mission is to
                  deliver an unparalleled streaming experience, allowing you to
                  watch movies unlimitedly—hence the name "Infinity TV." Our
                  journey began with a shared vision: to build a platform that
                  brings endless entertainment to movie lovers everywhere. We
                  are passionate about movies and technology, and we aim to
                  merge these passions to create something extraordinary.
                  Infinity TV offers a vast library of films, accessible
                  anytime, anywhere, ensuring you never run out of options for
                  your next movie night. Join us as we redefine the way you
                  watch movies. Welcome to a world of infinite entertainment.
                  Welcome to Infinity TV.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8 ">
                <div className="p-8 bg-dry rounded-lg border border-solid border-subMain">
                  <span className="text-3xl block font-extrabold">
                    $1 Million
                  </span>
                  <h4 className="text-lg font-semibold my-2">
                    Investors With Money
                  </h4>
                  <p className="mb-0 text-text leading-7 text-sm ">
                    Investors Are Needed. So we can expand with your money
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg border border-solid border-subMain">
                  <span className="text-3xl block font-extrabold">
                    Any Investor
                  </span>
                  <h4 className="text-lg font-semibold my-2">
                    Buy Into InfinityTV
                  </h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    We need to reach new fronts, bringing us closer to our
                    audience
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/images/about.png"
              alt="aboutus"
              className="w-full xl:block hidden h-header rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;

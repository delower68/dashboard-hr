import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div>
      <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-700 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          {/* <FooterSmall absolute /> */}
        </section>
    </div>
  );
};

export default AuthLayout;

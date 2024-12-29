import React from 'react';

const Footer = () => {
  return (
    <footer className=" border-softly border-t bg-[#FAFAFA] p-5 md:px-0">
      <div className="max-w-[1200px] mx-auto flex justify-between flex-col md:flex-row">
        <p className="text-gray-400">© 2024 냠냠로그. All rights reserved.</p>
        <ul className="flex space-x-3 text-gray-400">
          <li className='after:content-["|"] after:ml-[10px]'>김민지</li>
          <li className='after:content-["|"] after:ml-[10px]'>박산하</li>
          <li className='after:content-["|"] after:ml-[10px]'>박가나</li>
          <li className='after:content-["|"] after:ml-[10px]'>박은영</li>
          <li>이지원</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import MyPageModal from './mypage/MyPageModal';
import useAuthStore from '@/store/authStore';
import useAuthListener from '@/hooks/useAuthListener';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import { handleLogout } from '@/app/signin/actions';

const Header = () => {
  const { isLogin, logOut } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useAuthListener();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleClientLogout = async () => {
    await handleLogout();
    logOut();
    window.location.href = '/';
  };

  return (
    <header className="px-5 sticky top-0 bg-white shadow-md py-4 z-50 xl:px-0">
      <div className="relative flex items-center mx-auto max-w-[1200px] font-bold">
        <Link href="/">
          <img src="/img/logo.svg" className="max-w-10" alt="냠냠로그 로고" />
        </Link>
        <nav className="flex gap-3 mx-auto md:gap-5">
          <Link href="/calendar">나의 식단달력</Link>
          <Link href="/todaysmeal">오늘의 식단</Link>
        </nav>
        {/* mo일시 토글버튼 노출 */}
        {isLogin ? (
          <button className="absolute right-0 text-xl lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoMdClose /> : <IoIosMenu />}
          </button>
        ) : null}
        {/* 로그인여부에 따른 ui 분기처리 */}
        {!isLogin ? (
          <Link href="/signin" className="flex items-center gap-2">
            <IoMdLogIn className="mb-[2px]" />
            로그인
          </Link>
        ) : (
          // 로그인한 유저만 보임
          <div
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } absolute top-[calc(100%+18px)] right-0 gap-5 flex-col bg-primary rounded-md p-2 items-center text-white md:flex-row md:flex md:static md:bg-transparent md:rounded-none md:p-0 md:text-[#333]`}
          >
            <button type="button" className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
              <MdOutlinePersonOutline className="text-xl" />
              마이페이지
            </button>
            <button className="flex items-center gap-2" onClick={handleClientLogout}>
              <RiLogoutCircleLine className="mb-[2px]" />
              로그아웃
            </button>
          </div>
        )}
      </div>
      <MyPageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;

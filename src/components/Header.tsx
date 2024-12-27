'use client';

import { useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import MyPageModal from './mypage/MyPageModal';
import useAuthStore from '@/store/authStore';

const Header = () => {
  const { user, isLogin, logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(user);

  const router = useRouter();

  const supabase = createClient();

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: '로그아웃 하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#7EB369',
      confirmButtonText: '로그아웃',
      cancelButtonText: '취소'
    });

    if (result.isConfirmed) {
      try {
        await supabase.auth.signOut();
        logout();
        Swal.fire({
          icon: 'success',
          title: '로그아웃 성공',
          text: '로그아웃 되었습니다'
        });
        router.push('/');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '로그아웃 실패',
          text: '로그아웃이 실패하였습니다.'
        });
        console.error(error);
      }
    }
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="flex items-center justify-between mx-auto max-w-[1200px] font-bold">
        <Link href="/">
          <img src="/logo.svg" className="max-w-10" alt="냠냠로그 로고" />
        </Link>
        <nav className="flex gap-5">
          <Link href="/todaysmeal">오늘의 식단</Link>
          <Link href="/calendar">나의 식단달력</Link>
        </nav>

        {/* 로그인 안한 유저 */}
        {!isLogin ? (
          <Link href="/signin" className="flex items-center gap-2">
            <IoMdLogIn className="mb-[2px]" />
            로그인
          </Link>
        ) : (
          // 로그인한 유저
          <div className="flex gap-5">
            <button type="button" className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
              <MdOutlinePersonOutline className="text-xl" />
              마이페이지
            </button>
            <button className="flex items-center gap-2" onClick={handleLogout}>
              <RiLogoutCircleLine className="mb-[2px]" />
              로그아웃
            </button>
          </div>
        )}
      </div>

      {/* 마이페이지 모달 */}
      <MyPageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;

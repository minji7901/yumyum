'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { IoMdLogIn } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import MyPageModal from './MyPageModal';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import Swal from 'sweetalert2';
import { useLoginContext } from '@/context/LoginProvider';

const Header = () => {
  const { logout, isLogin } = useLoginContext();
  const { loading, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

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
      const supabase = createClient();
      await supabase.auth.signOut();
      Swal.fire({
        icon: 'success',
        title: '로그아웃 성공',
        text: '로그아웃 되었습니다'
      });
      logout();
      router.push('/');
    }
  };

  if (loading) return <Loading />;

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
        {!user ? (
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

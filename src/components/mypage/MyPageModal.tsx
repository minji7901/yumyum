import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { createClient } from '@/utils/supabase/client';
import useAuthStore from '@/store/authStore';

interface MyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyPageModal: React.FC<MyPageModalProps> = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuthStore();
  const [newNickname, setNewNickname] = useState<string>('');
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);

  if (!isOpen || !user) return null;

  const supabase = createClient();

  // 닉네임 변경
  const handleNicknameChange = async () => {
    if (!newNickname.trim()) {
      Swal.fire({
        icon: 'error',
        title: '닉네임 변경 실패',
        text: '닉네임을 입력해주세요.'
      });
    }

    try {
      const { error } = await supabase.from('users').update({ nickname: newNickname }).eq('id', user.id);

      if (error) {
        console.error(error.message);
        Swal.fire({
          icon: 'error',
          title: '닉네임 변경 실패',
          text: '닉네임 변경 중 문제가 발생했습니다.'
        });
      }

      Swal.fire({
        icon: 'success',
        title: '닉네임 변경 성공',
        text: '닉네임이 변경되었습니다.'
      });

      setIsEditingNickname(false);

      user.nickname = newNickname;
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '닉네임 변경 실패',
        text: '예기치 않은 오류가 발생했습니다.'
      });
    }
  };

  // 회원 탈퇴
  const handleDeleteAccount = async () => {
    if (!user?.id) return;

    const result = await Swal.fire({
      icon: 'warning',
      title: '정말로 탈퇴하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#7EB369',
      confirmButtonText: '탈퇴',
      cancelButtonText: '취소'
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch('/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: '회원탈퇴 실패',
          text: errorData.error
        });
        return;
      }

      const responseData = await response.json();
      Swal.fire({
        icon: 'success',
        title: '회원 탈퇴',
        text: responseData.message
      });

      await supabase.auth.signOut();
      setUser(null);
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '회원 탈퇴 실패',
        text: '오류가 발생했습니다.'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        <button className="absolute right-5" onClick={onClose}>
          <IoMdClose className="text-2xl" />
        </button>
        <h1 className="common-title">마이페이지</h1>
        <div className="flex justify-center items-center gap-2 mt-5">
          {isEditingNickname ? (
            <>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="border border-softly rounded px-3 py-2 w-full focus:outline-primary"
              />
              <button onClick={handleNicknameChange}>
                <FaCheck className="text-primary" />
              </button>
            </>
          ) : (
            <>
              <strong className="text-xl">{user.nickname === null ? '사용자님' : user.nickname}</strong>
              <button
                type="button"
                className="text-xl"
                onClick={() => {
                  setNewNickname(user.nickname);
                  setIsEditingNickname(true);
                }}
              >
                <CiEdit />
              </button>
            </>
          )}
        </div>
        <p className="text-gray-400 text-center mt-3">{user.email}</p>
        <button onClick={handleDeleteAccount} className="flex ml-auto mt-10 font-bold text-red-500 hover:underline">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPageModal;

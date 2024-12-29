'use client';

import useAuthStore from '@/store/authStore';
import React from 'react';

const Title = ({ children }: { children: string }) => {
  const { user } = useAuthStore();

  return (
    <h1 className="common-title">
      {user?.nickname || '사용자'}
      {children}
    </h1>
  );
};

export default Title;

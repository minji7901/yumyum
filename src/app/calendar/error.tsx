'use client';
import { useRouter } from 'next/navigation';
import React, { startTransition, useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="h-[calc(100vh-166px)] flex flex-col items-center justify-center md:h-[calc(100vh-142px)]">
      <h1 className="common-title">나의 식단달력 페이지 에러</h1>
      <p className="mt-5 mb-7">
        <strong>에러 내용 : </strong>
        {error.message}
      </p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
        className="border border-primary text-primary px-5 py-2 rounded-full font-bold"
      >
        다시 시도하기
      </button>
    </div>
  );
}

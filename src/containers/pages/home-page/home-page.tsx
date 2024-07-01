import { useRef } from 'react';

import { router } from '@/app.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useNickname } from '@/shared/hooks/use-nickname.ts';

export const HomePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setNickname } = useNickname();
  const handleStartQuiz = async () => {
    if (!inputRef?.current?.value) return;
    setNickname(inputRef?.current?.value);
    await router.navigate('/quiz');
  };

  return (
    <div className='flex w-full max-w-[600px] flex-col gap-4 p-6'>
      <div className='text-center text-2xl font-black text-primary'>
        Привет! Это небольшой квиз по React. Чтобы начать введи свой никнейм.
      </div>

      <Input
        ref={inputRef}
        className='w-full'
        placeholder='Введи свой никнейм'
      />

      <Button className='w-full' onClick={handleStartQuiz}>
        Начать
      </Button>
    </div>
  );
};

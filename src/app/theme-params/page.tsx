'use client';

import { ReactNode, useEffect, useState } from 'react';
import { miniApp, themeParams, useSignal } from '@telegram-apps/sdk-react';

interface PageProps {
  back?: boolean;
  children: ReactNode;
}

export default function Page({ back = false, children }: PageProps) {
  const tp = useSignal(themeParams.state); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!tp) return;

    // Определяем светлую или тёмную тему
    const bgColor = tp.bg_color || '#ffffff';
    const isLight = bgColor.toLowerCase() === '#ffffff';
    setIsDarkMode(!isLight);

    // Устанавливаем фон приложения
    miniApp.setBackgroundColor(bgColor);

    // Настраиваем верхний системный бар
    miniApp.setHeaderColor(isLight ? 'bg_color' : 'secondary_bg_color');
  }, [tp]);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: tp?.bg_color || '#ffffff',
        color: tp?.text_color || (isDarkMode ? '#ffffff' : '#000000'),
      }}
    >
      {children}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { miniApp, themeParams, useSignal } from '@telegram-apps/sdk-react';

export default function ThemeParamsPage() {
  const tp = useSignal(themeParams.state); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!tp) return;

    const bgColor = tp.bg_color || '#ffffff';
    const isLight = bgColor.toLowerCase() === '#ffffff';
    setIsDarkMode(!isLight);

    miniApp.setBackgroundColor(bgColor);
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
      <h1 className="text-xl font-bold p-4">Theme Params Page</h1>
      {/* Здесь можно рендерить контент страницы */}
    </div>
  );
}
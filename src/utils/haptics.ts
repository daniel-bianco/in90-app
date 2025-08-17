// utils/haptics.ts
import { hapticFeedback } from '@telegram-apps/sdk-react';

export function triggerHaptic(
  type: 'impact' | 'notification' | 'selection',
  style: 'light' | 'medium' | 'heavy' = 'light'
) {
  if (!hapticFeedback) return;

  switch (type) {
    case 'impact':
      hapticFeedback.impactOccurred(style);
      break;
    case 'notification':
      hapticFeedback.notificationOccurred(style);
      break;
    case 'selection':
      hapticFeedback.selectionChanged();
      break;
  }
}
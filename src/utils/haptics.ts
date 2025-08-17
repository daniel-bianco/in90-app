// utils/haptics.ts
import { hapticFeedback } from '@telegram-apps/sdk-react';

type HapticType = 'impact' | 'notification' | 'selection';
type ImpactStyle = 'light' | 'medium' | 'heavy';
type NotificationStyle = 'success' | 'warning' | 'error';

export function triggerHaptic(
  type: HapticType,
  style?: ImpactStyle | NotificationStyle
) {
  if (!hapticFeedback) return;

  switch (type) {
    case 'impact':
      hapticFeedback.impactOccurred((style || 'light') as ImpactStyle);
      break;
    case 'notification':
      // Для уведомлений нужно использовать только корректные значения
      hapticFeedback.notificationOccurred((style || 'success') as NotificationStyle);
      break;
    case 'selection':
      hapticFeedback.selectionChanged();
      break;
  }
}
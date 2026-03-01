/**
 * Единый конфиг анимаций появления (эталон — Portfolio).
 * Используется во всех виджетах для одинакового поведения.
 */

export const ANIMATION = {
  /** IntersectionObserver: отступ снизу и порог видимости */
  observer: {
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.3,
  },
  /** Блок-заголовок секции */
  header: {
    from: { opacity: 0, y: 56 },
    to: { duration: 0.85, ease: "power2.out" as const },
  },
  /** Второй блок (карусель, карточки и т.д.) */
  secondary: {
    from: { opacity: 0, y: 72 },
    to: { duration: 0.9, delay: 0.18, ease: "power2.out" as const },
  },
  /** Элементы с stagger (карточки, пункты) */
  stagger: {
    duration: 0.9,
    stagger: 0.08,
    ease: "power2.out" as const,
  },
  /** Внутренние анимации (Road number/text, Step картинки) */
  inner: {
    duration: 0.85,
    ease: "power2.out" as const,
  },
} as const;

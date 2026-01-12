import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect that works on both client and server (SSR-safe)
 * Uses useLayoutEffect on client and useEffect on server to avoid warnings
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

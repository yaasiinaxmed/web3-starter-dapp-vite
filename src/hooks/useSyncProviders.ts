import { useSyncExternalStore } from "react";
import { store } from "./store";

// Hook to synchronize external wallet provider store with React component
export const useSyncProviders = () => 
  useSyncExternalStore(store.subscribe, store.value, store.value);
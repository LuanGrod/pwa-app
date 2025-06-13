import { useState } from "react";

interface DrawerProps {
  openDrawer: (key: string) => void;
}

export function useKeyDrawer({openDrawer}: DrawerProps) {
  const [drawerKey, setDrawerKey] = useState<string | null>(null);

  const handleOpenDrawer = async (key: string) => {
    setDrawerKey(key);
    
    await openDrawer(key);
  };

  return {
    drawerKey,
    setDrawerKey,
    handleOpenDrawer
  };
}


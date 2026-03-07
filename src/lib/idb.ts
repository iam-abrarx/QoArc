export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('QoarcAssetsDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('assets')) {
        db.createObjectStore('assets', { keyPath: 'id' });
      }
    };
  });
};

export const saveAssetToDB = async (id: string, file: File): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assets'], 'readwrite');
    const store = transaction.objectStore('assets');
    const request = store.put({ id, file, name: file.name, type: file.type });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getAssetFromDB = async (id: string): Promise<File | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['assets'], 'readonly');
    const store = transaction.objectStore('assets');
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result ? request.result.file : null);
    request.onerror = () => reject(request.error);
  });
};

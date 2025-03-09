// Firebase 服務

// Firebase 配置
// 請替換為您的 Firebase 項目配置
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// 初始化 Firebase
export async function initFirebase(): Promise<any> {
  try {
    // 動態導入 Firebase 模塊
    const { initializeApp } = await import('firebase/app');
    const { getAnalytics } = await import('firebase/analytics');
    
    // 初始化 Firebase
    const app = initializeApp(firebaseConfig);
    // 初始化 Analytics，但不使用返回值
    getAnalytics(app);
    
    console.log('Firebase 初始化成功');
    
    return app;
  } catch (error) {
    console.error('Firebase 初始化失敗:', error);
    throw error;
  }
}

// 用戶認證
export async function registerUser(email: string, password: string): Promise<any> {
  try {
    const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('註冊失敗:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string): Promise<any> {
  try {
    const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('登入失敗:', error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    const { getAuth, signOut } = await import('firebase/auth');
    const auth = getAuth();
    await signOut(auth);
  } catch (error) {
    console.error('登出失敗:', error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<any> {
  const { getAuth } = await import('firebase/auth');
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// Firestore 數據庫操作
export async function saveContactForm(formData: any): Promise<string> {
  try {
    const { getFirestore, collection, addDoc } = await import('firebase/firestore');
    const db = getFirestore();
    const docRef = await addDoc(collection(db, 'contactForms'), {
      ...formData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('保存表單失敗:', error);
    throw error;
  }
}

export async function saveBooking(bookingData: any): Promise<string> {
  try {
    const { getFirestore, collection, addDoc } = await import('firebase/firestore');
    const db = getFirestore();
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('保存預約失敗:', error);
    throw error;
  }
}

export async function getUserBookings(userId: string): Promise<any[]> {
  try {
    const { getFirestore, collection, query, where, getDocs } = await import('firebase/firestore');
    const db = getFirestore();
    const q = query(collection(db, 'bookings'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const bookings: any[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('獲取用戶預約失敗:', error);
    throw error;
  }
}

// Firebase Storage 操作
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const storage = getStorage();
    const storageRef = ref(storage, path);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('上傳圖片失敗:', error);
    throw error;
  }
} 
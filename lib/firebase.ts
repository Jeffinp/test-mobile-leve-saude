import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Configuração do Firebase para o aplicativo web.
 * As variáveis de ambiente são usadas para armazenar informações sensíveis.
 * @constant
 * @type {object}
 * @property {string} apiKey - Chave da API do Firebase.
 * @property {string} authDomain - Domínio de autenticação do Firebase.
 * @property {string} projectId - ID do projeto Firebase.
 * @property {string} storageBucket - Bucket de armazenamento do Firebase.
 * @property {string} messagingSenderId - ID do remetente de mensagens do Firebase.
 * @property {string} appId - ID do aplicativo Firebase.
 */
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

/**
 * Inicializa o aplicativo Firebase com a configuração fornecida.
 * @constant
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * Obtém a instância de autenticação do Firebase.
 * @constant
 * @type {Auth}
 */
export const auth = getAuth(app);
/**
 * Obtém a instância do Firestore (banco de dados) do Firebase.
 * @constant
 * @type {Firestore}
 */
export const db = getFirestore(app);

// Em src/context/AuthContext.tsx
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

/**
 * Define a interface para o tipo de contexto de autenticação.
 * @interface AuthContextType
 * @property {User | null} currentUser - O objeto do usuário autenticado, ou null se não houver usuário.
 * @property {boolean} loading - Indica se o estado de autenticação está sendo carregado.
 * @property {() => Promise<void>} logout - Função para realizar o logout do usuário.
 */
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

/**
 * Cria o contexto de autenticação.
 * @type {React.Context<AuthContextType | undefined>}
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provedor de autenticação que gerencia o estado do usuário autenticado.
 * Ele observa as mudanças no estado de autenticação do Firebase e disponibiliza o usuário atual e o status de carregamento para os componentes filhos.
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos que terão acesso ao contexto de autenticação.
 * @returns {JSX.Element} O provedor de contexto de autenticação.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /**
   * Estado para armazenar o usuário autenticado.
   * @type {[User | null, Function]} currentUser - O objeto do usuário autenticado.
   */
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  /**
   * Estado para controlar o status de carregamento da autenticação.
   * @type {[boolean, Function]} loading - Indica se o estado de autenticação está sendo carregado.
   */
  const [loading, setLoading] = useState(true);

  /**
   * Função para realizar o logout do usuário.
   * @returns {Promise<void>} Uma promessa que é resolvida quando o logout é concluído.
   */
  const logout = async (): Promise<void> => {
    return signOut(auth);
  };

  /**
   * Efeito colateral que observa as mudanças no estado de autenticação do Firebase.
   * Define o usuário atual e atualiza o status de carregamento.
   * Retorna uma função de unsubscribe para limpar o listener.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   * Objeto de valor do contexto que será fornecido aos consumidores.
   * @type {AuthContextType}
   */
  const value = {
    currentUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para consumir o contexto de autenticação.
 * Lança um erro se usado fora de um AuthProvider.
 * @returns {AuthContextType} O objeto de contexto de autenticação.
 * @throws {Error} Se o hook for usado fora de um AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

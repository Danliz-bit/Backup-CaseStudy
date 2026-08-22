import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const defaultAccounts = [
  'Clara Dela Cruz',
  'Angel Smith',
  'Taylor Doe',
  'Liza Contastino',
  'Mark Bautista',
  'Diego Marasigan',
].map((givenName, index) => ({ id: index + 1, givenName }));

const initialState = {
  user: null,
  isAuthenticated: false,
  adminCredentials: { username: 'Admin', password: '123' },
  accounts: defaultAccounts,
  activeAccount: null,
  chatReplies: {},
  products: [],
  purchases: [],
  orders: [],
  notifications: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'UPDATE_ADMIN_CREDENTIALS':
      return { ...state, adminCredentials: { ...state.adminCredentials, ...action.payload } };
    case 'ADD_ACCOUNT':
      return { ...state, accounts: [...state.accounts, action.payload] };
    case 'OPEN_ACCOUNT':
      return { ...state, activeAccount: action.payload };
    case 'ADD_CHAT_REPLY':
      return {
        ...state,
        chatReplies: {
          ...state.chatReplies,
          [action.payload.chatId]: [
            ...(state.chatReplies[action.payload.chatId] || []),
            { sender: action.payload.sender, message: action.payload.message },
          ],
        },
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'REMOVE_PRODUCT':
      return { ...state, products: state.products.filter((product) => product.id !== action.payload) };
    case 'RENAME_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) => product.id === action.payload.id
          ? { ...product, name: action.payload.name }
          : product),
      };
    case 'ADD_PURCHASE':
      return { ...state, purchases: [...state.purchases, action.payload] };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    const saved = localStorage.getItem('wb_state');
    if (!saved) return initialState;

    const parsed = JSON.parse(saved);
    return {
      ...initialState,
      ...parsed,
      accounts: parsed.accounts?.length ? parsed.accounts : defaultAccounts,
      products: (parsed.products || []).filter((product) => product.name !== 'New Product'),
    };
  });

  useEffect(() => {
    localStorage.setItem('wb_state', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
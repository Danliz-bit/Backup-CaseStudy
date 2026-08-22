import { createContext, useContext, useReducer, useEffect } from 'react';
import { chatLogs as defaultChatLogs } from '../data/mockData';

const AppContext = createContext();

const defaultAccounts = [
  { givenName: 'Clara Dela Cruz', password: 'Clara123' },
  { givenName: 'Angel Smith', password: 'Angel123' },
  { givenName: 'Taylor Doe', password: 'Taylor123' },
  { givenName: 'Liza Constantino', password: 'Liza123' },
  { givenName: 'Mark Bautista', password: 'Mark123' },
  { givenName: 'Diego Marasigan', password: 'Diego123' },
].map((account, index) => ({ id: index + 1, username: account.givenName, ...account }));

const initialState = {
  user: null,
  isAuthenticated: false,
  adminCredentials: { username: 'Admin', password: '123' },
  accounts: defaultAccounts,
  activeAccount: null,
  chatLogs: defaultChatLogs,
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
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        chatLogs: [
          ...state.chatLogs,
          {
            id: action.payload.id,
            name: action.payload.givenName,
            contact: `${action.payload.givenName.toLowerCase().replaceAll(' ', '.')}@example.com`,
            topic: 'Account help',
            message: 'Hello Admin, I need help with my account.',
          },
        ],
      };
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.map((account) => account.id === action.payload.id
          ? { ...account, ...action.payload }
          : account),
      };
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
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) => product.id === action.payload.id
          ? action.payload
          : product),
      };
    case 'RENAME_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) => product.id === action.payload.id
          ? { ...product, name: action.payload.name }
          : product),
      };
    case 'ADD_PURCHASE':
      return { ...state, purchases: [...state.purchases, action.payload] };
    case 'UPDATE_PURCHASE':
      return {
        ...state,
        purchases: state.purchases.map((purchase) => purchase.id === action.payload.id
          ? action.payload
          : purchase),
      };
    case 'REMOVE_PURCHASE':
      return { ...state, purchases: state.purchases.filter((purchase) => purchase.id !== action.payload) };
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
      chatLogs: parsed.chatLogs?.length ? parsed.chatLogs : defaultChatLogs,
      accounts: parsed.accounts?.length
        ? parsed.accounts.map((account) => {
          const accountName = account.givenName?.replace('Liza Contastino', 'Liza Constantino');
          const seededAccount = defaultAccounts.find((defaultAccount) => (
            defaultAccount.givenName.toLowerCase() === accountName?.toLowerCase()
          ));
          return seededAccount ? { ...account, ...seededAccount } : { ...account, givenName: accountName };
        })
        : defaultAccounts,
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
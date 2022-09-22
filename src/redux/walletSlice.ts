import { createSlice } from "@reduxjs/toolkit";
import { CONNECTION_STATUS } from "../constants";

interface Wallet {
  connectionStatus: string;
  address: string | undefined;
  balance: number | undefined;
  symbol: string | undefined;
}
const initialState = {
  address: undefined,
  balance: undefined,
  connectionStatus: CONNECTION_STATUS.disconnected,
  symbol: undefined,
} as Wallet;

const walletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    disconnectWallet(state) {
      state.address = initialState.address;
      state.symbol = initialState.symbol;
      state.connectionStatus = initialState.connectionStatus;
      state.balance = initialState.balance;
    },
    connectWallet(state, action) {
      state.address = action.payload[0];
      state.connectionStatus = CONNECTION_STATUS.connected;
    },
    getTokenSymbolAndBalance(state, action) {
      state.balance = action.payload.balance;
      state.symbol = action.payload.symbol;
    },
  },
});

export const { disconnectWallet, connectWallet, getTokenSymbolAndBalance } =
  walletSlice.actions;
export default walletSlice.reducer;

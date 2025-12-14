import BalancePanel from "../components/BalancePanel";
import {WalletInfo} from "./index";

export interface TabsIndexScreenProps {
    activeTab: number;  // 当前选中的下标
    walletInfo: WalletInfo | null;
}

export interface HomeScreenProps {
    walletInfo: WalletInfo | null;
}

export interface BalancePanelProps {
    walletInfo: WalletInfo | null;
}

export interface RecentTransactionsProps {
    walletInfo: WalletInfo | null;
}
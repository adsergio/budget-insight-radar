
import { useTransactions } from "./useTransactions";

export const useFinancialMetrics = (dateFilter: string, typeFilter: string) => {
  const { data: transactions = [] } = useTransactions(dateFilter, typeFilter);

  const metrics = {
    receitas: transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + Number(t.valor), 0),
    
    despesas: transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + Math.abs(Number(t.valor)), 0),
    
    transacoes: transactions.length,
    
    get saldo() {
      return this.receitas - this.despesas;
    }
  };

  return metrics;
};

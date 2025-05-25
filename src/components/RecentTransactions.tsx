
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTransactions } from "@/hooks/useTransactions";

interface RecentTransactionsProps {
  dateFilter: string;
}

export const RecentTransactions = ({ dateFilter }: RecentTransactionsProps) => {
  const { data: transactions = [], isLoading, error } = useTransactions(dateFilter, "all");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Transações Recentes</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Transações Recentes</h3>
        <p className="text-red-600">Erro ao carregar transações: {error.message}</p>
      </Card>
    );
  }

  const recentTransactions = transactions.slice(0, 10);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Transações Recentes</h3>
      {recentTransactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Nenhuma transação encontrada para este período.</p>
      ) : (
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-gray-800">{transaction.estabelecimento || 'Não informado'}</p>
                    <p className="text-sm text-gray-500">{transaction.detalhes || 'Sem detalhes'}</p>
                    <p className="text-xs text-gray-400">{formatDate(transaction.data)}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.tipo === 'receita' ? '+' : '-'}{formatCurrency(transaction.valor)}
                </p>
                <Badge variant={transaction.tipo === 'receita' ? 'default' : 'secondary'} className="text-xs">
                  {transaction.categoria || 'Sem categoria'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

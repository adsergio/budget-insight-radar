
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentTransactionsProps {
  dateFilter: string;
}

export const RecentTransactions = ({ dateFilter }: RecentTransactionsProps) => {
  // Mock data - será substituído pela integração real com Supabase
  const recentTransactions = [
    {
      id: 1,
      estabelecimento: "Supermercado ABC",
      valor: -156.80,
      categoria: "Alimentação",
      tipo: "despesa",
      quando: "2024-01-20",
      detalhes: "Compras da semana"
    },
    {
      id: 2,
      estabelecimento: "Salário",
      valor: 5000.00,
      categoria: "Trabalho",
      tipo: "receita",
      quando: "2024-01-15",
      detalhes: "Salário mensal"
    },
    {
      id: 3,
      estabelecimento: "Posto Shell",
      valor: -89.50,
      categoria: "Transporte",
      tipo: "despesa",
      quando: "2024-01-18",
      detalhes: "Combustível"
    },
    {
      id: 4,
      estabelecimento: "Netflix",
      valor: -29.90,
      categoria: "Entretenimento",
      tipo: "despesa",
      quando: "2024-01-17",
      detalhes: "Assinatura mensal"
    },
    {
      id: 5,
      estabelecimento: "Freelance Design",
      valor: 800.00,
      categoria: "Trabalho",
      tipo: "receita",
      quando: "2024-01-16",
      detalhes: "Projeto web"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Transações Recentes</h3>
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-gray-800">{transaction.estabelecimento}</p>
                  <p className="text-sm text-gray-500">{transaction.detalhes}</p>
                  <p className="text-xs text-gray-400">{formatDate(transaction.quando)}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${transaction.valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.valor > 0 ? '+' : '-'}{formatCurrency(transaction.valor)}
              </p>
              <Badge variant={transaction.tipo === 'receita' ? 'default' : 'secondary'} className="text-xs">
                {transaction.categoria}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

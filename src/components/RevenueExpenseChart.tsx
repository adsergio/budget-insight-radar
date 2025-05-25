
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTransactions } from "@/hooks/useTransactions";

interface RevenueExpenseChartProps {
  dateFilter: string;
}

export const RevenueExpenseChart = ({ dateFilter }: RevenueExpenseChartProps) => {
  const { data: transactions = [], isLoading } = useTransactions(dateFilter, "all");

  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.data);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthName,
        receitas: 0,
        despesas: 0
      };
    }
    
    const valor = Number(transaction.valor);
    if (transaction.tipo === 'receita') {
      acc[monthKey].receitas += valor;
    } else if (transaction.tipo === 'despesa') {
      acc[monthKey].despesas += Math.abs(valor);
    }
    
    return acc;
  }, {} as Record<string, { month: string; receitas: number; despesas: number }>);

  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6); // Últimos 6 meses

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Receitas vs Despesas</h3>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Carregando...</div>
        </div>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Receitas vs Despesas</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">Nenhum dado encontrado para este período.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Receitas vs Despesas</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip 
              formatter={(value) => [formatCurrency(Number(value)), '']}
              labelStyle={{ color: '#374151' }}
            />
            <Legend />
            <Bar dataKey="receitas" fill="#10b981" name="Receitas" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despesas" fill="#ef4444" name="Despesas" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};


import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTransactions } from "@/hooks/useTransactions";

interface CategoryChartProps {
  dateFilter: string;
}

export const CategoryChart = ({ dateFilter }: CategoryChartProps) => {
  const { data: transactions = [], isLoading } = useTransactions(dateFilter, "despesa");

  const categoryData = transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, transaction) => {
      const categoria = transaction.categoria || 'Outros';
      const valor = Math.abs(Number(transaction.valor));
      
      const existing = acc.find(item => item.name === categoria);
      if (existing) {
        existing.value += valor;
      } else {
        acc.push({
          name: categoria,
          value: valor,
          color: getColorForCategory(categoria)
        });
      }
      return acc;
    }, [] as Array<{ name: string; value: number; color: string }>)
    .sort((a, b) => b.value - a.value);

  function getColorForCategory(categoria: string): string {
    const colors = {
      'Alimentação': '#FF6B6B',
      'Transporte': '#4ECDC4',
      'Entretenimento': '#45B7D1',
      'Saúde': '#96CEB4',
      'Educação': '#FFEAA7',
      'Moradia': '#DDA0DD',
      'Outros': '#95A5A6'
    };
    return colors[categoria as keyof typeof colors] || '#95A5A6';
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Gastos por Categoria</h3>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Carregando...</div>
        </div>
      </Card>
    );
  }

  if (categoryData.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Gastos por Categoria</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">Nenhuma despesa encontrada para este período.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Gastos por Categoria</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

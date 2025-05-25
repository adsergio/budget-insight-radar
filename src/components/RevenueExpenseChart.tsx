
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RevenueExpenseChartProps {
  dateFilter: string;
}

export const RevenueExpenseChart = ({ dateFilter }: RevenueExpenseChartProps) => {
  // Mock data - será substituído pela integração real com Supabase
  const data = [
    {
      month: 'Jan',
      receitas: 15420,
      despesas: 8750
    },
    {
      month: 'Fev',
      receitas: 12800,
      despesas: 9200
    },
    {
      month: 'Mar',
      receitas: 16500,
      despesas: 7800
    },
    {
      month: 'Abr',
      receitas: 14200,
      despesas: 8900
    },
    {
      month: 'Mai',
      receitas: 18300,
      despesas: 9500
    },
    {
      month: 'Jun',
      receitas: 17100,
      despesas: 8300
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Receitas vs Despesas</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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


import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategoryChartProps {
  dateFilter: string;
}

export const CategoryChart = ({ dateFilter }: CategoryChartProps) => {
  // Mock data - será substituído pela integração real com Supabase
  const categoryData = [
    { name: 'Alimentação', value: 2500, color: '#FF6B6B' },
    { name: 'Transporte', value: 1200, color: '#4ECDC4' },
    { name: 'Entretenimento', value: 800, color: '#45B7D1' },
    { name: 'Saúde', value: 600, color: '#96CEB4' },
    { name: 'Educação', value: 900, color: '#FFEAA7' },
    { name: 'Outros', value: 400, color: '#DDA0DD' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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

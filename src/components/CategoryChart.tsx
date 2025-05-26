
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
      'ALIMENTAÇÃO': '#FF6B6B',
      'TRANSPORTE': '#4ECDC4', 
      'ENTRETENIMENTO': '#45B7D1',
      'SAÚDE': '#96CEB4',
      'EDUCAÇÃO': '#FFEAA7',
      'MORADIA': '#A29BFE',
      'VESTUÁRIO': '#FD79A8',
      'LAZER': '#FDCB6E',
      'TECNOLOGIA': '#6C5CE7',
      'SUPERMERCADO': '#00B894',
      'FARMÁCIA': '#E17055',
      'COMBUSTÍVEL': '#2D3436',
      'COMBUSTIVEL': '#2D3436',
      'RESTAURANTE': '#E84393',
      'ACADEMIA': '#00CEC9',
      'BELEZA': '#FF7675',
      'PRODUTOS BELEZA': '#FF7675',
      'VIAGEM': '#74B9FF',
      'CASA': '#DDA0DD',
      'COMPRAS': '#FF9F43',
      'SERVIÇOS': '#26DE81',
      'PETS': '#FD79A8',
      'INVESTIMENTOS': '#5f27cd',
      'IMPOSTOS': '#636e72',
      'SEGUROS': '#00cec9',
      'MANUTENÇÃO': '#e17055',
      'Alimentação': '#FF6B6B',
      'Transporte': '#4ECDC4',
      'Entretenimento': '#45B7D1',
      'Saúde': '#96CEB4',
      'Educação': '#FFEAA7',
      'Moradia': '#A29BFE',
      'Vestuário': '#FD79A8',
      'Lazer': '#FDCB6E',
      'Tecnologia': '#6C5CE7',
      'Supermercado': '#00B894',
      'Farmácia': '#E17055',
      'Combustível': '#2D3436',
      'Restaurante': '#E84393',
      'Academia': '#00CEC9',
      'Beleza': '#FF7675',
      'Viagem': '#74B9FF',
      'Outros': '#95A5A6'
    };
    
    // Se a categoria não está mapeada, gera uma cor baseada no hash do nome
    if (!colors[categoria as keyof typeof colors]) {
      const availableColors = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
        '#1abc9c', '#34495e', '#e67e22', '#8e44ad', '#16a085',
        '#27ae60', '#f1c40f', '#d35400', '#c0392b', '#2980b9',
        '#7f8c8d', '#ecf0f1', '#bdc3c7', '#95a5a6', '#f39800'
      ];
      const index = categoria.length % availableColors.length;
      return availableColors[index];
    }
    
    return colors[categoria as keyof typeof colors];
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

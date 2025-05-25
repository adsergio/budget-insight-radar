
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

interface FinancialMetricsProps {
  dateFilter: string;
  typeFilter: string;
}

export const FinancialMetrics = ({ dateFilter, typeFilter }: FinancialMetricsProps) => {
  // Mock data - será substituído pela integração real com Supabase
  const metrics = {
    receitas: 15420.50,
    despesas: 8750.30,
    saldo: 6670.20,
    transacoes: 47
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600 mb-1">Receitas</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(metrics.receitas)}</p>
            <p className="text-xs text-green-500 mt-1">+12.5% vs mês anterior</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600 mb-1">Despesas</p>
            <p className="text-2xl font-bold text-red-700">{formatCurrency(metrics.despesas)}</p>
            <p className="text-xs text-red-500 mt-1">-5.2% vs mês anterior</p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-1">Saldo Atual</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(metrics.saldo)}</p>
            <p className="text-xs text-blue-500 mt-1">+8.3% vs mês anterior</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600 mb-1">Transações</p>
            <p className="text-2xl font-bold text-purple-700">{metrics.transacoes}</p>
            <p className="text-xs text-purple-500 mt-1">Este período</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

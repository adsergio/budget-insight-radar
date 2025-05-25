
import { Calendar, TrendingUp } from "lucide-react";

export const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Financeiro
          </h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="capitalize">{currentDate}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-700">Análise Inteligente</span>
        </div>
      </div>
    </div>
  );
};

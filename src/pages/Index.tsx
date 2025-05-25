
import { DashboardHeader } from "@/components/DashboardHeader";
import { FinancialMetrics } from "@/components/FinancialMetrics";
import { CategoryChart } from "@/components/CategoryChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { TransactionFilters } from "@/components/TransactionFilters";
import { useState } from "react";

const Index = () => {
  const [dateFilter, setDateFilter] = useState("30d");
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        
        <div className="mb-8">
          <TransactionFilters 
            dateFilter={dateFilter}
            typeFilter={typeFilter}
            onDateFilterChange={setDateFilter}
            onTypeFilterChange={setTypeFilter}
          />
        </div>

        <FinancialMetrics dateFilter={dateFilter} typeFilter={typeFilter} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CategoryChart dateFilter={dateFilter} />
          <RecentTransactions dateFilter={dateFilter} />
        </div>
      </div>
    </div>
  );
};

export default Index;


import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Transaction {
  id: number;
  usuario_id: number | null;
  valor: number;
  data: string;
  criado_em: string | null;
  detalhes: string | null;
  estabelecimento: string | null;
  categoria: string | null;
  tipo: string | null;
}

export const useTransactions = (dateFilter: string, typeFilter: string = "all") => {
  return useQuery({
    queryKey: ['transactions', dateFilter, typeFilter],
    queryFn: async () => {
      console.log('Fetching transactions with filters:', { dateFilter, typeFilter });
      
      let query = supabase
        .from('transacoes')
        .select('*')
        .order('data', { ascending: false });

      // Aplicar filtro de data
      if (dateFilter !== 'all') {
        const now = new Date();
        let startDate = new Date();
        
        switch (dateFilter) {
          case '7d':
            startDate.setDate(now.getDate() - 7);
            break;
          case '30d':
            startDate.setDate(now.getDate() - 30);
            break;
          case '90d':
            startDate.setDate(now.getDate() - 90);
            break;
          case '1y':
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        if (dateFilter !== 'all') {
          query = query.gte('data', startDate.toISOString().split('T')[0]);
        }
      }

      // Aplicar filtro de tipo
      if (typeFilter !== 'all') {
        query = query.eq('tipo', typeFilter);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }
      
      console.log('Fetched transactions:', data);
      return data as Transaction[];
    },
  });
};

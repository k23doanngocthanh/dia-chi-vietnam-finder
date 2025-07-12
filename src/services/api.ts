
interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

interface SearchParams {
  q?: string;
  province?: string;
  district?: string;
  page?: number;
  limit?: number;
}

// Simulate API calls for large dataset
class AdministrativeAPI {
  private baseUrl = '/api/administrative';

  async search(params: SearchParams): Promise<ApiResponse<any>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const { administrativeData } = await import('@/data/administrativeData');
    let filtered = administrativeData;

    // Apply filters
    if (params.q) {
      const searchTerm = params.q.toLowerCase();
      filtered = filtered.filter(unit =>
        unit.ten_xa.toLowerCase().includes(searchTerm) ||
        unit.quan_huyen.toLowerCase().includes(searchTerm) ||
        unit.ten_tinh.toLowerCase().includes(searchTerm)
      );
    }

    if (params.province && params.province !== 'all') {
      filtered = filtered.filter(unit => unit.ten_tinh === params.province);
    }

    if (params.district && params.district !== 'all') {
      filtered = filtered.filter(unit => unit.quan_huyen === params.district);
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit
    };
  }

  async getProvinces(): Promise<string[]> {
    const { administrativeData } = await import('@/data/administrativeData');
    const provinces = new Set<string>();
    administrativeData.forEach(unit => provinces.add(unit.ten_tinh));
    return Array.from(provinces).sort();
  }

  async getDistricts(): Promise<string[]> {
    const { administrativeData } = await import('@/data/administrativeData');
    const districts = new Set<string>();
    administrativeData.forEach(unit => districts.add(unit.quan_huyen));
    return Array.from(districts).sort();
  }

  async getDistrictsByProvince(province: string): Promise<string[]> {
    const { administrativeData } = await import('@/data/administrativeData');
    const districts = new Set<string>();
    administrativeData
      .filter(unit => unit.ten_tinh === province)
      .forEach(unit => districts.add(unit.quan_huyen));
    return Array.from(districts).sort();
  }

  async getStats() {
    const { administrativeData } = await import('@/data/administrativeData');
    const provinces = new Set<string>();
    const districts = new Set<string>();
    
    administrativeData.forEach(unit => {
      provinces.add(unit.ten_tinh);
      districts.add(unit.quan_huyen);
    });

    return {
      totalUnits: administrativeData.length,
      totalProvinces: provinces.size,
      totalDistricts: districts.size
    };
  }
}

export const administrativeAPI = new AdministrativeAPI();

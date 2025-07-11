
import { useState, useEffect } from "react";
import { Search, Building2, MapPin, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResultCard } from "@/components/ResultCard";
import { DetailModal } from "@/components/DetailModal";
import { administrativeAPI } from "@/services/api";
import { AdministrativeUnit } from "@/types/administrative";
import { Link } from "react-router-dom";

const AdministrativeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [results, setResults] = useState<AdministrativeUnit[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [stats, setStats] = useState({ totalUnits: 0, totalProvinces: 0, totalDistricts: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<AdministrativeUnit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [provincesData, districtsData, statsData, initialResults] = await Promise.all([
          administrativeAPI.getProvinces(),
          administrativeAPI.getDistricts(),
          administrativeAPI.getStats(),
          administrativeAPI.search({ page: 1, limit: 20 })
        ]);

        setProvinces(provincesData);
        setDistricts(districtsData);
        setStats(statsData);
        setResults(initialResults.data);
        setTotalResults(initialResults.total);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Search function
  const handleSearch = async (page = 1) => {
    setLoading(true);
    setCurrentPage(page);
    
    try {
      const searchResults = await administrativeAPI.search({
        q: searchTerm,
        province: selectedProvince,
        district: selectedDistrict,
        page,
        limit: 20
      });

      setResults(searchResults.data);
      setTotalResults(searchResults.total);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (unit: AdministrativeUnit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUnit(null);
  };

  const totalPages = Math.ceil(totalResults / 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-5 w-5" />
                <span>API Portal</span>
              </Link>
              <div className="text-gray-300">|</div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                Tra cứu đơn vị hành chính
              </h1>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {stats.totalUnits.toLocaleString()} đơn vị
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Tìm kiếm nâng cao
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Nhập từ khóa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:col-span-2"
              />
              
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh/thành" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả tỉnh/thành</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả quận/huyện</SelectItem>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleSearch(1)} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Tìm kiếm
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedProvince("");
                  setSelectedDistrict("");
                  handleSearch(1);
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Kết quả tìm kiếm ({totalResults.toLocaleString()})
            </h2>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1 || loading}
                  onClick={() => handleSearch(currentPage - 1)}
                >
                  Trước
                </Button>
                <span className="text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages || loading}
                  onClick={() => handleSearch(currentPage + 1)}
                >
                  Sau
                </Button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : results.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
                <p className="text-gray-600">Vui lòng thử lại với từ khóa khác</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((unit) => (
                <ResultCard 
                  key={`${unit.ma_tinh}-${unit.ma_xa}`} 
                  unit={unit} 
                  onClick={() => openModal(unit)} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUnit && (
        <DetailModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          unit={selectedUnit} 
        />
      )}
    </div>
  );
};

export default AdministrativeSearch;

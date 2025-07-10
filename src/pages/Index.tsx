
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ResultCard } from "@/components/ResultCard";
import { DetailModal } from "@/components/DetailModal";
import { administrativeData } from "@/data/administrativeData";
import { AdministrativeUnit } from "@/types/administrative";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Home, Search, TrendingUp } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<AdministrativeUnit | null>(null);

  // Enhanced filtering logic
  const filteredData = useMemo(() => {
    return administrativeData.filter((unit) => {
      const matchesSearch = searchTerm === "" || 
        unit.ten_tinh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.quan_huyen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.ten_xa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm.toLowerCase().includes(unit.ten_tinh.toLowerCase()) ||
        searchTerm.toLowerCase().includes(unit.quan_huyen.toLowerCase()) ||
        searchTerm.toLowerCase().includes(unit.ten_xa.toLowerCase());

      const matchesProvince = selectedProvince === "" || selectedProvince === "all" || unit.ten_tinh === selectedProvince;
      const matchesDistrict = selectedDistrict === "" || selectedDistrict === "all" || unit.quan_huyen === selectedDistrict;

      return matchesSearch && matchesProvince && matchesDistrict;
    });
  }, [searchTerm, selectedProvince, selectedDistrict]);

  // Get unique provinces
  const provinces = useMemo(() => {
    return [...new Set(administrativeData.map(unit => unit.ten_tinh))].sort();
  }, []);

  // Get unique districts based on selected province
  const districts = useMemo(() => {
    const filtered = selectedProvince && selectedProvince !== "all"
      ? administrativeData.filter(unit => unit.ten_tinh === selectedProvince)
      : administrativeData;
    return [...new Set(filtered.map(unit => unit.quan_huyen))].sort();
  }, [selectedProvince]);

  const stats = {
    totalProvinces: provinces.length,
    totalDistricts: new Set(administrativeData.map(unit => unit.quan_huyen)).size,
    totalUnits: administrativeData.length,
    filteredResults: filteredData.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Search className="h-8 w-8" />
              </div>
              <h1 className="text-5xl font-bold">
                Tra Cứu Đơn Vị Hành Chính
              </h1>
            </div>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed">
              Hệ thống tra cứu thông tin toàn diện về tỉnh thành, quận huyện và phường xã trên toàn quốc với công nghệ tìm kiếm thông minh
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Enhanced Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-blue-600 rounded-full">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalProvinces}</div>
              <div className="text-gray-700 font-medium">Tỉnh/Thành phố</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-green-600 rounded-full">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.totalDistricts}</div>
              <div className="text-gray-700 font-medium">Quận/Huyện</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-purple-600 rounded-full">
                  <Home className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.totalUnits.toLocaleString()}</div>
              <div className="text-gray-700 font-medium">Phường/Xã</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-orange-600 rounded-full">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.filteredResults.toLocaleString()}</div>
              <div className="text-gray-700 font-medium">Kết quả tìm thấy</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-12">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            provinces={provinces}
            districts={districts}
          />
        </div>

        {/* Enhanced Results Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              Kết quả tìm kiếm
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
              {filteredData.length.toLocaleString()} kết quả
            </Badge>
          </div>

          {filteredData.length === 0 ? (
            <Card className="text-center py-16 border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent>
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="text-gray-500 text-xl font-medium">Không tìm thấy kết quả</div>
                  <div className="text-gray-400 max-w-md mx-auto">
                    Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc để có kết quả phù hợp hơn
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.slice(0, 50).map((unit, index) => (
                <ResultCard
                  key={`${unit.ma_tinh}-${unit.ma_xa}-${index}`}
                  unit={unit}
                  onClick={() => setSelectedUnit(unit)}
                />
              ))}
            </div>
          )}

          {filteredData.length > 50 && (
            <div className="text-center py-8">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Hiển thị 50 kết quả đầu tiên. Vui lòng sử dụng bộ lọc để thu hẹp kết quả.
              </Badge>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Modal */}
      {selectedUnit && (
        <DetailModal
          unit={selectedUnit}
          isOpen={!!selectedUnit}
          onClose={() => setSelectedUnit(null)}
        />
      )}
    </div>
  );
};

export default Index;


import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ResultCard } from "@/components/ResultCard";
import { DetailModal } from "@/components/DetailModal";
import { administrativeData } from "@/data/administrativeData";
import { AdministrativeUnit } from "@/types/administrative";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Home } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<AdministrativeUnit | null>(null);

  // Lọc và tìm kiếm dữ liệu
  const filteredData = useMemo(() => {
    return administrativeData.filter((unit) => {
      const matchesSearch = searchTerm === "" || 
        unit.ten_tinh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.quan_huyen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.ten_xa.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProvince = selectedProvince === "" || unit.ten_tinh === selectedProvince;
      const matchesDistrict = selectedDistrict === "" || unit.quan_huyen === selectedDistrict;

      return matchesSearch && matchesProvince && matchesDistrict;
    });
  }, [searchTerm, selectedProvince, selectedDistrict]);

  // Lấy danh sách tỉnh thành duy nhất
  const provinces = useMemo(() => {
    return [...new Set(administrativeData.map(unit => unit.ten_tinh))];
  }, []);

  // Lấy danh sách quận/huyện duy nhất theo tỉnh đã chọn
  const districts = useMemo(() => {
    const filtered = selectedProvince 
      ? administrativeData.filter(unit => unit.ten_tinh === selectedProvince)
      : administrativeData;
    return [...new Set(filtered.map(unit => unit.quan_huyen))];
  }, [selectedProvince]);

  const stats = {
    totalProvinces: provinces.length,
    totalDistricts: districts.length,
    totalUnits: filteredData.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tra Cứu Đơn Vị Hành Chính
            </h1>
            <p className="text-gray-600 text-lg">
              Tìm kiếm thông tin về tỉnh thành, quận huyện và phường xã trên toàn quốc
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{stats.totalProvinces}</div>
              <div className="text-gray-600">Tỉnh/Thành phố</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.totalDistricts}</div>
              <div className="text-gray-600">Quận/Huyện</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Home className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{stats.totalUnits}</div>
              <div className="text-gray-600">Phường/Xã</div>
            </CardContent>
          </Card>
        </div>

        {/* Thanh tìm kiếm */}
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

        {/* Kết quả tìm kiếm */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Kết quả tìm kiếm
            </h2>
            <Badge variant="secondary" className="text-sm">
              {filteredData.length} kết quả
            </Badge>
          </div>

          {filteredData.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-500 text-lg mb-2">Không tìm thấy kết quả</div>
                <div className="text-gray-400">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((unit, index) => (
                <ResultCard
                  key={`${unit.ma_tinh}-${unit.ma_xa}-${index}`}
                  unit={unit}
                  onClick={() => setSelectedUnit(unit)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal chi tiết */}
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

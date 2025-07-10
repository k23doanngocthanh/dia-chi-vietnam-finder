import { useState, useMemo } from "react";
import { Search, Building2, MapPin, BarChart3, Users, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/SearchBar";
import { ResultCard } from "@/components/ResultCard";
import { DetailModal } from "@/components/DetailModal";
import { administrativeData } from "@/data/administrativeData";
import { AdministrativeUnit } from "@/types/administrative";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<AdministrativeUnit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const provinces = useMemo(() => {
    const provinceSet = new Set<string>();
    administrativeData.forEach(unit => provinceSet.add(unit.ten_tinh));
    return Array.from(provinceSet);
  }, []);

  const districts = useMemo(() => {
    const districtSet = new Set<string>();
    administrativeData.forEach(unit => districtSet.add(unit.quan_huyen));
    return Array.from(districtSet);
  }, []);

  const filteredUnits = useMemo(() => {
    let filtered = administrativeData;

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(unit =>
        unit.ten_xa.toLowerCase().includes(lowerSearchTerm) ||
        unit.quan_huyen.toLowerCase().includes(lowerSearchTerm) ||
        unit.ten_tinh.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (selectedProvince && selectedProvince !== "all") {
      filtered = filtered.filter(unit => unit.ten_tinh === selectedProvince);
    }

    if (selectedDistrict && selectedDistrict !== "all") {
      filtered = filtered.filter(unit => unit.quan_huyen === selectedDistrict);
    }

    return filtered;
  }, [searchTerm, selectedProvince, selectedDistrict]);

  const totalUnits = administrativeData.length;
  const totalProvinces = provinces.length;
  const totalDistricts = districts.length;

  const openModal = (unit: AdministrativeUnit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              Tra cứu đơn vị hành chính
            </h1>
            <div className="flex items-center gap-4">
              <Link 
                to="/conversion" 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="h-4 w-4" />
                Công cụ chuyển đổi
              </Link>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {administrativeData.length.toLocaleString()} đơn vị
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Search className="h-12 w-12 text-blue-100" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Tra cứu thông tin</h3>
                  <p className="text-blue-100">Tìm kiếm thông tin đơn vị hành chính hiện tại</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link to="/conversion">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-600 to-green-700 text-white hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <RefreshCw className="h-12 w-12 text-green-100" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Công cụ chuyển đổi</h3>
                    <p className="text-green-100">Chuyển đổi từ địa chỉ cũ sang địa chỉ mới</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Search Bar */}
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-blue-50 border-blue-200 border shadow-sm">
            <CardContent className="flex items-center space-x-4 p-4">
              <div className="rounded-full bg-blue-200 p-2">
                <MapPin className="h-5 w-5 text-blue-700" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold">
                  {totalUnits.toLocaleString()}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Đơn vị hành chính
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200 border shadow-sm">
            <CardContent className="flex items-center space-x-4 p-4">
              <div className="rounded-full bg-green-200 p-2">
                <BarChart3 className="h-5 w-5 text-green-700" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold">
                  {totalProvinces.toLocaleString()}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Tỉnh/Thành phố
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200 border shadow-sm">
            <CardContent className="flex items-center space-x-4 p-4">
              <div className="rounded-full bg-purple-200 p-2">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold">
                  {totalDistricts.toLocaleString()}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Quận/Huyện
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mt-8 space-y-6">
          {filteredUnits.length === 0 ? (
            <Card className="text-center py-12 bg-gray-50 border border-gray-200">
              <CardContent>
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-gray-700">
                  Không có đơn vị hành chính nào phù hợp với tiêu chí tìm kiếm của
                  bạn.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnits.map((unit) => (
                <ResultCard key={`${unit.ma_tinh}-${unit.ma_xa}`} unit={unit} onClick={() => openModal(unit)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal isOpen={isModalOpen} onClose={closeModal} unit={selectedUnit} />
    </div>
  );
};

export default Index;

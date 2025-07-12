
import { Search, X, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedProvince: string;
  onProvinceChange: (value: string) => void;
  selectedDistrict: string;
  onDistrictChange: (value: string) => void;
  provinces: string[];
  districts: string[];
  availableDistricts: string[];
}

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedProvince,
  onProvinceChange,
  selectedDistrict,
  onDistrictChange,
  provinces,
  districts,
  availableDistricts
}: SearchBarProps) => {
  const isMobile = useIsMobile();

  const clearFilters = () => {
    onSearchChange("");
    onProvinceChange("");
    onDistrictChange("");
  };

  const hasActiveFilters = searchTerm || selectedProvince || selectedDistrict;

  // Smart parsing for full address strings
  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    
    // Auto-parse province and district from full address
    const lowerValue = value.toLowerCase();
    
    // Try to extract province
    provinces.forEach(province => {
      if (lowerValue.includes(province.toLowerCase()) || 
          lowerValue.includes(`tỉnh ${province.toLowerCase()}`) ||
          lowerValue.includes(`thành phố ${province.toLowerCase()}`)) {
        if (selectedProvince !== province) {
          onProvinceChange(province);
        }
      }
    });
    
    // Try to extract district
    districts.forEach(district => {
      if (lowerValue.includes(district.toLowerCase()) ||
          lowerValue.includes(`huyện ${district.toLowerCase()}`) ||
          lowerValue.includes(`quận ${district.toLowerCase()}`)) {
        if (selectedDistrict !== district) {
          onDistrictChange(district);
        }
      }
    });
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
      <CardContent className={`${isMobile ? 'p-4' : 'p-8'}`}>
        <div className="space-y-4 md:space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
              <MapPin className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-lg md:text-xl font-semibold">Tìm kiếm nâng cao</span>
            </div>
            <p className="text-gray-600 text-xs md:text-sm">
              Nhập địa chỉ đầy đủ hoặc sử dụng bộ lọc để tìm kiếm chính xác
            </p>
          </div>

          {/* Main search input */}
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
            <Input
              type="text"
              placeholder={isMobile ? "Nhập địa chỉ..." : "Ví dụ: Xã Nghĩa Thắng huyện Đăk Rlap tỉnh Đăk Nông"}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 md:pl-12 pr-4 py-3 md:py-4 text-sm md:text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl"
            />
          </div>

          {/* Advanced filters */}
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Bộ lọc nâng cao</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tỉnh/Thành phố</label>
                <Select value={selectedProvince} onValueChange={onProvinceChange}>
                  <SelectTrigger className="w-full h-10 md:h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                    <SelectValue placeholder="Chọn tỉnh/thành phố" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="all">🌍 Tất cả tỉnh/thành phố</SelectItem>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        📍 {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Quận/Huyện</label>
                <Select value={selectedDistrict} onValueChange={onDistrictChange}>
                  <SelectTrigger className="w-full h-10 md:h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                    <SelectValue placeholder="Chọn quận/huyện" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="all">🏘️ Tất cả quận/huyện</SelectItem>
                    {availableDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        🏢 {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Active filters and clear button */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between p-3 md:p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs md:text-sm font-medium text-blue-700">Bộ lọc đang áp dụng:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                    Từ khóa: {searchTerm.length > (isMobile ? 15 : 20) ? searchTerm.substring(0, isMobile ? 15 : 20) + '...' : searchTerm}
                  </Badge>
                )}
                {selectedProvince && selectedProvince !== "all" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 text-xs">
                    {selectedProvince}
                  </Badge>
                )}
                {selectedDistrict && selectedDistrict !== "all" && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                    {selectedDistrict}
                  </Badge>
                )}
              </div>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={clearFilters}
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                <X className="h-4 w-4" />
                {!isMobile && "Xóa bộ lọc"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

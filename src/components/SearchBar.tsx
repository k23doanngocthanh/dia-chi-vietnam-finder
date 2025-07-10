
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedProvince: string;
  onProvinceChange: (value: string) => void;
  selectedDistrict: string;
  onDistrictChange: (value: string) => void;
  provinces: string[];
  districts: string[];
}

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedProvince,
  onProvinceChange,
  selectedDistrict,
  onDistrictChange,
  provinces,
  districts
}: SearchBarProps) => {
  const clearFilters = () => {
    onSearchChange("");
    onProvinceChange("");
    onDistrictChange("");
  };

  const hasActiveFilters = searchTerm || selectedProvince || selectedDistrict;

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Thanh tìm kiếm chính */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên tỉnh, quận/huyện, phường/xã..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Bộ lọc */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedProvince} onValueChange={onProvinceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả tỉnh/thành phố</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select value={selectedDistrict} onValueChange={onDistrictChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn Quận/Huyện" />
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

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <X className="h-4 w-4" />
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

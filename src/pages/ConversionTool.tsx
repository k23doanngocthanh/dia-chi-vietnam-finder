
import { useState } from "react";
import { Search, ArrowRight, MapPin, RefreshCw, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConversionResult } from "@/components/ConversionResult";
import { administrativeData } from "@/data/administrativeData";
import { AdministrativeUnit } from "@/types/administrative";
import { Link } from "react-router-dom";

const ConversionTool = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<AdministrativeUnit[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const filtered = administrativeData.filter(unit => {
        const searchLower = searchTerm.toLowerCase();
        return (
          unit.ten_xa.toLowerCase().includes(searchLower) ||
          unit.quan_huyen.toLowerCase().includes(searchLower) ||
          unit.ten_tinh.toLowerCase().includes(searchLower) ||
          `${unit.ten_xa} ${unit.quan_huyen} ${unit.ten_tinh}`.toLowerCase().includes(searchLower)
        );
      });
      
      setResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Home className="h-5 w-5" />
                <span className="font-medium">Trang chủ</span>
              </Link>
              <div className="text-gray-300">|</div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <RefreshCw className="h-6 w-6 text-blue-600" />
                Công cụ chuyển đổi địa chỉ
              </h1>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Tra cứu miễn phí
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8 shadow-xl border-0 bg-gradient-to-r from-white via-blue-50 to-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              🔄 Chuyển đổi địa chỉ hành chính
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Nhập địa chỉ cũ để tìm địa chỉ mới sau sáp nhập
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Ví dụ: Phường Phúc Xá, Quận Ba Đình, Hà Nội"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl"
              />
            </div>

            {/* Search Actions */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Đang tìm kiếm...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Tìm kiếm chuyển đổi
                  </>
                )}
              </Button>
              
              {searchTerm && (
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50"
                >
                  Xóa
                </Button>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Hướng dẫn sử dụng:
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Nhập tên phường/xã, quận/huyện, tỉnh/thành phố cũ</li>
                <li>• Hệ thống sẽ tìm và hiển thị địa chỉ mới sau sáp nhập (nếu có)</li>
                <li>• Xem chi tiết quá trình chuyển đổi và ghi chú</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {isSearching && (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Đang tìm kiếm thông tin chuyển đổi...</p>
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <ArrowRight className="h-6 w-6 text-green-600" />
                Kết quả chuyển đổi
              </h2>
              <Badge className="bg-green-100 text-green-800 border-green-300">
                Tìm thấy {results.length} kết quả
              </Badge>
            </div>
            
            <div className="grid gap-6">
              {results.map((unit, index) => (
                <ConversionResult key={`${unit.ma_tinh}-${unit.ma_xa}-${index}`} unit={unit} />
              ))}
            </div>
          </div>
        )}

        {!isSearching && searchTerm && results.length === 0 && (
          <Card className="text-center py-12 bg-yellow-50 border-yellow-200">
            <CardContent>
              <div className="text-yellow-600 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                Không tìm thấy kết quả
              </h3>
              <p className="text-yellow-700 mb-4">
                Không tìm thấy thông tin chuyển đổi cho địa chỉ "{searchTerm}"
              </p>
              <Button onClick={clearSearch} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                Thử tìm kiếm khác
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConversionTool;

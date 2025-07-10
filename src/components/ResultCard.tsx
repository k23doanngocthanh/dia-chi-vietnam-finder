
import { MapPin, Building2, ArrowRight, Info, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdministrativeUnit } from "@/types/administrative";

interface ResultCardProps {
  unit: AdministrativeUnit;
  onClick: () => void;
}

export const ResultCard = ({ unit, onClick }: ResultCardProps) => {
  const hasChanges = unit.chuyen_doi?.some(cd => cd.sau_sap_nhap && cd.sau_sap_nhap.length > 0);
  const currentStatus = unit.chuyen_doi?.find(cd => cd.tinh_hien_tai);

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50" onClick={onClick}>
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-800">
              🏠 {unit.ten_xa}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono bg-blue-50 text-blue-700 border-blue-200">
                {unit.ma_tinh}-{unit.ma_xa}
              </Badge>
              {hasChanges && (
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Có thay đổi
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location hierarchy */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <Building2 className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
            <div className="flex-1">
              <span className="text-xs text-gray-500 block">Quận/Huyện</span>
              <span className="font-medium text-gray-800">{unit.quan_huyen}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-blue-600" />
            <div className="flex-1">
              <span className="text-xs text-gray-500 block">Tỉnh/Thành phố</span>
              <span className="font-medium text-gray-800">{unit.ten_tinh}</span>
            </div>
          </div>
        </div>

        {/* Status info */}
        {currentStatus && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="flex-1">
                <span className="text-xs font-medium text-green-700 block">Tình trạng hiện tại</span>
                <span className="text-sm text-green-800">{currentStatus.tinh_hien_tai}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Nhấn để xem chi tiết
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 h-auto group-hover:translate-x-1 transition-all duration-200"
          >
            <Info className="h-4 w-4 mr-1" />
            Chi tiết
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

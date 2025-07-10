
import { ArrowRight, MapPin, Building2, AlertCircle, CheckCircle, Info, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdministrativeUnit } from "@/types/administrative";

interface ConversionResultProps {
  unit: AdministrativeUnit;
}

export const ConversionResult = ({ unit }: ConversionResultProps) => {
  const mergeInfo = unit.chuyen_doi?.find(cd => cd.sau_sap_nhap && cd.sau_sap_nhap.length > 0);
  const currentStatus = unit.chuyen_doi?.find(cd => cd.tinh_hien_tai);
  const hasMergeInfo = mergeInfo && mergeInfo.sau_sap_nhap && mergeInfo.sau_sap_nhap.length > 0;

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              {unit.ten_xa}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="h-4 w-4" />
              <span>{unit.quan_huyen}, {unit.ten_tinh}</span>
            </div>
            <Badge variant="outline" className="text-xs font-mono bg-blue-50 text-blue-700 border-blue-200 w-fit">
              Mã: {unit.ma_tinh}-{unit.ma_xa}
            </Badge>
          </div>
          
          {hasMergeInfo ? (
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Đã sáp nhập
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Không đổi
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Conversion Arrow and Results */}
        {hasMergeInfo ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-center">
              <div className="flex-1 text-sm text-gray-500">Địa chỉ cũ</div>
              <ArrowRight className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div className="flex-1 text-sm text-gray-500">Địa chỉ mới</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Old Address */}
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Trước sáp nhập
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="text-red-700">{unit.ten_xa}</div>
                  <div className="text-red-600">{unit.quan_huyen}</div>
                  <div className="text-red-600">{unit.ten_tinh}</div>
                </div>
              </div>

              {/* New Address */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Sau sáp nhập
                </h4>
                <div className="space-y-2">
                  {mergeInfo.sau_sap_nhap.map((merge, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium text-green-700">{merge.don_vi_moi}</div>
                      <div className="text-green-600">{merge.tinh_thanh}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Không có thay đổi</h4>
                <p className="text-blue-700 text-sm">
                  Đơn vị hành chính này không bị sáp nhập và giữ nguyên tên gọi.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Status */}
        {currentStatus && (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Tình trạng hiện tại
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Thuộc:</span>
                <span className="font-medium text-gray-800">{currentStatus.tinh_hien_tai}</span>
              </div>
              {currentStatus.tinh_cu && currentStatus.tinh_cu.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Trước đây thuộc:</span>
                  <span className="text-gray-700">{currentStatus.tinh_cu.join(", ")}</span>
                </div>
              )}
              {currentStatus.note && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mt-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-yellow-800 font-medium text-xs block mb-1">Ghi chú:</span>
                      <span className="text-yellow-700 text-sm">{currentStatus.note}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

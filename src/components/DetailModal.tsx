
import { X, MapPin, Building2, Home, ArrowRight, Calendar, Info, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AdministrativeUnit } from "@/types/administrative";

interface DetailModalProps {
  unit: AdministrativeUnit;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailModal = ({ unit, isOpen, onClose }: DetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto border-0 shadow-2xl">
        <DialogHeader className="pb-6 border-b border-gray-200">
          <DialogTitle className="text-3xl font-bold text-gray-900 pr-8 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            {unit.ten_xa}
          </DialogTitle>
          <p className="text-gray-600 mt-2">Thông tin chi tiết đơn vị hành chính</p>
        </DialogHeader>

        <div className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-900">
                <Info className="h-5 w-5" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Home className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500 mb-1">Phường/Xã</div>
                      <div className="text-lg font-bold text-gray-900">{unit.ten_xa}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Building2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500 mb-1">Quận/Huyện</div>
                      <div className="text-lg font-bold text-gray-900">{unit.quan_huyen}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500 mb-1">Tỉnh/Thành phố</div>
                      <div className="text-lg font-bold text-gray-900">{unit.ten_tinh}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-xl shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-3">Mã định danh</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Mã tỉnh:</span>
                        <Badge variant="outline" className="font-mono text-lg px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                          {unit.ma_tinh}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Mã xã:</span>
                        <Badge variant="outline" className="font-mono text-lg px-3 py-1 bg-green-50 text-green-700 border-green-200">
                          {unit.ma_xa}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Mã đầy đủ:</span>
                        <Badge variant="outline" className="font-mono text-lg px-3 py-1 bg-purple-50 text-purple-700 border-purple-200">
                          {unit.ma_tinh}-{unit.ma_xa}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-3">Địa chỉ đầy đủ</div>
                    <div className="text-base text-gray-900 leading-relaxed p-3 bg-gray-50 rounded-lg">
                      {unit.ten_xa}, {unit.quan_huyen}, {unit.ten_tinh}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Information */}
          {unit.chuyen_doi && unit.chuyen_doi.length > 0 && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-900">
                  <Calendar className="h-5 w-5" />
                  Thông tin chuyển đổi và sáp nhập
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {unit.chuyen_doi.map((change, index) => (
                  <div key={index} className="space-y-6">
                    {/* Merger Information */}
                    {change.sau_sap_nhap && change.sau_sap_nhap.length > 0 && (
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                          <h4 className="font-bold text-orange-900 text-lg">
                            Thông tin sau sáp nhập
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {change.sau_sap_nhap.map((merge, mergeIndex) => (
                            <div key={mergeIndex} className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                              <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0" />
                              <div className="flex-1">
                                <span className="text-gray-700">Chuyển thành: </span>
                                <strong className="text-orange-800">{merge.don_vi_moi}</strong>
                              </div>
                              {merge.tinh_thanh && (
                                <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                                  {merge.tinh_thanh}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Current Status */}
                    {change.tinh_hien_tai && (
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Info className="h-5 w-5 text-green-600" />
                          <h4 className="font-bold text-green-900 text-lg">
                            Tình trạng hiện tại
                          </h4>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-green-50 rounded-lg">
                              <span className="text-sm font-medium text-green-700 block mb-2">Tỉnh hiện tại</span>
                              <span className="text-base font-bold text-green-900">{change.tinh_hien_tai}</span>
                            </div>
                            
                            {change.tinh_cu && change.tinh_cu.length > 0 && (
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <span className="text-sm font-medium text-blue-700 block mb-2">Tỉnh cũ</span>
                                <span className="text-base font-bold text-blue-900">{change.tinh_cu.join(", ")}</span>
                              </div>
                            )}
                          </div>
                          
                          {change.note && (
                            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                              <span className="text-sm font-medium text-yellow-700 block mb-2">Ghi chú</span>
                              <span className="text-sm text-yellow-800">{change.note}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {index < unit.chuyen_doi.length - 1 && <Separator className="my-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

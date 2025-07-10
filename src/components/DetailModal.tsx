
import { X, MapPin, Building2, Home, ArrowRight, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
            {unit.ten_xa}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thông tin cơ bản */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Home className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Phường/Xã</div>
                      <div className="font-medium">{unit.ten_xa}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Quận/Huyện</div>
                      <div className="font-medium">{unit.quan_huyen}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Tỉnh/Thành phố</div>
                      <div className="font-medium">{unit.ten_tinh}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Mã tỉnh</div>
                    <Badge variant="outline" className="font-mono">
                      {unit.ma_tinh}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">Mã xã</div>
                    <Badge variant="outline" className="font-mono">
                      {unit.ma_xa}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin chuyển đổi */}
          {unit.chuyen_doi && unit.chuyen_doi.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Thông tin chuyển đổi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {unit.chuyen_doi.map((change, index) => (
                  <div key={index} className="space-y-4">
                    {/* Thông tin sáp nhập */}
                    {change.sau_sap_nhap && change.sau_sap_nhap.length > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-3">
                          Thông tin sau sáp nhập
                        </h4>
                        <div className="space-y-2">
                          {change.sau_sap_nhap.map((merge, mergeIndex) => (
                            <div key={mergeIndex} className="flex items-center gap-2 text-sm">
                              <ArrowRight className="h-4 w-4 text-blue-600" />
                              <span>
                                Chuyển thành <strong>{merge.don_vi_moi}</strong>
                              </span>
                              {merge.tinh_thanh && (
                                <Badge variant="secondary" className="text-xs">
                                  {merge.tinh_thanh}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Thông tin tỉnh hiện tại */}
                    {change.tinh_hien_tai && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-3">
                          Tình trạng hiện tại
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Tỉnh hiện tại: </span>
                            <span className="font-medium">{change.tinh_hien_tai}</span>
                          </div>
                          
                          {change.tinh_cu && change.tinh_cu.length > 0 && (
                            <div>
                              <span className="text-gray-600">Tỉnh cũ: </span>
                              <span className="font-medium">{change.tinh_cu.join(", ")}</span>
                            </div>
                          )}
                          
                          {change.note && (
                            <div className="mt-2 p-2 bg-white rounded border-l-4 border-green-400">
                              <span className="text-gray-600 text-xs">Ghi chú: </span>
                              <span className="text-sm">{change.note}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {index < unit.chuyen_doi.length - 1 && <Separator />}
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

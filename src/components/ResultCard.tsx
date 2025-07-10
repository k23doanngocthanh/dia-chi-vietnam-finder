
import { MapPin, Building2, ArrowRight, Info } from "lucide-react";
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

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
            {unit.ten_xa}
          </CardTitle>
          {hasChanges && (
            <Badge variant="secondary" className="ml-2 flex-shrink-0">
              Có thay đổi
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{unit.quan_huyen}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{unit.ten_tinh}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs text-gray-500">
            Mã: {unit.ma_tinh}-{unit.ma_xa}
          </div>
          
          <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto hover:bg-transparent">
            <Info className="h-4 w-4 mr-1" />
            Chi tiết
            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

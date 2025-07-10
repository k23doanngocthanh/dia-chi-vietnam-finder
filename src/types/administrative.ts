
export interface MergeInfo {
  don_vi_moi: string;
  tinh_thanh: string;
}

export interface ChangeInfo {
  sau_sap_nhap?: MergeInfo[];
  tinh_hien_tai?: string;
  tinh_cu?: string[];
  note?: string;
}

export interface AdministrativeUnit {
  ma_tinh: string;
  ten_tinh: string;
  ma_xa: string;
  ten_xa: string;
  quan_huyen: string;
  chuyen_doi?: ChangeInfo[];
}

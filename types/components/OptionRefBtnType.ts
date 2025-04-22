
export type OptionRefBtnType = {
  class?: string;
  current?: string | number | null | undefined;
  refs: RefBtnType[]
};

export type RefBtnType = {
  key: string;
  count?: number;
  cta?: string;
  noIcon?: boolean;
  class?: string;
  textClass?: string;
  type?: "button" | "submit";
  icon?: string;
  iconSize?: number | string;
  iconClass?: string;
  disabled?: boolean;
  loading?: boolean | undefined;
  disabledTextClass?: string;
  disabledClass?: string;
  activateLoading?: boolean;
  isLoadingDefault?: boolean;
  isNoText?: boolean;
  maxLengthDisplay?: number | string;
  variant?: string;
  size?: string;
  title?: string;
}

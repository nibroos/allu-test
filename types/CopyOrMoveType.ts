export type CopyOrMoveType = {
  id: string | number | null
  customer_id: string | number | null
  currency_id: string | number | null
  pph23_id: string | number | null
  order_type_id: string | number | null
  shipping_term_id: string | number | null
  buyer_po_number: string
  order_date: string
  shipping_date: string
  shipping_destination: string
  payment_term: number
  remark: string | null
  discount: string
  is_vat: number
  status: string
  total_amount: number
  total_discount: number
  total_pph23: number
  vat: number
  grand_total: number
  order_status: string
  percentage: number
  styles: Style[]
  total_additional_price: number|string
  currency_name: string
  order_type_name: string
  order_type_unit: string | null
}

type Style = {
  id: string | number | null
  id_sales_has_style: number
  id_style: number
  cap_type_id: string | number | null
  style_id: string | number | null
  uid: string
  unit_name: string
  style_name: string
  style_code: string
  style_type_id: string | number | null
  style_type_name: string
  factory_code: string
  qty: number
  price: number
  discount: number
  amount: number
  high_amount: number
  color_methods: ColorMethods
  discount_style_json: string | null
  additional_price_id: string | number | null
  additional_price_json: AdditionalPrice | null
  additional_price_global: number
  global_additional_price_id: string | number | null
  discount_style_price: number
  discount_style: DiscountStyle | null
  index_style: string
}

type ColorMethods = {
  data: ColorMethod[]
}

type ColorMethod = {
  qty: number
  id: string | number | null
  id_sales_order_and_style_has_color_method: number
  sales_order_id: string
  style_id: string | number | null
  cap_color_id: string | number | null
  name: string
  color_method_name: string
  barcode: string | null
  color_method_id: string | number | null
  color_variant_id: string | number | null
  colors: Color[]
  deduction_price: string
  plus_price: string
  high_price: number
  low_price: number
  total_high_price: number
  total_low_price: number
  amount: number
  high_amount: number
  rule_id: string | number | null
  deduction_id: string | number | null
  sales_order_and_style_has_color_method_additional_price_id: string | number | null
  sales_order_and_style_has_color_method_additional_price_json: string | null
  selected_colors: SelectedColor[]
  price: number
  style_price: number
  additional_price_id: string | number | null
  additional_price: number
  global_additional_price_id: string | number | null
  additional_price_global: number
  discount_style: DiscountStyleDetail
  discount_style_price: number
  base_price_discount_multiply_qty: number
  uid: string
  index_style: string
  index_color_method: string
}

type Color = {
  barcode: string | null
  cap_color_id: string | number | null
  color_method_id: string | number | null
  style_id: string | number | null
  color_method_name: string
  color_name: string
  color_variant_id: string | number | null
  colors: Color[]
  deduction_price: string
  high_price: number
  id: string | number | null
  id_selected_color_variant: number
  id_sales_order_and_style_has_color_method: number
  is_available: boolean | null
  low_price: number
  name: string
  plus_price: string
  qty: number
  selected: boolean
  total_high_price: number
  total_low_price: number
  selected_color_variant_additional_price_id: string | number | null
  selected_color_variant_additional_price_json: string | null
  additional_price_id: string | number | null
  additional_price: number
  additional_price_global: number
  global_additional_price_id: string | number | null
}

type SelectedColor = {
  id: string | number | null
  name: string
  index_style: string
  index_color_method: string
  index_selected_color: string
}

type DiscountStyle = {
  base_price: string
  plus_price: string
  discount_percent: string
  base_and_plus_price: number
  base_and_plus_price_multiply_discount_percent: number
  base_price_minus_discount: number
  base_price_discount_multiply_qty: number
}

type AdditionalPrice = {
  id: string | number | null
  max: string
  min: string
  price: string
  buyer_id: string | number | null
  style_id: string | number | null
  created_at: string
  deleted_at: string | null
  updated_at: string
  color_method_id: string | number | null
  color_variant_id: string | number | null
}

type DiscountStyleDetail = {
  base_price: string
  plus_price: string
  discount_percent: string
  base_and_plus_price: number
  base_and_plus_price_multiply_discount_percent: number
  base_price_minus_discount: number
  base_price_discount_multiply_qty: number
}

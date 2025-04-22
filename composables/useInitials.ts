
import type { Pagination } from '~/interfaces/LaravelPaginationInterface'
import type { FormRocketType } from '~/types/RocketType'

const pagination = {
  current_page: 1,
  first_page_url: '',
  from: 0,
  data: [],
  last_page: 0,
  last_page_url: '',
  links: [],
  next_page_url: '',
  path: '',
  per_page: 0,
  prev_page_url: '',
  to: 0,
  total: 0,
  loading: false
} as any as Pagination<any[]>

const perPageOptions = [10, 20, 50, 100]

const formRocketCreateEdit = {
  name: '',
  description: '',
  remark: '',
  status: 1,
  item_group_id: null,
} as FormRocketType

export const useInitials = {
  pagination,
  perPageOptions,
  formRocketCreateEdit
}

import { GroupType } from '~/types/groups'
import { CategoryType } from '~/types/categories'

export type ProductType = {
  id: number
  title: string
  description: string
  specification: string
  model: string
  preview: string
  group_id: number
  group: GroupType | null
  category_id: number
  category: CategoryType
}

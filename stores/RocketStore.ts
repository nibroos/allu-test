import { useAlert } from '~/composables/useAlert'
import { useMyFetch } from '~/composables/useMyFetch'
import type { Meta, Pagination, PaginationMeta } from '~/interfaces/LaravelPaginationInterface'
import type { FormRocketType, RocketResponseType, RocketType } from '~/types/RocketType'

const useRocketStore = defineStore('RocketStore', {
  state: () => ({
    form: {
      id: "5e9d0d95eda69973a809d1ec"
    } as RocketType,
    filters: {
      qListIndex: {
        query: {
          page: 1,
        },
        failState: false
      } as Record<string, any>,
    },
    metaModal: {
      index: {} as RocketResponseType,
      filteredIndex: [] as RocketType[],
    },
    tabFormIndex: 0,
    errors: {} as Record<string, any>,
    formLoading: false,
    loading: {
      index: false,
      detail: false,
    },
    extraRocket: [] as RocketType[],
    isOpenModal: {
      create: false
    },
  }),

  actions: {
    async indexRocket() {
      if (this.loading.index) return
      this.loading.index = true

      if (this.filters.qListIndex.failState) {
        this.metaModal.index.docs = []
        this.metaModal.filteredIndex = []
        this.loading.index = false

        return
      }

      try {
        const response = await useMyFetch().post(
          '/v4/rockets/query',
          this.filters.qListIndex
        )
        this.metaModal.index = response.data

        // combine with extraRocket
        this.metaModal.index.docs = this.metaModal.index.docs.concat(this.extraRocket)

        this.filtersIndex()

        return response
      } catch (error: any) {
        console.log('Failed To Fetch Rocket', error.response.data);

      } finally {
        this.loading.index = false
      }
    },

    async show() {
      if (!!this.loading.detail) return
      this.loading.detail = true

      try {
        const response = await useMyFetch().get(
          '/v4/rockets/' + this.form.id
        )
        this.form = response.data

        return response
      } catch (error: any) {
        console.log('Failed To Fetch Rocket', error.response.data);
      } finally {
        this.loading.detail = false
      }
    },

    async store() {
      if (!!this.formLoading) return
      this.formLoading = true

      const isConfirmed = await useAlert.showPopupConfirmation(
        'Are you sure to save this data?',
        'Rocket will be saved'
      )

      if (!isConfirmed) {
        this.formLoading = false
        this.isOpenModal.create = false
        return
      }

      try {
        let uuidRocket = randomId()
        this.form.id = uuidRocket

        let cloneRocket = JSON.parse(JSON.stringify(this.form))

        this.extraRocket.push(cloneRocket)
        this.metaModal.index.docs.push(cloneRocket)

        useAlert.hideAlert()
        useAlert.alertSuccess("Rocket added successfully")

      } catch (error: any) {
        const responseData = error.response.data
        console.log('Failed To Create Rocket', error.response.data)
        let errors = ''

        if (typeof responseData.errors === 'object') {
          await Promise.all(
            Object.keys(responseData.errors).map((row: any) => {
              errors += `- ${responseData.errors[row][0]} <br />`
              this.errors[row] = responseData.errors[row][0]
            })
          )
        }
        useAlert.alertError(errors + `<br /> ${responseData.message}`)

        return error.response.data
      } finally {
        this.formLoading = false
        this.isOpenModal.create = false
      }
    },

    async delete(index: number) {
      const isConfirmed = await useAlert.showPopupConfirmation(
        'Are you sure to delete this rocket?',
        'Rocket will be deleted'
      )
      if (!isConfirmed) return

      try {
        this.metaModal.index.docs.splice(index, 1)

      } catch (error: any) {
        console.log('Failed To Fetch Rocket', error.response.data);
        useAlert.alertError(error.response.data.message)
      }
    },

    cleanFilters() {
      this.filters.qListIndex = {
        query: {
          page: 1,
          per_page: 10,
          order_column: "",
          order_direction: "",
          global: "",
        },
        failState: false
      }
    },

    clearForm() {
      this.form = {
        id: "5e9d0d95eda69973a809d1ec"
      } as RocketType
    },

    filtersIndex() {
      console.log('filtersIndex', this.filters.qListIndex.query.global);

      this.metaModal.filteredIndex = this.metaModal.index.docs.filter((item: RocketType) => {
        if (this.filters.qListIndex.query.global) {
          // search by name, description, and id
          return item.name.toLowerCase().includes(this.filters.qListIndex.query.global.toLowerCase()) ||
            item.description.toLowerCase().includes(this.filters.qListIndex.query.global.toLowerCase()) ||
            item.id.toLowerCase().includes(this.filters.qListIndex.query.global.toLowerCase())
        } else {
          return true
        }
      })
    }

  },
  persist: [
    {
      paths: ['filters', 'extraRocket'],
      storage: localStorage
    }
  ]
})

export default useRocketStore
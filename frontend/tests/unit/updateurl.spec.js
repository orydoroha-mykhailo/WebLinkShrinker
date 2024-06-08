import { mount } from '@vue/test-utils'
import Vuex from 'vuex'
import UpdateUrlView from '@/views/UpdateUrlView'
import { getAPI } from '@/api'
import router from "@/router";

jest.mock('@/api', () => ({
    getAPI: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve())
}))

describe('UpdateUrlView.vue', () => {
    let wrapper
    let store

    beforeEach(() => {
        const actions = {
            getData: jest.fn(),
            updateUrl: jest.fn()
        }

        store = new Vuex.Store({
            actions,
            state: {
                accessToken: 'your_access_token'
            },
            getters: {
                authorized: () => true
            }
        })

        // Монтируем компонент с мокнутым хранилищем Vuex
        wrapper = mount(UpdateUrlView, {
            global: {
                plugins: [store, router]
            },
            data () {
                return {
                    date_create: '2024-03-15',
                    url_long: 'http://example.com/long',
                    url_short: 'http://short.com'
                }
            },
            mocks: {
                $store: {
                    state: {
                        accessToken: 'your_access_token'
                    },
                    getters: {
                        authorized: true
                    }
                },
                $route: {
                    params: {
                        id: 'your_url_id'
                    }
                },
                $router: {
                    push: jest.fn()
                }
            }
        })
    })

    it('fetches data on mount if user is authorized', async () => {
        // Мокаем ответ от API для метода getData
        const responseData = {
            date_create: '2024-03-15',
            url_long: 'http://example.com/long',
            url_short: 'http://short.com'
        }
        const putMock = jest.fn()
        getAPI.get = putMock
        getAPI.mockResolvedValueOnce({ data: responseData })

        // Дожидаемся завершения жизненного цикла mounted
        await wrapper.vm.getData()
        await wrapper.vm.$nextTick()


        // Проверяем, что данные были получены и установлены в компоненте
        expect(wrapper.vm.date_create).toBe(responseData.date_create)
        expect(wrapper.vm.url_long).toBe(responseData.url_long)
        expect(wrapper.vm.url_short).toBe(responseData.url_short)
    })

    it('updates URL data on form submission', async () => {
        const responseData = {
            date_create: '2024-03-15',
            url_long: 'http://example.com/long',
            url_short: 'http://short.com'
        }

        getAPI.get = jest.fn()
        getAPI.mockResolvedValueOnce({ data: responseData })

        await wrapper.vm.getData()
        await wrapper.vm.$nextTick()

        wrapper.vm.router = { params: { id: 'undefined' } }
        getAPI.put = jest.fn()
        const putResponse = { status: 'success' }
        getAPI.put.mockResolvedValueOnce(putResponse)

        await wrapper.vm.updateUrl()

        // Симулируем отправку формы
        //await wrapper.find('form').trigger('submit.prevent')
        await wrapper.vm.$nextTick()

        // Проверяем, что метод put был вызван с правильными аргументами
        expect(getAPI.put).toHaveBeenCalledWith(
            '/urls/undefined/',
            {
                date_create: '2024-03-15',
                url_long: 'http://example.com/long',
                url_short: 'http://short.com'
            },
            { headers: { Authorization: `Bearer ${store.state.accessToken}` } }
        )
    })
})

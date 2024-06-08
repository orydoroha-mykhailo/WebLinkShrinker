import {mount} from '@vue/test-utils'
import Vuex from 'vuex'
import ProfileView from '@/views/ProfileView.vue'
import {getAPI} from '@/api'

jest.mock('@/api', () => ({
    getAPI: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve())
}))

describe('ProfileView.vue', () => {
    let wrapper
    let store
    let actions


    beforeEach(() => {
        actions = {
            getUserInfo: jest.fn(),
            getUrls: jest.fn()
        }

        store = new Vuex.Store({
            actions,
            state: {
                accessToken: 'your_access_token',
                user_id: 'your_user_id'
            },
            getters: {
                authorized: () => true
            }
        })

        wrapper = mount(ProfileView, {
            global: {
                plugins: [store]
            },
            data() {
                return {
                    user_info: "",
                    urls:[]
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
                }
            }
        })
    })

    it('renders user information correctly', async () => {
        const userData = {
            username: 'Test User',
            email: 'test@example.com',
            gender: 'M',
            birth_date: '2000-01-01'
        }

        getAPI.mockResolvedValueOnce({data: userData})

        await wrapper.vm.getUserInfo()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.user_info).toEqual(userData)
        expect(wrapper.findAll('td').at(0).text()).toContain(userData.username)
        expect(wrapper.findAll('td').at(1).text()).toContain(userData.email)
        expect(wrapper.findAll('td').at(2).text()).toContain('Male')
        expect(wrapper.findAll('td').at(3).text()).toContain('01.01.2000')
    })

    it('renders URLs correctly', async () => {
        const urlsData = [
            {
                id: 1,
                date_create: '2022-01-01T12:00:00Z',
                url_long: 'http://example.com/long',
                url_short: 'http://short.com/1'
            },
            {
                id: 2,
                date_create: '2022-01-02T12:00:00Z',
                url_long: 'http://example.com/long2',
                url_short: 'http://short.com/2'
            }
        ]
        getAPI.mockResolvedValueOnce({data: urlsData})
        await wrapper.vm.getUrls()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.urls).toEqual(urlsData)
        expect(wrapper.findAll('table tbody').length).toBe(2)
        expect(wrapper.findAll('tbody').at(1).findAll('td').at(1).text()).toContain('http://example.com/long')
        expect(wrapper.findAll('tbody').at(1).findAll('td').at(2).text()).toContain('http://short.com/1')
    })
})

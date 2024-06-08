import { shallowMount} from '@vue/test-utils'
import MainView from '@/views/MainView.vue'

describe('MainView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(MainView, {
            data() {
                return{
                    text: '',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.vm.text).toBe('')
    })

    it('initializes', () => {
        // render the component
        wrapper = shallowMount(MainView, {
            data() {
                return{
                    text: 'https://classroom.google.com/c/NjQ4MzgxMjE1ODQz/a/NjY4MDcwNDIyMTI0/details?hl=ru'
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        // check that each element of the user
        expect(wrapper.vm.text).toMatch('https://classroom.google.com/c/NjQ4MzgxMjE1ODQz/a/NjY4MDcwNDIyMTI0/details?hl=ru')

    })


    it('initializes with success message', () => {
    // render the component
        wrapper = shallowMount(MainView, {
            data() {
                return{
                    text: 'https://classroom.google.com/c/NjQ4MzgxMjE1ODQz/a/NjY4MDcwNDIyMTI0/details?hl=ru',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        // check that each element of the user is initialized to empty strings
        expect(wrapper.vm.text).toMatch('https://classroom.google.com/c/NjQ4MzgxMjE1ODQz/a/NjY4MDcwNDIyMTI0/details?hl=ru')
    })


    it('emits an event when wrapper exists', () => {
        // render the component
        wrapper = shallowMount(MainView, {
            data() {
                return{
                    text: 'https://classroom.google.com/c/NjQ4MzgxMjE1ODQz/a/NjY4MDcwNDIyMTI0/details?hl=ru',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        // trigger an event when the button is clicked
         wrapper.find('.btn').trigger('shortenUrl')
    
        // // check that 1 occurrence of the event has been emitted
         expect(wrapper.emitted('submit')).toBeTruthy
    })


    

})

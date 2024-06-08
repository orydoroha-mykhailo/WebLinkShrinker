import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('AboutView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = mount(AboutView, {
            
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.text()).toContain('Link Shrinker')
        expect(wrapper.text()).toContain('This website allows you to shrink a long URL for more convenient use.')
        expect(wrapper.text()).toContain('Try It')
    })
    
})
import { shallowMount, mount } from '@vue/test-utils'
import RegistrationView from '../../src/views/RegistrationView.vue'

describe('RegistrationView.vue Test.', () => {

    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(RegistrationView, {
            data() {
                return{
                    email: '',
                    username: '',
                    password: '',
                    birth_date: '',
                    gender: '',
                    errors: '',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.vm.email).toBe('')
        expect(wrapper.vm.username).toBe('')
        expect(wrapper.vm.password).toBe('')
        expect(wrapper.vm.birth_date).toBe('')
        expect(wrapper.vm.gender).toBe('')
        expect(wrapper.vm.errors).toBe('')
    })

    it('initializes with error message', () => {
        // render the component
        wrapper = shallowMount(RegistrationView, {
            data() {
                return{
                email: 'user@mail.com',
                username: 'user',
                password: 'notuserpassword',
                birth_date: 'xxxxx',
                gender: 'K',
                errors: 'error1',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        // check that each element of the user
        expect(wrapper.vm.email).toBe('user@mail.com')
        expect(wrapper.vm.username).toBe('user')
        expect(wrapper.vm.password).toBe('notuserpassword')
        expect(wrapper.vm.birth_date).toBe('xxxxx')
        expect(wrapper.vm.gender).toBe('K')
        expect(wrapper.vm.errors).toBe('error1')
    })


    it('initializes with success message', () => {
    // render the component
    wrapper = shallowMount(RegistrationView, {
        data() {
            return{
            email: 'user@mail.com',
            username: 'user',
            password: 'notuserpassword',
            birth_date: '2005-02-04',
            gender: 'M',
            errors: '',
            }
        }
    })

    expect(wrapper.exists()).toBe(true);

    // check that each element of the user
    expect(wrapper.vm.email).toBe('user@mail.com')
    expect(wrapper.vm.username).toBe('user')
    expect(wrapper.vm.password).toBe('notuserpassword')
    expect(wrapper.vm.birth_date).toBe('2005-02-04')
    expect(wrapper.vm.gender).toBe('M')
    expect(wrapper.vm.errors).toBe('')
    })


    test('Registration input test.', async() => {
        const wrapper = mount(RegistrationView)

        expect(wrapper.exists()).toBe(true)

        
        const email = wrapper.find('input')
        await email.setValue('test@mail.com')
        expect(email.element.value).toBe('test@mail.com')


        
        const password = wrapper.find('input')
        await password.setValue("password")
        expect(password.element.value).toBe("password")

        const birthdate = wrapper.find('input')
        await birthdate.setValue("2018-07-22")
        expect(birthdate.element.value).toBe("2018-07-22")

        const gender = wrapper.find('input')
        await gender.setValue("M")
        expect(gender.element.value).toBe("M")


        const username =  wrapper.find('input')
        await username.setValue("username")
        expect(username.element.value).toBe("username")
    })
    


    
})

test('input test.', async() => {
    const wrapper = mount(RegistrationView)

    expect(wrapper.exists()).toBe(true)

    const email = wrapper.find('input[type="email"]');
    const username = wrapper.find('input#user');
    const password = wrapper.find('input#typePasswordX-2');
    const birthdate = wrapper.find('input#dob');

    await email.setValue("test@mail.com")
    await username.setValue("username")
    await password.setValue("password")
    await birthdate.setValue("2018-07-22")

    expect(email.element.value).toBe("test@mail.com")
    expect(username.element.value).toBe("username")
    expect(password.element.value).toBe("password")
    expect(birthdate.element.value).toBe("2018-07-22")
})
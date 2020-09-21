import React from "react"
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import NavigationItems from "./NavigationItems"

import {NavLink} from 'react-router-dom'


configure({adapter: new Adapter}) // connecting enzime

describe('<NavigationItems />', () => {
    let wrapper
    beforeEach(() => {
        wrapper =  shallow(<NavigationItems />)
    })

    it('it should render two navigationItems elements if not authenticated', () => {
        // const wrapper = shallow(<NavigationItems />)
        expect(wrapper.find(NavLink).length).toEqual(2) // if not authenticated
    })

    it('it should render three navigationItems elements if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />)
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        //or
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavLink).length).toEqual(3) // if not authenticated
    })

    it('expect a logout link if we are authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavLink to="/Logout" >Logout</NavLink>)).toEqual(true)
    })
    
})
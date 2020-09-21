import reducer  from "./auth"
import * as actionTypes from "../Actions/actionTypes"

describe('auth reducer', () => {
    it('should return initail state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
          })
    })

    it('should store the token upon login', () => {
        expect(reducer({ 
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {
            type: actionTypes.AUTH_SUCCESS,
            userId: "some-userId",
            idToken: "some-token",
            
        })).toEqual({
            token: "some-token",
            userId: "some-userId",
            error: null,
            loading: false,
            authRedirectPath: "/"
          })
        })
})
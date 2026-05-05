import {atom } from 'recoil'

export const itemsincart = atom({
    key:'itemsincart',
    default: []
})

export const noofitemsincart = atom({
    key :'noofitemsincart',
    default:0
})

export const userRole = atom({
    key: 'userRole',
    default: null,
});
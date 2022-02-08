import { format } from 'date-fns'

export const api = (_path = "") => {
    const [path] = _path.split('?');

    if (path.length === 0) {
        return Promise.reject(new Error('Path is required.'))
    }

    if (path !== '/latest') {
        return Promise.reject(new Error('Invalid Path.'))
    }

    // [/latest?base=, USD]
    const baseCurrency = _path.split('base=')[1]

    return Promise.resolve({
        base: baseCurrency,
        date: format(new Date(), 'yyyy-MM-dd'),
        // rates: {
        //     [baseCurrency]: 1,
        // }
    })

    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve({
    //             base: baseCurrency,
    //             date: format(new Date(), 'yyyy-MM-dd'),
    //             rates: {
    //                 ...SAMPLE_RATES,
    //                 [baseCurrency]: 1,
    //             }
    //         })
    //     }, 1500)
    // })
}